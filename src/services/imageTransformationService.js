/**
 * Cloudflare Workers AI Image Transformation Service
 * ABOVE° — Concept Living
 *
 * Cloudflare Worker: https://above-ai-image-generator.udeshk28.workers.dev/
 * Model: @cf/black-forest-labs/flux-2-klein-4b
 */

import { buildTransformationPrompt } from '../utils/transformationPrompts.js';

export const CLOUDFLARE_WORKER_URL = 'https://above-ai-image-generator.udeshk28.workers.dev/';
export const CLOUDFLARE_MODEL_NAME = '@cf/black-forest-labs/flux-2-klein-4b';
const DEFAULT_REQUEST_TIMEOUT_MS = 120000; // 120s timeout for generative image diffusion models

export class ImageTransformationError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ImageTransformationError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Converts various image representations (File, Blob, Data URL, Blob URL) into a real Blob
 * @param {File|Blob|string} source
 * @returns {Promise<Blob>}
 */
export async function convertSourceToBlob(source) {
  if (!source) {
    throw new ImageTransformationError('No image source provided for transformation.', 400);
  }

  // Already a File or Blob
  if (typeof Blob !== 'undefined' && source instanceof Blob) {
    return source;
  }

  // If source is a Blob URL (blob:http...)
  if (typeof source === 'string' && source.startsWith('blob:')) {
    try {
      const response = await fetch(source);
      return await response.blob();
    } catch (err) {
      throw new ImageTransformationError('Could not read image from temporary preview URL.', 400, err);
    }
  }

  // If source is a Base64 Data URL (data:image/...;base64,...)
  if (typeof source === 'string' && source.startsWith('data:')) {
    try {
      const parts = source.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      const binaryString = atob(parts[1]);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new Blob([bytes], { type: mimeType });
    } catch (err) {
      throw new ImageTransformationError('Could not decode base64 image data.', 400, err);
    }
  }

  throw new ImageTransformationError('Unsupported image format provided.', 400);
}

/**
 * Detects actual image MIME type by inspecting leading magic bytes
 * @param {Uint8Array} bytes
 * @returns {string|null}
 */
export function detectMimeTypeFromBytes(bytes) {
  if (bytes && bytes.length >= 4) {
    if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
      return 'image/jpeg';
    }
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
      return 'image/png';
    }
    if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
      return 'image/webp';
    }
  }
  return null;
}

/**
 * Decodes a base64 string into a Blob URL
 * @param {string} base64String
 * @param {string} [mimeType='image/png']
 * @returns {{ blob: Blob, imageUrl: string, mimeType: string }}
 */
