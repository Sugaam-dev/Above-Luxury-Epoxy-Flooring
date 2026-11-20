import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Mail,
  RefreshCw,
  PlusCircle,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import BeforeAfterSlider from '../BeforeAfterSlider';
import EmailImageForm from './EmailImageForm';

export default function TransformationResult({
  state, // 'generating' | 'generated' | 'error'
  statusStepMessage,
  originalImage,
  generatedImage,
  selectedCategoryObj,
  errorMessage,
  onRegenerate,
  onReset,
  onRetry
}) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Trigger download of generated image
  const handleDownload = () => {
    if (!generatedImage) return;
    try {
      setDownloading(true);
      const link = document.createElement('a');
      link.href = generatedImage;
      const categorySlug = selectedCategoryObj?.id || 'concept-living';
      link.download = `above-ai-transformation-${categorySlug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  return (
    <div className="w-full">
      {/* ── 1. GENERATING STATE ── */}
      {state === 'generating' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="relative rounded-xl overflow-hidden bg-void/95 text-white p-6 sm:p-10 min-h-[440px] sm:min-h-[500px] flex flex-col items-center justify-center text-center shadow-card-dark border border-forest/30"
        >
          {/* Subtle glowing animated backdrop */}
          <div className="absolute inset-0 bg-forest-gradient opacity-20 animate-pulse-soft pointer-events-none" />
          <div className="absolute -top-16 -left-16 w-52 h-52 bg-forest/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Architectural Scanner Graphic */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-forest/30 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-emerald-400/50 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
          </div>

          <h4 className="font-heading font-bold text-lg sm:text-xl text-white mb-6 max-w-md">
            {statusStepMessage || 'Generating Image...'}
          </h4>

          {/* Progress bar indicator */}
          <div className="w-full max-w-xs bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-forest to-emerald-300 animate-[marquee_2s_linear_infinite] w-full" />
          </div>
        </motion.div>
      )}

      {/* ── 2. ERROR STATE ── */}
      {state === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-xl bg-red-50/90 border border-red-200 text-ink shadow-sm min-h-[300px] flex flex-col justify-center"
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-red-900 text-sm sm:text-base">
                Transformation Encountered An Issue
              </h4>
              <p className="font-body text-red-800 text-xs mt-1 leading-relaxed">
                {errorMessage || 'Unable to generate transformation. Please verify your connection or try again.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onRetry}
              className="btn-green !py-2 !px-4 text-xs inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Transformation
            </button>
            <button
              type="button"
              onClick={onReset}
              className="btn-outline-green !py-2 !px-4 text-xs inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Choose Another Photo
            </button>
          </div>
        </motion.div>
      )}

      {/* ── 3. SUCCESS / GENERATED STATE ── */}
      {state === 'generated' && generatedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {/* Comparison Slider Frame */}
          <div className="rounded-xl overflow-hidden shadow-xl border border-forest/20 bg-void">
            <BeforeAfterSlider
              beforeImage={originalImage}
              afterImage={generatedImage}
              beforeLabel="BEFORE"
              afterLabel="AFTER ABOVE°"
              height="clamp(380px, 45vw, 540px)"
              className="w-full"
            />
          </div>

          <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-ash text-center">
            ← Drag slider left & right to compare Before and After →
          </p>

          {/* Compact Action Bar */}
          <div className="rounded-xl p-3 sm:p-3.5 bg-cream-card border border-forest/15 flex flex-wrap items-center justify-between gap-2.5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest" />
              <span className="font-heading font-bold text-xs sm:text-sm text-ink truncate max-w-[200px] sm:max-w-none">
                {selectedCategoryObj?.title}
              </span>
              <span className="font-ui text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-forest/10 text-forest hidden md:inline-block">
                Architectural Render
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="btn-outline-green !py-2 !px-3 text-xs inline-flex items-center gap-1.5 flex-1 sm:flex-initial justify-center"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloading ? 'Downloading...' : 'Download Image'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowEmailForm(!showEmailForm)}
                className="btn-green !py-2 !px-3 text-xs inline-flex items-center gap-1.5 flex-1 sm:flex-initial justify-center"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Image</span>
              </button>

              <button
                type="button"
                onClick={onRegenerate}
                title="Regenerate with same preset"
                className="w-8 h-8 rounded-lg border border-forest/30 hover:border-forest hover:bg-forest/10 flex items-center justify-center text-forest transition-colors flex-shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onReset}
                title="Start a new transformation"
                className="w-8 h-8 rounded-lg border border-black/10 hover:border-black/30 hover:bg-black/5 flex items-center justify-center text-ash hover:text-ink transition-colors flex-shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Collapsible Email Dispatch Form */}
          <AnimatePresence>
            {showEmailForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <EmailImageForm
                  imageUrl={generatedImage}
                  categoryTitle={selectedCategoryObj?.title}
                  onClose={() => setShowEmailForm(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
