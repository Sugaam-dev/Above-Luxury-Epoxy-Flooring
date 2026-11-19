/**
 * Vercel Serverless Function: POST /api/generate-image
 * ABOVE° — Concept Living AI Transformation Studio
 */

import { buildTransformationPrompt } from '../src/utils/transformationPrompts.js';

// Simple in-memory rate limiter per IP (max 12 requests per minute)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;

// Clean up old rate limit entries every 5 minutes (unref ensures timer does not block process exit)
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

if (cleanupTimer && typeof cleanupTimer.unref === 'function') {
  cleanupTimer.unref();
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { timestamp: now, count: 1 });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  entry.count += 1;
  return true;
}

export default async function handler(req, res) {
  // 1. Enforce POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed. Please use POST.`
    });
  }

  // 2. Client IP Rate Limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'anonymous';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please wait a minute before generating another transformation.'
    });
  }

  try {
    const { image, category, customInstructions } = req.body || {};

    // 3. Validate Inputs
    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing required image payload. Expected base64 data URL.'
      });
    }

    if (!category || typeof category !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing required transformation category preset.'
      });
    }

    // Extract base64 and mime-type
    const match = image.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({
        success: false,
        error: 'Invalid image format. Expected data:image/...;base64 payload.'
      });
    }

    const mimeType = match[1].toLowerCase();
    const base64Data = match[2];

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimes.includes(mimeType)) {
      return res.status(400).json({
        success: false,
        error: `Unsupported MIME type: ${mimeType}. Allowed formats: JPG, PNG, WebP.`
      });
    }

    // Rough size check (base64 string length * 0.75)
    const approxBytes = Math.round(base64Data.length * 0.75);
    const maxServerBytes = 4.5 * 1024 * 1024;
    if (approxBytes > maxServerBytes) {
      return res.status(400).json({
        success: false,
        error: `Image size (${Math.round(approxBytes / (1024 * 1024))} MB) exceeds server limit of 4.5 MB.`
      });
    }

    // 4. Validate category and build prompt
    const { category: catObj, prompt } = buildTransformationPrompt(category, customInstructions);

    // 5. Check API Credentials
    const apiKey = process.env.GEMINI_API_KEY || process.env.gemini_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: 'AI image generation service is currently unconfigured on this deployment. Please set GEMINI_API_KEY in your Vercel / server environment variables.',
        code: 'MISSING_API_KEY'
      });
    }

    // 6. Supported Multimodal Image Models (with automatic fallback if a model is deprecated/unsupported)
    const primaryModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash-image';
    const fallbackModels = [
      primaryModel,
      'gemini-2.5-flash-image',
      'gemini-3.1-flash-image',
      'gemini-3.1-flash-lite-image',
      'gemini-3-pro-image'
    ];
    // Deduplicate models while keeping order
    const candidateModels = [...new Set(fallbackModels)];

    const geminiPayload = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            },
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        responseModalities: ['IMAGE']
      }
    };

    let lastError = null;
    let successfulData = null;
    let modelUsed = primaryModel;

    for (const model of candidateModels) {
      modelUsed = model;
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      try {
        const apiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(geminiPayload)
        });

        if (!apiResponse.ok) {
          const errorBody = await apiResponse.json().catch(() => null);
          const rawErrorMsg = errorBody?.error?.message || `AI API returned status ${apiResponse.status}`;

          // If model is not found / deprecated (404), continue to next model candidate
          if (apiResponse.status === 404) {
            console.warn(`Model ${model} not found for generateContent. Attempting fallback...`);
            lastError = { status: 404, message: rawErrorMsg };
            continue;
          }

          if (apiResponse.status === 429) {
            const isZeroLimit = rawErrorMsg.includes('limit: 0') || rawErrorMsg.includes('free_tier');
            const detailedMsg = isZeroLimit
              ? 'Google Gemini API quota reached: Image generation models (gemini-2.5-flash-image) require an active Pay-As-You-Go billing account in Google AI Studio (unpaid Free Tier accounts have limit: 0 for image generation). Please enable billing in Google AI Studio (https://aistudio.google.com/).'
              : 'Google Gemini API rate limit or quota exceeded. Please wait a moment before generating another transformation.';

            return res.status(429).json({
              success: false,
              error: detailedMsg,
              code: 'QUOTA_EXHAUSTED'
            });
          }

          if (apiResponse.status === 401 || apiResponse.status === 403) {
            return res.status(502).json({
              success: false,
              error: 'AI service authentication failed. Please verify your server GEMINI_API_KEY.'
            });
          }

          return res.status(502).json({
            success: false,
            error: `Generation service error: ${rawErrorMsg}`
          });
        }

        successfulData = await apiResponse.json();
        break; // Successfully received response
      } catch (networkErr) {
        lastError = { status: 500, message: networkErr.message };
      }
    }

    if (!successfulData) {
      return res.status(502).json({
        success: false,
        error: lastError?.message || 'Could not reach a supported Gemini image generation model.'
      });
    }

    // 7. Extract the generated image from response candidates
    const candidate = successfulData?.candidates?.[0];
    if (!candidate) {
      return res.status(502).json({
        success: false,
        error: 'AI model did not return any candidate outputs.'
      });
    }

    // Check for safety or other block reasons
    if (candidate.finishReason && candidate.finishReason !== 'STOP' && candidate.finishReason !== 'MAX_TOKENS') {
      if (candidate.finishReason === 'SAFETY') {
        return res.status(422).json({
          success: false,
          error: 'The image generation request was flagged by the model safety filters. Please try another photograph or prompt.'
        });
      }
    }

    const parts = candidate.content?.parts || [];
    let generatedImagePart = null;
    let refusalText = '';

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        generatedImagePart = part.inlineData;
        break;
      }
      if (part.text) {
        refusalText += part.text;
      }
    }

    if (!generatedImagePart) {
      return res.status(502).json({
        success: false,
        error: refusalText
          ? `Model responded with text instead of an image: "${refusalText.slice(0, 160)}..."`
          : 'AI service completed without generating an image asset. Please try again with a different preset.'
      });
    }

    const outMime = generatedImagePart.mimeType || 'image/png';
    const outDataUrl = `data:${outMime};base64,${generatedImagePart.data}`;

    return res.status(200).json({
      success: true,
      imageUrl: outDataUrl,
      category: category,
      categoryTitle: catObj.title,
      model: modelUsed,
      promptUsed: prompt
    });

  } catch (err) {
    console.error('Unhandled serverless exception in generate-image:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your image transformation.'
    });
  }
}