export function base64ToBlobUrl(base64String, mimeType = 'image/png') {
  try {
    // Sanitize any data URI prefix if present
    const cleanBase64 = base64String.replace(/^data:[^;]+;base64,/, '');
    const binaryString = atob(cleanBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const detectedMime = detectMimeTypeFromBytes(bytes);
    const resolvedMime = detectedMime || mimeType || 'image/png';
    const blob = new Blob([bytes], { type: resolvedMime });
    const imageUrl = URL.createObjectURL(blob);
    return { blob, imageUrl, mimeType: resolvedMime };
  } catch (err) {
    throw new ImageTransformationError('Failed to decode generated image asset from AI response.', 500, err);
  }
}

/**
 * Sends image and prompt to Cloudflare Workers AI for photorealistic transformation
 * @param {object} params
 * @param {File|Blob|string} params.image - Original photograph
 * @param {string} params.prompt - Architectural transformation instructions
 * @param {function} [params.onProgressStep] - Progress notification callback
 * @param {AbortSignal} [params.signal] - Optional external abort signal
 * @returns {Promise<{ imageUrl: string, blob: Blob, mimeType: string, model: string, promptUsed: string, revoke: () => void }>}
 */
export async function transformImageWithCloudflare({
  image,
  prompt,
  onProgressStep = () => {},
  signal = null
}) {
  if (!image) {
    throw new ImageTransformationError('Please upload an image before requesting a transformation.', 400);
  }

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    throw new ImageTransformationError('A valid transformation prompt is required.', 400);
  }

  onProgressStep('Analyzing your space...');

  // Convert input to a real Blob/File
  const imageBlob = await convertSourceToBlob(image);

  // Build FormData with exact field names 'image' and 'prompt'
  const formData = new FormData();
  const filename = imageBlob.name || (imageBlob.type === 'image/jpeg' ? 'space.jpg' : 'space.png');
  formData.append('image', imageBlob, filename);
  formData.append('prompt', prompt.trim());

  // Setup abort controller with timeout
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => {
    timeoutController.abort();
  }, DEFAULT_REQUEST_TIMEOUT_MS);

  // Link caller signal if provided
  if (signal) {
    signal.addEventListener('abort', () => timeoutController.abort(), { once: true });
  }

  try {
    onProgressStep('Reimagining your space with Cloudflare Workers AI...');

    // Post to Cloudflare Worker. Do NOT set Content-Type header manually; browser adds multipart boundary.
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: 'POST',
      body: formData,
      signal: timeoutController.signal
    });

    clearTimeout(timeoutId);
    onProgressStep('Rendering architectural details...');

    // Parse JSON response safely
    const contentType = response.headers.get('content-type') || '';
    let responseData;
    if (contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch (jsonErr) {
        throw new ImageTransformationError('AI service returned an unreadable response format.', response.status);
      }
    } else {
      const rawText = await response.text().catch(() => '');
      throw new ImageTransformationError(
        `AI service returned unexpected status ${response.status}: ${rawText.slice(0, 120)}`,
        response.status
      );
    }

    // Handle HTTP error statuses and failure payloads
    if (!response.ok || !responseData.success) {
      if (response.status === 429) {
        throw new ImageTransformationError(
          'Cloudflare AI service is experiencing high demand (quota or rate limit reached). Please wait a moment and try again.',
          429,
          responseData
        );
      }

      if (response.status === 400) {
        const errorMsg = responseData.error || responseData.message || 'Invalid image or prompt payload.';
        throw new ImageTransformationError(errorMsg, 400, responseData);
      }

      if (response.status >= 500) {
        const serverMsg = responseData.error || responseData.message || 'AI image generation service encountered an internal error. Please retry.';
        throw new ImageTransformationError(serverMsg, response.status, responseData);
      }

      const fallbackMsg = responseData.error || responseData.message || `Transformation failed with status ${response.status}.`;
      throw new ImageTransformationError(fallbackMsg, response.status, responseData);
    }

    if (!responseData.image) {
      throw new ImageTransformationError('AI service completed but did not return any image data.', 500, responseData);
    }

    onProgressStep('Finalizing your transformation...');

    // Convert Base64 response to Blob and Blob URL
    const { blob, imageUrl, mimeType: resolvedMime } = base64ToBlobUrl(responseData.image, responseData.mimeType || 'image/png');

    return {
      imageUrl,
      blob,
      mimeType: resolvedMime,
      model: CLOUDFLARE_MODEL_NAME,
      promptUsed: prompt,
      revoke: () => URL.revokeObjectURL(imageUrl)
    };

  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      if (signal?.aborted) {
        throw new ImageTransformationError('Transformation was cancelled.', 0);
      }
      throw new ImageTransformationError(
        'The transformation request timed out after 120 seconds. AI generation can take longer under heavy server load. Please retry.',
        504
      );
    }

    if (err instanceof ImageTransformationError) {
      throw err;
    }

    // Network disconnection or fetch failure
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new ImageTransformationError(
        'Internet connection lost. Please verify your network connection and retry.',
        0
      );
    }

    throw new ImageTransformationError(
      err.message || 'An unexpected network error occurred while contacting the Cloudflare Workers AI service.',
      500,
      err
    );
  }
}

/**
 * High-level helper: builds preset prompt and triggers Cloudflare AI transformation
 * @param {object} params
 * @param {File|Blob|string} params.image - Original photograph
 * @param {string} params.category - Preset category ID
 * @param {string} [params.customInstructions] - Client customizations
 * @param {function} [params.onProgressStep] - Progress step callback
 * @param {AbortSignal} [params.signal] - Optional abort signal
 * @returns {Promise<{ imageUrl: string, blob: Blob, mimeType: string, category: string, categoryTitle: string, model: string, promptUsed: string, revoke: () => void }>}
 */
export async function generateAITransformation({
  image,
  category,
  customInstructions = '',
  onProgressStep = () => {},
  signal = null
}) {
  onProgressStep('Analyzing your space...');

  const { category: catObj, prompt } = buildTransformationPrompt(category, customInstructions);

  const result = await transformImageWithCloudflare({
    image,
    prompt,
    onProgressStep,
    signal
  });

  return {
    ...result,
    category,
    categoryTitle: catObj?.title || 'Concept Living Transformation'
  };
}
