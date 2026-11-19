/**
 * Image Validation & Compression Utilities
 * ABOVE° — Concept Living
 */

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
];

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Max client upload size before compression: 12MB
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

// Max API payload target size: 3.5MB (ensures well under Vercel's 4.5MB limit)
export const MAX_PAYLOAD_BYTES = 3.5 * 1024 * 1024;

/**
 * Format bytes into human-readable string
 */
export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Validates a user-selected File object
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'Please select an image file.' };
  }

  // Type check
  const mimeType = file.type?.toLowerCase();
  const filename = file.name?.toLowerCase() || '';
  const hasValidExt = ALLOWED_EXTENSIONS.some(ext => filename.endsWith(ext));

  if (!ALLOWED_MIME_TYPES.includes(mimeType) && !hasValidExt) {
    return {
      valid: false,
      error: `Unsupported image format (${file.type || 'unknown'}). Please upload a JPG, PNG, or WebP photograph.`
    };
  }

  // Size check
  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      valid: false,
      error: `File is too large (${formatBytes(file.size)}). Maximum upload size is ${formatBytes(MAX_UPLOAD_BYTES)}.`
    };
  }

  if (file.size < 5 * 1024) {
    return {
      valid: false,
      error: 'The image file appears corrupted or empty (under 5 KB).'
    };
  }

  return { valid: true };
}

/**
 * Reads image dimensions from a File or Data URL
 * @param {File|string} source
 * @returns {Promise<{ width: number, height: number, aspectRatio: string }>}
 */
export function getImageDimensions(source) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      const ratio = (width / height).toFixed(2);
      resolve({ width, height, aspectRatio: `${width}×${height} (${ratio}:1)` });
    };
    img.onerror = () => reject(new Error('Unable to read image dimensions.'));

    if (typeof source === 'string') {
      img.src = source;
    } else {
      const objectUrl = URL.createObjectURL(source);
      img.src = objectUrl;
    }
  });
}

/**
 * Converts a File to a Base64 data URL
 * @param {File} file
 * @returns {Promise<string>}
 */
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Resizes and compresses an image if it exceeds dimension or payload limits
 * @param {File|string} source - File object or Data URL
 * @param {object} options
 * @returns {Promise<{ dataUrl: string, mimeType: string, width: number, height: number, sizeBytes: number }>}
 */
export async function prepareImageForApi(source, { maxDimension = 1920, quality = 0.88 } = {}) {
  const dataUrl = typeof source === 'string' ? source : await fileToDataUrl(source);
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { naturalWidth: width, naturalHeight: height } = img;
      
      // Determine scaling factor if image is oversized
      let needsResize = false;
      if (width > maxDimension || height > maxDimension) {
        needsResize = true;
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      // If dimensions are fine and original dataUrl is small enough, return as-is
      const estimatedOriginalBytes = Math.round((dataUrl.length * 3) / 4);
      if (!needsResize && estimatedOriginalBytes <= MAX_PAYLOAD_BYTES) {
        const mimeMatch = dataUrl.match(/^data:([^;]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        return resolve({
          dataUrl,
          mimeType,
          width: img.naturalWidth,
          height: img.naturalHeight,
          sizeBytes: estimatedOriginalBytes
        });
      }

      // Draw onto canvas for scaling and optimization
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // High-quality downsampling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      const compressedBytes = Math.round((compressedDataUrl.length * 3) / 4);

      resolve({
        dataUrl: compressedDataUrl,
        mimeType: 'image/jpeg',
        width,
        height,
        sizeBytes: compressedBytes
      });
    };
    img.onerror = () => reject(new Error('Failed to load image for optimization.'));
    img.src = dataUrl;
  });
}
