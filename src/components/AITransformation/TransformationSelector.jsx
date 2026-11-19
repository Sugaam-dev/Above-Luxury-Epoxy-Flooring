import { motion } from 'framer-motion';
import {
  Sparkles,
  TreePine,
  Layers,
  Compass,
  Waves,
  Gem,
  Palette,
  Maximize2
} from 'lucide-react';
import { TRANSFORMATION_CATEGORIES } from '../../utils/transformationPrompts';

// Icon map for presets
const CATEGORY_ICONS = {
  'balcony-garden': TreePine,
  'vertical-garden': Layers,
  'terrace-garden': Compass,
  'epoxy-3d-floor': Waves,
  'metallic-marble': Palette,
  'agate-floor': Gem,
  'textured-wall': Maximize2,
  'luxury-outdoor': Sparkles,
};

export default function TransformationSelector({
  selectedCategory,
  onSelectCategory,
  disabled = false
}) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <label className="font-ui text-[11px] tracking-[0.18em] uppercase text-ink font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
          <span>Select Design Preset</span>
        </label>
        <span className="font-ui text-[9px] tracking-wider uppercase text-ash">
          {TRANSFORMATION_CATEGORIES.length} Styles
        </span>
      </div>

      {/* 8 Presets in Compact 2-Column Grid */}
      <div className="grid grid-cols-2 gap-2">
        {TRANSFORMATION_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
          const isSelected = cat.id === selectedCategory;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              disabled={disabled}
              className={`group text-left p-2.5 rounded-xl border transition-all duration-200 relative flex flex-col justify-between h-[104px] sm:h-[112px] ${
                isSelected
                  ? 'border-forest bg-forest/[0.08] ring-1 ring-forest/30 shadow-sm'
                  : 'border-black/10 hover:border-forest/40 bg-cream-card/80 hover:bg-forest-pale/25'
              } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Header: Icon + Badge */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-forest text-white'
                      : 'bg-forest/10 text-forest group-hover:bg-forest/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`font-ui text-[8px] tracking-wider uppercase px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-forest text-white font-semibold'
                      : 'bg-black/5 text-ash group-hover:text-ink'
                  }`}
                >
                  {cat.badge}
                </span>
              </div>

              {/* Title & short description */}
              <div className="mt-1">
                <h5 className={`font-heading font-bold text-xs leading-snug line-clamp-1 transition-colors ${
                  isSelected ? 'text-forest-dark' : 'text-ink group-hover:text-forest'
                }`}>
                  {cat.title}
                </h5>
                <p className="font-body text-[10px] text-ash/80 mt-0.5 line-clamp-2 leading-tight">
                  {cat.subtitle || cat.description}
                </p>
              </div>

              {/* Active selection dot */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-forest" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
