/**
 * Image Generation Service (Cloudflare Workers AI Wrapper)
 * ABOVE° — Concept Living
 *
 * Forwards requests to imageTransformationService.js
 * Powered by Cloudflare Workers AI (@cf/black-forest-labs/flux-2-klein-4b)
 */

import {
  generateAITransformation as cloudflareGenerate,
  ImageTransformationError,
  transformImageWithCloudflare
} from './imageTransformationService.js';

export const ImageGenerationError = ImageTransformationError;

export async function generateAITransformation(params) {
  return await cloudflareGenerate(params);
}

export { transformImageWithCloudflare };
export default generateAITransformation;
