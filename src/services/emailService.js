/**
 * EmailJS Integration Service
 * Delivers generated transformation image as email attachment
 * ABOVE° — Concept Living
 */

import emailjs from '@emailjs/browser';

// Environment variables (supports both Vite browser runtime and Node test environments)
const getEnvVar = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return '';
};

const SERVICE_ID = getEnvVar('VITE_EMAILJS_SERVICE_ID');
const TEMPLATE_ID = getEnvVar('VITE_EMAILJS_TEMPLATE_ID');
const PUBLIC_KEY = getEnvVar('VITE_EMAILJS_PUBLIC_KEY');

// Max safe payload size for EmailJS attachments (~1.5 MB to avoid provider bounce)
const MAX_EMAIL_ATTACHMENT_BYTES = 1.5 * 1024 * 1024;

/**
 * Validates email address format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant regex for practical email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Check whether EmailJS credentials are configured in frontend env
 * @returns {{ configured: boolean, missing: string[] }}
 */
export function checkEmailJSConfig() {
  const missing = [];
  if (!SERVICE_ID) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!TEMPLATE_ID) missing.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!PUBLIC_KEY) missing.push('VITE_EMAILJS_PUBLIC_KEY');

  return {
    configured: missing.length === 0,
    missing
  };
}

/**
 * Compresses an image (data URL or blob URL) for safe email transmission through EmailJS
 * @param {string} imageSource - Data URL or Blob URL
 * @param {number} maxDimension
 * @param {number} quality
 * @returns {Promise<string>}
 */
export function optimizeImageForEmail(imageSource, maxDimension = 1200, quality = 0.75) {
  return new Promise((resolve) => {
    if (!imageSource || typeof imageSource !== 'string') {
      return resolve(imageSource || '');
    }

    // If it's already a small data URL (under 200KB), resolve immediately
    if (imageSource.startsWith('data:') && imageSource.length < 200000) {
      return resolve(imageSource);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let { naturalWidth: width, naturalHeight: height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const optimized = canvas.toDataURL('image/jpeg', quality);
      resolve(optimized);
    };
    img.onerror = () => resolve(imageSource); // Fallback to original
    img.src = imageSource;
  });
}

/**
 * Sends transformed image as an email attachment via EmailJS
 * @param {object} params
 * @param {string} params.email - Recipient email
 * @param {string} [params.name] - Recipient name
 * @param {string} params.imageUrl - Generated image data URL
 * @param {string} [params.categoryTitle] - Name of the transformation category
 * @param {string} [params.notes] - Optional client notes
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function sendTransformationEmail({
  email,
  name = 'Valued Client',
  imageUrl,
  categoryTitle = 'Concept Living Transformation',
  notes = ''
}) {
  const config = checkEmailJSConfig();
  if (!config.configured) {
    throw new Error(
      `EmailJS is not configured yet. Missing environment variables: ${config.missing.join(', ')}. Please add them in your .env file or Vercel dashboard.`
    );
  }

  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address (e.g., name@domain.com).');
  }

  if (!imageUrl) {
    throw new Error('No transformation image is available to attach.');
  }

  // Optimize image to fit EmailJS size quota
  const optimizedAttachment = await optimizeImageForEmail(imageUrl);
  const approxBytes = Math.round((optimizedAttachment.length * 3) / 4);

  if (approxBytes > MAX_EMAIL_ATTACHMENT_BYTES) {
    throw new Error(
      `Attachment size (${Math.round(approxBytes / 1024)} KB) exceeds the safe EmailJS transfer limit. Please try with a lighter image.`
    );
  }

  // Initialize EmailJS with public key
  emailjs.init({
    publicKey: PUBLIC_KEY
  });

  // Template parameters mapped to common EmailJS variable patterns
  const templateParams = {
    to_email: email.trim(),
    recipient_email: email.trim(),
    to_name: name.trim() || 'Client',
    category_name: categoryTitle,
    transformed_image: optimizedAttachment, // Variable attachment parameter
    my_file: optimizedAttachment,
    attachment: optimizedAttachment,
    notes: notes ? `Client note: "${notes}"` : 'Generated via ABOVE° Concept Living AI Studio.',
    generated_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    brand_signature: 'ABOVE° — Concept Living | Pune & Mumbai'
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return {
      success: true,
      status: response.status,
      message: `Your transformation has been dispatched to ${email.trim()}. Check your inbox!`
    };
  } catch (err) {
    const errMsg = err?.text || err?.message || 'Failed to dispatch email via EmailJS.';
    throw new Error(`Email dispatch failed: ${errMsg}`);
  }
}
