import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validateImageFile, getImageDimensions, formatBytes } from '../../utils/imageValidation';

export default function ImageUploader({
  imageFile,
  imagePreview,
  imageMeta,
  onImageSelected,
  onImageRemoved,
  disabled = false
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState('');
  const fileInputRef = useRef(null);

  const processFile = useCallback(async (file) => {
    if (!file) return;
    setValidationError('');

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setValidationError(validation.error);
      return;
    }

    try {
      const previewUrl = URL.createObjectURL(file);
      const dims = await getImageDimensions(previewUrl);

      onImageSelected({
        file,
        previewUrl,
        meta: {
          name: file.name,
          size: file.size,
          formattedSize: formatBytes(file.size),
          width: dims.width,
          height: dims.height,
          aspectRatio: dims.aspectRatio,
          type: file.type
        }
      });
    } catch (err) {
      setValidationError('Failed to read image. Please choose another photograph.');
    }
  }, [onImageSelected]);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e?.stopPropagation();
    if (disabled) return;
    if (fileInputRef.current) fileInputRef.current.value = '';
    setValidationError('');
    onImageRemoved();
  };

  const triggerBrowse = (e) => {
    e?.stopPropagation();
    if (disabled) return;
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={disabled}
      />

      <AnimatePresence mode="wait">
        {!imagePreview ? (
          // Compact Empty Dropzone (~130px - 140px height)
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerBrowse}
            className={`relative group cursor-pointer rounded-xl border border-dashed p-4 text-center transition-all duration-200 ${
              isDragOver
                ? 'border-forest bg-forest/8 shadow-sm scale-[1.01]'
                : 'border-forest/25 hover:border-forest/60 bg-cream-card/90 hover:bg-forest-pale/30'
            } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center text-forest flex-shrink-0 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-ink text-xs sm:text-sm truncate">
                    Upload Your Space
                  </h4>
                  <span className="font-ui text-[9px] uppercase tracking-wider text-forest font-semibold">
                    Browse
                  </span>
                </div>
                <p className="font-body text-ash text-[11px] leading-tight truncate mt-0.5">
                  Drag & drop photograph or click to browse
                </p>
                <div className="font-ui text-[9px] tracking-wider text-ash/80 mt-1 uppercase">
                  JPG · PNG · WebP (up to 12 MB)
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Compact Selected Image Strip (~100px - 110px height)
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-forest/25 bg-cream-card p-2.5 sm:p-3 relative overflow-hidden shadow-sm"
          >
            <div className="flex items-center gap-3">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden bg-void/10 flex-shrink-0 border border-black/10">
                <img
                  src={imagePreview}
                  alt={imageMeta?.name || 'Uploaded photo'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 drop-shadow" />
                </div>
              </div>

              {/* Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-ui text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-forest/10 text-forest font-semibold">
                    Photo Attached
                  </span>
                </div>
                <p className="font-body font-medium text-ink text-xs truncate" title={imageMeta?.name}>
                  {imageMeta?.name || 'Selected Photograph'}
                </p>
                <div className="flex items-center gap-2 text-ash text-[10px] font-ui mt-0.5 uppercase tracking-wider">
                  {imageMeta?.width && imageMeta?.height && (
                    <span>{imageMeta.width}×{imageMeta.height}</span>
                  )}
                  {imageMeta?.formattedSize && (
                    <span>• {imageMeta.formattedSize}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={triggerBrowse}
                  disabled={disabled}
                  title="Replace photograph"
                  className="w-7 h-7 rounded-lg border border-black/10 hover:border-forest hover:bg-forest/10 text-ink/70 hover:text-forest flex items-center justify-center transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={disabled}
                  title="Remove photograph"
                  className="w-7 h-7 rounded-lg border border-black/10 hover:border-red-500 hover:bg-red-50 text-ink/70 hover:text-red-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validation Error Message */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-body"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{validationError}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
