import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Eye } from 'lucide-react';
import ImageUploader from './ImageUploader';
import TransformationSelector from './TransformationSelector';
import TransformationResult from './TransformationResult';
import { TRANSFORMATION_CATEGORIES } from '../../utils/transformationPrompts';
import { generateAITransformation } from '../../services/imageTransformationService';

// Fade-up animation helper consistent with LandscapesSection/SurfacesSection
const fu = (d = 0) => ({
  initial:     { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] },
});

export default function AITransformationStudio() {
  const [state, setState] = useState('idle'); // 'idle' | 'image_selected' | 'generating' | 'generated' | 'error'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(TRANSFORMATION_CATEGORIES[0].id);
  const [statusStepMessage, setStatusStepMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for tracking active request and generated Blob URL lifecycle
  const abortControllerRef = useRef(null);
  const generatedImageRef = useRef(null);

  // Selected category object
  const currentCategory = TRANSFORMATION_CATEGORIES.find(c => c.id === selectedCategory) || TRANSFORMATION_CATEGORIES[0];

  // Keep generated image ref in sync
  useEffect(() => {
    generatedImageRef.current = generatedImage;
  }, [generatedImage]);

  // Clean up object URLs and cancel pending requests on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      if (generatedImageRef.current && generatedImageRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(generatedImageRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [imagePreview]);

  // Safely revoke previous generated image Blob URL
  const revokeGeneratedImage = useCallback(() => {
    if (generatedImageRef.current && generatedImageRef.current.startsWith('blob:')) {
      URL.revokeObjectURL(generatedImageRef.current);
      generatedImageRef.current = null;
    }
    setGeneratedImage(null);
  }, []);

  // Handle image selection
  const handleImageSelected = useCallback(({ file, previewUrl, meta }) => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    revokeGeneratedImage();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setImageFile(file);
    setImagePreview(previewUrl);
    setImageMeta(meta);
    setErrorMessage('');
    setState('image_selected');
  }, [imagePreview, revokeGeneratedImage]);

  // Handle image removal
  const handleImageRemoved = useCallback(() => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    revokeGeneratedImage();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setImageFile(null);
    setImagePreview(null);
    setImageMeta(null);
    setErrorMessage('');
    setState('idle');
  }, [imagePreview, revokeGeneratedImage]);

  // Execute Cloudflare AI generation
  const handleGenerate = async () => {
    if (!imageFile && !imagePreview) return;

    // Abort any ongoing request before starting a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState('generating');
    setErrorMessage('');
    setStatusStepMessage('Reimagining your space with Cloudflare Workers AI...');

    try {
      const result = await generateAITransformation({
        image: imageFile || imagePreview,
        category: selectedCategory,
        customInstructions: '', // Uses internal architectural preset prompts automatically
        onProgressStep: (msg) => setStatusStepMessage(msg),
        signal: controller.signal
      });

      // Revoke previous generated image before applying the new one
      if (generatedImageRef.current && generatedImageRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(generatedImageRef.current);
      }

      generatedImageRef.current = result.imageUrl;
      setGeneratedImage(result.imageUrl);
      setState('generated');
    } catch (err) {
      if (controller.signal.aborted) {
        return;
      }
      console.error('Cloudflare AI Generation Failed:', err);
      setErrorMessage(err.message || 'Transformation failed. Please retry.');
      setState('error');
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  // Reset transformation studio
  const handleReset = () => {
    handleImageRemoved();
    setStatusStepMessage('');
  };

  return (
    <section id="ai-studio" className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-cream section-offset overflow-hidden">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/4 -left-48 w-80 h-80 bg-forest/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-80 h-80 bg-champagne/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1560px] mx-auto relative z-10">

        {/* ── Compact Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <motion.div {...fu(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 border border-forest/20 text-forest font-ui text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2.5 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>AI Studio · Photorealistic Spatial Engine</span>
          </motion.div>

          <motion.h2
            {...fu(0.06)}
            className="font-heading font-bold text-ink leading-tight mb-2"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            Reimagine <span className="text-gradient-green">Your Space.</span>
          </motion.h2>

          <motion.p {...fu(0.12)} className="font-body text-ink/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Upload your space photograph, choose an architectural living style, and preview your bespoke ABOVE° transformation.
          </motion.p>
        </div>

        {/* ── Two-Column Studio Workspace ── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── Left Column: Compact Controls (38–40% width) ── */}
          <motion.div {...fu(0.08)} className="w-full lg:w-[40%] xl:w-[38%] flex-shrink-0">
            <div className="card-light p-4 sm:p-5 lg:p-6 bg-cream-card rounded-2xl border border-forest/15 shadow-card space-y-4">

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                  <h3 className="font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-ink">
                    Transformation Setup
                  </h3>
                </div>
                <span className="font-ui text-[9px] uppercase tracking-wider text-ash font-medium">
                  Cloudflare Workers AI · FLUX
                </span>
              </div>

              {/* Photo Upload Area (Compact) */}
              <div>
                <ImageUploader
                  imageFile={imageFile}
                  imagePreview={imagePreview}
                  imageMeta={imageMeta}
                  onImageSelected={handleImageSelected}
                  onImageRemoved={handleImageRemoved}
                  disabled={state === 'generating'}
                />
              </div>

              {/* Presets (8 compact cards, no custom notes) */}
              <div>
                <TransformationSelector
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  disabled={state === 'generating'}
                />
              </div>

              {/* Generate CTA Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!imagePreview || state === 'generating'}
                  className={`btn-green w-full !py-3 sm:!py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-all ${
                    !imagePreview || state === 'generating'
                      ? 'opacity-50 cursor-not-allowed shadow-none'
                      : 'shadow-green-glow hover:scale-[1.01]'
                  }`}
                >
                  {state === 'generating' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="tracking-wide uppercase">Reimagining Your Space...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-emerald-300" />
                      <span className="tracking-wide uppercase">Generate AI Transformation</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] font-ui text-ash/80 mt-2 px-1">
                  <span>Perspective & geometry preserved</span>
                  <span>Fast Cloudflare AI</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── Right Column: Dominant Comparison Canvas (60–62% width) ── */}
          <motion.div {...fu(0.14)} className="w-full lg:w-[60%] xl:w-[62%] flex-grow">

            {/* 1. Empty State (Before uploading) */}
            {state === 'idle' && (
              <div className="rounded-2xl border-2 border-dashed border-black/10 bg-cream-card/70 p-6 sm:p-12 min-h-[440px] sm:min-h-[480px] lg:min-h-[530px] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-forest/8 border border-forest/15 flex items-center justify-center text-forest mb-3.5">
                  <Eye className="w-7 h-7 opacity-70" />
                </div>
                <h4 className="font-heading font-bold text-ink text-lg sm:text-xl mb-1.5">
                  Your Transformation Canvas
                </h4>
                <p className="font-body text-ash text-xs sm:text-sm max-w-md leading-relaxed mb-5">
                  Upload a photograph and select a design to preview your transformation.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-md">
                  {['Balcony Gardens', '3D Epoxy Floors', 'Vertical Walls', 'Metallic Marble', 'Agate Floors'].map(t => (
                    <span key={t} className="font-ui text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/5 text-ink/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Uploaded State (Photo uploaded, ready to generate) */}
            {state === 'image_selected' && (
              <div className="card-light overflow-hidden bg-cream-card rounded-2xl border border-forest/20 shadow-card">
                {/* Canvas Top Bar */}
                <div className="p-3 sm:p-3.5 border-b border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                    <span className="font-ui text-xs tracking-wider uppercase font-bold text-ink">
                      Original Viewport
                    </span>
                  </div>
                  <span className="font-ui text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-forest/10 text-forest font-semibold">
                    Ready to Transform
                  </span>
                </div>

                {/* Full-width image viewport with BEFORE label */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[520px] overflow-hidden bg-void/5">
                  <img
                    src={imagePreview}
                    alt="Original room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="font-ui text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-medium">
                      BEFORE · ORIGINAL
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-ui text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-sage" />
                      Target: {currentCategory.title}
                    </div>
                  </div>
                </div>

                {/* Canvas Bottom Action Bar */}
                <div className="p-3 sm:p-4 bg-forest-pale/40 flex items-center justify-between">
                  <p className="font-body text-xs text-ink/80 truncate max-w-sm">
                    Ready to render with <strong>{currentCategory.title}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="btn-green !py-2 !px-4 text-xs inline-flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Generate Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. Generating / Generated / Error States */}
            {(state === 'generating' || state === 'generated' || state === 'error') && (
              <TransformationResult
                state={state}
                statusStepMessage={statusStepMessage}
                originalImage={imagePreview}
                generatedImage={generatedImage}
                selectedCategoryObj={currentCategory}
                errorMessage={errorMessage}
                onRegenerate={handleGenerate}
                onReset={handleReset}
                onRetry={handleGenerate}
              />
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
