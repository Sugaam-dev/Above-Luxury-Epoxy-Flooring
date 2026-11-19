/**
 * Transformation Categories & Architectural Prompts Configuration
 * ABOVE° — Concept Living AI Studio
 */

export const TRANSFORMATION_CATEGORIES = [
  {
    id: 'balcony-garden',
    title: 'Balcony Garden Transformation',
    subtitle: 'Elevated Biophilic Balconies',
    pillar: 'Elevated Landscapes',
    badge: 'Pillar 01',
    description: 'Turn plain concrete balconies into lush, layered botanical sanctuaries with vertical greens and ambient glow.',
    defaultInstructions: 'Create a luxurious tropical balcony garden with layered greenery, architectural planters, and warm ambient lighting.',
    systemPrompt: `You are an elite architectural visualization and landscape design AI working for ABOVE° Concept Living.
Transform the uploaded balcony space into a luxurious, ultra-premium biophilic living sanctuary.
Key Requirements:
- Analyze the input photograph with high fidelity.
- Strictly PRESERVE the original camera perspective, focal length, field of view, and vanishing lines.
- Strictly PRESERVE the physical room dimensions, floor perimeter, structural columns, ceiling height, balcony railing geometry, and structural openings.
- Modify ONLY the designated garden, surface, and furnishing design elements: introduce dense multi-layered tropical foliage, architectural monolith planters, bespoke vertical living walls, fluted wood accents, and concealed warm ambient LED strip illumination (2700K).
- Render photorealistic textures, specular highlights on plant foliage, realistic soft shadows, and physically accurate natural daylight or warm twilight illumination.
- Do NOT distort walls, railings, or background architecture. Do NOT add cartoonish elements, watermarks, text, or logos. Output a pristine, photorealistic architectural photograph.`
  },
  {
    id: 'vertical-garden',
    title: 'Vertical Garden Design',
    subtitle: 'Living Bio-Walls & Planters',
    pillar: 'Elevated Landscapes',
    badge: 'Pillar 01',
    description: 'Bespoke vertical living plant walls with automated misting aesthetics, lush textures, and natural depth.',
    defaultInstructions: 'Install a dense, artistic vertical living wall with varied fern textures, philodendrons, and subtle upward accent lighting.',
    systemPrompt: `You are an elite architectural visualization and landscape design AI working for ABOVE° Concept Living.
Transform the feature wall or boundary in the uploaded image into an architectural vertical living garden.
Key Requirements:
- Analyze the input photograph with high fidelity.
- Strictly PRESERVE the exact camera perspective, horizon line, adjacent wall structures, and room boundaries.
- Replace or enhance the target feature wall with a meticulously composed vertical green wall featuring diverse foliage: trailing ivies, lush monsteras, variegated calatheas, nephrolepis ferns, and architectural moss layers.
- Incorporate subtle micro-irrigation aesthetics, clean brushed brass or dark anthracite border framing, and integrated soft warm spotlighting pointing upwards onto the foliage.
- Maintain accurate architectural perspective, realistic depth of field, and natural leaf translucency.
- Avoid distortions, oversaturation, text, watermarks, or artificial clutter. Output a pristine, photorealistic architectural photograph.`
  },
  {
    id: 'terrace-garden',
    title: 'Terrace Garden Transformation',
    subtitle: 'Rooftop Oasis & Pergola Living',
    pillar: 'Elevated Landscapes',
    badge: 'Pillar 01',
    description: 'Transform open rooftops and expansive terraces into resort-grade sky sanctuaries with pergolas and curated flora.',
    defaultInstructions: 'Design a high-end rooftop terrace with contemporary timber pergolas, lush perimeter landscaping, and luxury outdoor lounge seating.',
    systemPrompt: `You are an elite architectural visualization and landscape design AI working for ABOVE° Concept Living.
Transform the uploaded terrace or rooftop space into an ultra-luxury outdoor living oasis.
Key Requirements:
- Analyze the input photograph with high fidelity.
- PRESERVE the overall sky orientation, boundary walls, floor footprints, surrounding skyline perspective, and structural elements.
- Introduce a refined modern minimalist pergola with fluted wooden rafters, curated perimeter raised planter beds brimming with resilient subtropical greenery, built-in teakwood bench lounges with neutral weatherproof linen upholstery, and low-glare architectural lighting.
- Render physically accurate natural light cast, sky reflections, realistic stone/decking textures, and lush leaf details.
- Avoid geometric distortions, fake objects, text, logos, or watermarks. Output a pristine, photorealistic architectural photograph.`
  },
  {
    id: 'epoxy-3d-floor',
    title: '3D Epoxy Flooring',
    subtitle: 'Defying Liquid Surfaces',
    pillar: 'Defying Surfaces',
    badge: 'Pillar 02',
    description: 'Replace standard tiles with breathtaking 3D liquid epoxy flooring featuring realistic optical depth and aquatic or geological motion.',
    defaultInstructions: 'Transform the floor into a mesmerizing 3D ocean-shoreline epoxy with crystalline turquoise depth, foam crests, and natural light refractions.',
    systemPrompt: `You are an elite architectural visualization and surface engineering AI working for ABOVE° Concept Living.
Transform the existing floor of the uploaded room into a hyper-realistic, high-gloss 3D epoxy surface.
Key Requirements:
- Analyze the input photograph with high fidelity.
- Strictly PRESERVE the room layout, walls, doors, skirting lines, furniture placement, architectural pillars, and camera perspective.
- Transform ONLY the floor surface into a seamless, high-gloss 3D epoxy floor featuring realistic visual depth (e.g. oceanic shoreline wave transitions, crystal clear resin refractions, or three-dimensional geological textures).
- Accurately project mirror-like specular reflections of the existing walls, windows, and light sources onto the epoxy surface with natural fresnel falloff.
- Avoid warping the walls, floating furniture, or skewing the perspective lines. No text, logos, or watermarks. Output a pristine, photorealistic architectural photograph.`
  },
  {
    id: 'metallic-marble',
    title: 'Metallic Marble Flooring',
    subtitle: 'Fluid Metallic Veins & Mirror Finish',
    pillar: 'Defying Surfaces',
    badge: 'Pillar 02',
    description: 'Seamless liquid-metallic marble surfaces with custom mica swirls, opulent gold or platinum veins, and mirror reflections.',
    defaultInstructions: 'Apply an opulent fluid metallic marble floor with charcoal, champagne-gold, and pearl-white swirls in a glass-smooth finish.',
    systemPrompt: `You are an elite architectural visualization and surface engineering AI working for ABOVE° Concept Living.
Transform the floor in the uploaded image into a seamless, high-end metallic marble epoxy surface.
Key Requirements:
- Analyze the input photograph with high fidelity.
- Strictly PRESERVE all existing walls, cabinetry, structural pillars, ceiling details, window frames, and camera angles.
- Replace the floor finish with a monolithic, seamless metallic marble resin surface boasting organic fluid mica swirls, rich depth, elegant champagne-gold or charcoal ribbons, and an immaculate mirror-gloss topcoat.
- Ensure natural light bouncing from windows and ambient fixtures casts authentic specular reflections across the floor surface.
- Keep all structural proportions intact. Do NOT add unnecessary clutter, text, or watermarks. Output a pristine, photorealistic architectural photograph.`
  },
  {
    id: 'agate-floor',
    title: 'Agate Floor Transformation',
    subtitle: 'Semiprecious Gemstone Luminescence',
    pillar: 'Defying Surfaces',
    badge: 'Pillar 02',
    description: 'Bespoke semiprecious agate and geode flooring designs with translucent crystalline rings and emerald or sapphire depths.',
    defaultInstructions: 'Transform the floor into a luxurious emerald-green and gold geode agate surface with translucent crystal bands and deep jewel tones.',
    systemPrompt: `You are an elite architectural visualization and surface engineering AI working for ABOVE° Concept Living.
Transform the floor in the uploaded image into an awe-inspiring semiprecious agate and geode stone epoxy floor.
Key Requirements:
- Analyze the input photograph with high fidelity.
- Strictly PRESERVE the room dimensions, wall boundaries, furniture, perspective lines, and ambient lighting conditions.
- Render the floor with concentric crystalline agate bands, mineral crystallization textures, translucent resin depth, and metallic leaf gilding along vein borders.
- Capture authentic subsurface light scattering, polished mirror reflections, and high-end artisanal craftsmanship.
- Maintain photorealistic architectural standards. Avoid distortions, watermarks, text, or artificial artifacts. Output a pristine, photorealistic architectural photograph.`
  },
  {
    id: 'textured-wall',
    title: '3D Textured Wall Design',
    subtitle: 'Architectural Feature Walls',
    pillar: 'Defying Surfaces',
    badge: 'Pillar 02',
    description: 'Sculptural acoustic fluting, micro-cement relief, and Venetian plaster textures with integrated grazing illumination.',
    defaultInstructions: 'Create an architectural 3D fluted micro-cement feature wall with warm grazing linear lights that cast soft linear shadows.',
    systemPrompt: `You are an elite architectural visualization and interior design AI working for ABOVE° Concept Living.
Transform the main feature wall in the uploaded room into an architectural 3D textured relief wall.
Key Requirements:
- Analyze the input photograph with high fidelity.
- Strictly PRESERVE the room layout, ceiling, floor, furniture, camera perspective, and adjoining walls.
- Resurface the primary feature wall with bespoke 3D textured architecture: subtle geometric relief fluting, artisanal micro-cement, or Venetian plaster with tactile stone feel.
- Incorporate recessed architectural grazing light fixtures along the ceiling or floor perimeter to cast delicate, tactile shadows across the three-dimensional surface contours.
- Avoid warped geometry, structural anomalies, text, logos, or watermarks. Output a pristine, photorealistic architectural photograph.`
  },
  {
    id: 'luxury-outdoor',
    title: 'Luxury Outdoor Living Space',
    subtitle: 'Integrated Canopy & Lounge',
    pillar: 'Elevated Landscapes & Surfaces',
    badge: 'Signature',
    description: 'Comprehensive transformation combining biophilic greenery, seamless metallic floors, custom seating, and smart lighting.',
    defaultInstructions: 'Deliver an integrated concept living transformation combining seamless metallic flooring, lush vertical greenery, and warm recessed mood lighting.',
    systemPrompt: `You are an elite architectural visualization and concept living design AI working for ABOVE° Concept Living.
Perform a comprehensive, ultra-luxury transformation of the uploaded space into an award-winning concept living environment.
Key Requirements:
- Analyze the input photograph with high fidelity.
- Strictly PRESERVE the foundational camera angle, structural boundaries, and architectural frame of the space.
- Harmoniously integrate ABOVE° core pillars: elevated biophilic greenery (tropical foliage, vertical green arrangements), premium defying surfaces (seamless metallic or 3D floor with glossy finish), and warm layered architectural lighting (concealed 2700K LED strips and warm accent spots).
- Ensure realistic physical material behavior: wood grain warmth, polished floor reflections, leaf translucency, and warm atmospheric radiance.
- Preserve spatial geometry without unrealistic objects, text, logos, or watermarks. Output a pristine, photorealistic architectural photograph.`
  }
];

/**
 * Builds the complete prompt for the AI image generation model
 * @param {string} categoryId - Identifier of the selected preset
 * @param {string} [customInstructions] - Optional user guidance
 * @returns {{ category: object, prompt: string }}
 */
export function buildTransformationPrompt(categoryId, customInstructions = '') {
  const category = TRANSFORMATION_CATEGORIES.find(c => c.id === categoryId) || TRANSFORMATION_CATEGORIES[0];
  
  const trimmedUserInstructions = customInstructions?.trim();
  const userInstructionBlock = trimmedUserInstructions
    ? `\n\nSpecific Client Design Preferences:\n"${trimmedUserInstructions}"\nIncorporate these client preferences tastefully while respecting all structural constraints and physical realism.`
    : `\n\nDesign Direction:\n"${category.defaultInstructions}"`;

  const finalPrompt = `${category.systemPrompt}${userInstructionBlock}\n\nDeliver the final output as a crisp, ultra-high-resolution photorealistic architectural visualization.`;

  return {
    category,
    prompt: finalPrompt
  };
}
