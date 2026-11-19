/**
 * Comprehensive Automated Test Suite
 * AI Transformation Studio — ABOVE° Concept Living
 */

import handler from './api/generate-image.js';
import {
  TRANSFORMATION_CATEGORIES,
  buildTransformationPrompt
} from './src/utils/transformationPrompts.js';
import {
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
  validateImageFile,
  formatBytes,
  MAX_UPLOAD_BYTES
} from './src/utils/imageValidation.js';
import { isValidEmail } from './src/services/emailService.js';
import {
  CLOUDFLARE_WORKER_URL,
  CLOUDFLARE_MODEL_NAME,
  convertSourceToBlob,
  base64ToBlobUrl,
  transformImageWithCloudflare,
  ImageTransformationError
} from './src/services/imageTransformationService.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// Mock HTTP Response object for testing Vercel serverless function
function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    data: null,
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(obj) {
      this.data = obj;
      return this;
    }
  };
  return res;
}

async function runTests() {
  console.log('\n======================================================');
  console.log('--- TEST SUITE 1: Transformation Prompts & Presets ---');
  console.log('======================================================');

  // Verify all 8 categories exist
  assert(TRANSFORMATION_CATEGORIES.length === 8, 'Exactly 8 transformation categories configured');

  const expectedIds = [
    'balcony-garden',
    'vertical-garden',
    'terrace-garden',
    'epoxy-3d-floor',
    'metallic-marble',
    'agate-floor',
    'textured-wall',
    'luxury-outdoor'
  ];

  for (const id of expectedIds) {
    const found = TRANSFORMATION_CATEGORIES.find(c => c.id === id);
    assert(!!found, `Category preset "${id}" is defined with title "${found?.title}"`);
    assert(!!found?.systemPrompt, `Category "${id}" contains architectural systemPrompt`);
    assert(!!found?.defaultInstructions, `Category "${id}" contains defaultInstructions`);
  }

  // Test prompt builder instructions
  const { category: bgCat, prompt: bgPrompt } = buildTransformationPrompt('balcony-garden');
  assert(bgCat.id === 'balcony-garden', 'buildTransformationPrompt resolves correct category');
  assert(bgPrompt.includes('camera perspective'), 'Balcony prompt specifies camera perspective preservation');
  assert(bgPrompt.includes('photorealistic'), 'Balcony prompt enforces photorealism');
  assert(bgPrompt.includes('biophilic'), 'Balcony prompt specifies biophilic elements');
  assert(bgPrompt.includes('watermarks'), 'Balcony prompt forbids watermarks and text');

  // Test custom instructions injection
  const customNote = 'Add warm golden fairy lights and hanging terracotta pots';
  const { prompt: customPrompt } = buildTransformationPrompt('balcony-garden', customNote);
  assert(customPrompt.includes(customNote), 'Custom client note is correctly incorporated into final prompt');

  console.log('\n======================================================');
  console.log('--- TEST SUITE 2: Client & Server Image Validation ---');
  console.log('======================================================');

  // Format bytes helper
  assert(formatBytes(1024) === '1 KB', 'formatBytes(1024) === 1 KB');
  assert(formatBytes(2.5 * 1024 * 1024) === '2.5 MB', 'formatBytes(2.5MB) === 2.5 MB');

  // Validate allowed MIME types
  assert(ALLOWED_MIME_TYPES.includes('image/jpeg'), 'image/jpeg is allowed');
  assert(ALLOWED_MIME_TYPES.includes('image/png'), 'image/png is allowed');
  assert(ALLOWED_MIME_TYPES.includes('image/webp'), 'image/webp is allowed');
  assert(!ALLOWED_MIME_TYPES.includes('image/gif'), 'image/gif is not allowed');

  // Validate file validator with simulated file objects
  const validJpgFile = { name: 'balcony.jpg', type: 'image/jpeg', size: 1.5 * 1024 * 1024 };
  assert(validateImageFile(validJpgFile).valid === true, 'Valid JPG file passes validation');

  const validPngFile = { name: 'floor.png', type: 'image/png', size: 2 * 1024 * 1024 };
  assert(validateImageFile(validPngFile).valid === true, 'Valid PNG file passes validation');

  const validWebpFile = { name: 'terrace.webp', type: 'image/webp', size: 800 * 1024 };
  assert(validateImageFile(validWebpFile).valid === true, 'Valid WebP file passes validation');

  const invalidGifFile = { name: 'animation.gif', type: 'image/gif', size: 500 * 1024 };
  assert(validateImageFile(invalidGifFile).valid === false, 'Invalid GIF file is rejected');

  const oversizedFile = { name: 'huge.jpg', type: 'image/jpeg', size: 15 * 1024 * 1024 };
  assert(validateImageFile(oversizedFile).valid === false, 'Oversized file (>12MB) is rejected with clear error');

  const tinyCorruptFile = { name: 'empty.jpg', type: 'image/jpeg', size: 100 };
  assert(validateImageFile(tinyCorruptFile).valid === false, 'Corrupted tiny file (<5KB) is rejected');

  console.log('\n======================================================');
  console.log('--- TEST SUITE 3: Serverless API Handler Edge Cases ---');
  console.log('======================================================');

  // 1. Enforce POST method (reject GET / PUT)
  const getReq = { method: 'GET', headers: {} };
  const getRes = createMockRes();
  await handler(getReq, getRes);
  assert(getRes.statusCode === 405, 'GET request returns 405 Method Not Allowed');

  // 2. Missing image payload
  const noImageReq = {
    method: 'POST',
    headers: {},
    body: { category: 'balcony-garden' }
  };
  const noImageRes = createMockRes();
  await handler(noImageReq, noImageRes);
  assert(noImageRes.statusCode === 400, 'Missing image payload returns 400 Bad Request');
  assert(noImageRes.data.error.includes('Missing required image payload'), 'Error explains missing image');

  // 3. Missing category payload
  const noCatReq = {
    method: 'POST',
    headers: {},
    body: { image: 'data:image/jpeg;base64,1234' }
  };
  const noCatRes = createMockRes();
  await handler(noCatReq, noCatRes);
  assert(noCatRes.statusCode === 400, 'Missing category returns 400 Bad Request');

  // 4. Invalid image URI scheme
  const invalidSchemeReq = {
    method: 'POST',
    headers: {},
    body: { image: 'https://example.com/photo.jpg', category: 'balcony-garden' }
  };
  const invalidSchemeRes = createMockRes();
  await handler(invalidSchemeReq, invalidSchemeRes);
  assert(invalidSchemeRes.statusCode === 400, 'Non-data-URI image returns 400 Bad Request');

  // 5. Unsupported MIME type in data URI
  const unsupportedMimeReq = {
    method: 'POST',
    headers: {},
    body: { image: 'data:image/bmp;base64,Qk02', category: 'balcony-garden' }
  };
  const unsupportedMimeRes = createMockRes();
  await handler(unsupportedMimeReq, unsupportedMimeRes);
  assert(unsupportedMimeRes.statusCode === 400, 'Unsupported MIME type (BMP) returns 400 Bad Request');

  // 6. Missing API Key on server returns 503 with configuration instructions
  const origKey = process.env.GEMINI_API_KEY;
  const origKeyAlt = process.env.gemini_API_KEY;
  delete process.env.GEMINI_API_KEY;
  delete process.env.gemini_API_KEY;

  const validDataUri = 'data:image/jpeg;base64,' + Buffer.from('fake-image-bytes-header-sample').toString('base64');
  const missingKeyReq = {
    method: 'POST',
    headers: {},
    body: { image: validDataUri, category: 'balcony-garden' }
  };
  const missingKeyRes = createMockRes();
  await handler(missingKeyReq, missingKeyRes);

  assert(missingKeyRes.statusCode === 503, 'Missing server API key returns 503 Service Unavailable');
  assert(missingKeyRes.data.code === 'MISSING_API_KEY', 'Returns structured error code MISSING_API_KEY');
  assert(missingKeyRes.data.error.includes('GEMINI_API_KEY'), 'Explains how to set GEMINI_API_KEY in environment variables');

  // Restore env if it existed
  if (origKey) process.env.GEMINI_API_KEY = origKey;
  if (origKeyAlt) process.env.gemini_API_KEY = origKeyAlt;

  console.log('\n======================================================');
  console.log('--- TEST SUITE 4: Email Validation & Formatting ---');
  console.log('======================================================');

  // Email format validation
  assert(isValidEmail('client@aboveconceptliving.com') === true, 'Valid client email passes');
  assert(isValidEmail('pune.villa@domain.co.in') === true, 'Valid multi-segment domain passes');
  assert(isValidEmail('invalid-email') === false, 'Plain string without domain is rejected');
  assert(isValidEmail('@missinguser.com') === false, 'Missing username is rejected');
  assert(isValidEmail('missing-domain@.com') === false, 'Invalid domain format is rejected');
  assert(isValidEmail('') === false, 'Empty string is rejected');

  console.log('\n======================================================');
  console.log('--- TEST SUITE 5: Cloudflare Workers AI Transformation ---');
  console.log('======================================================');

  // 1. Verify Cloudflare Worker constants
  assert(CLOUDFLARE_WORKER_URL === 'https://above-ai-image-generator.udeshk28.workers.dev/', 'CLOUDFLARE_WORKER_URL matches deployed worker');
  assert(CLOUDFLARE_MODEL_NAME === '@cf/black-forest-labs/flux-2-klein-4b', 'CLOUDFLARE_MODEL_NAME matches flux-2-klein-4b model');

  // 2. Test convertSourceToBlob with simulated data URL
  const sampleDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const decodedBlob = await convertSourceToBlob(sampleDataUri);
  assert(decodedBlob instanceof Blob, 'convertSourceToBlob converts Data URL to Blob');
  assert(decodedBlob.type === 'image/png', 'convertSourceToBlob preserves image/png MIME type');
  assert(decodedBlob.size > 0, 'convertSourceToBlob produces non-empty Blob');

  // 3. Test convertSourceToBlob with real Blob
  const nativeBlob = new Blob(['sample-pixel-data'], { type: 'image/jpeg' });
  const returnedBlob = await convertSourceToBlob(nativeBlob);
  assert(returnedBlob === nativeBlob, 'convertSourceToBlob passes through native Blob untouched');

  // 4. Test input validation errors
  let missingImageError = null;
  try {
    await transformImageWithCloudflare({ image: null, prompt: 'A lush garden' });
  } catch (e) {
    missingImageError = e;
  }
  assert(missingImageError instanceof ImageTransformationError, 'Missing image throws ImageTransformationError');
  assert(missingImageError.status === 400, 'Missing image returns status 400');

  let missingPromptError = null;
  try {
    await transformImageWithCloudflare({ image: nativeBlob, prompt: '' });
  } catch (e) {
    missingPromptError = e;
  }
  assert(missingPromptError instanceof ImageTransformationError, 'Missing prompt throws ImageTransformationError');
  assert(missingPromptError.status === 400, 'Missing prompt returns status 400');

  // 5. Test base64ToBlobUrl with mock mock URL.createObjectURL in Node
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  let mockUrlCreated = null;
  URL.createObjectURL = (blob) => {
    mockUrlCreated = `blob:nock-test/${Date.now()}`;
    return mockUrlCreated;
  };
  URL.revokeObjectURL = (url) => {};

  const sampleB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const decodedResult = base64ToBlobUrl(sampleB64, 'image/png');
  assert(decodedResult.blob instanceof Blob, 'base64ToBlobUrl produces valid Blob');
  assert(decodedResult.blob.size === 70, `base64ToBlobUrl correctly calculates binary byte size (${decodedResult.blob.size} bytes)`);
  assert(decodedResult.imageUrl.startsWith('blob:'), 'base64ToBlobUrl creates blob: URL for preview');

  // Restore URL methods
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;

  // 6. Test Live Cloudflare Worker Health GET Endpoint
  try {
    const healthRes = await fetch(CLOUDFLARE_WORKER_URL);
    assert(healthRes.ok, `Cloudflare Worker GET responded with status ${healthRes.status}`);
    const healthData = await healthRes.json();
    assert(healthData.status === 'online', 'Cloudflare Worker health status is online');
    assert(healthData.model === '@cf/black-forest-labs/flux-2-klein-4b', 'Cloudflare Worker confirms model @cf/black-forest-labs/flux-2-klein-4b');
  } catch (netErr) {
    console.error('Cloudflare Worker health check failed:', netErr);
    assert(false, `Could not reach Cloudflare Worker: ${netErr.message}`);
  }

  console.log('\n======================================================');
  console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test suite error:', err);
  process.exit(1);
});
