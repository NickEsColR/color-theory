/**
 * Lista de secciones que se renderizan en la página principal.
 * Cada elemento describe la UI de una sección y su destino de contenido.
 */
export const sections = [
  {
    id: 'selected-section',
    icon: '🎨',
    title: 'Color Seleccionado',
    contentId: 'selected-color-card',
    cardCount: 1,
  },
  {
    id: 'complementary-section',
    icon: '🔄',
    title: 'Complementario',
    description: 'El color opuesto en la rueda cromática, creando el máximo contraste.',
    contentId: 'complementary-color-card',
    cardCount: 1,
  },
  {
    id: 'analogous-section',
    icon: '📐',
    title: 'Colores Análogos',
    description: 'Colores adyacentes en la rueda cromática, creando armonía natural.',
    contentId: 'analogous-colors',
    cardCount: 2,
  },
  {
    id: 'triadic-section',
    icon: '🔺',
    title: 'Triada Cromática',
    description: 'Tres colores equidistantes en la rueda cromática, ofreciendo contraste vibrante.',
    contentId: 'triadic-colors',
    cardCount: 3,
  },
  {
    id: 'tetradic-section',
    icon: '🔲',
    title: 'Tétrada Cromática',
    description: 'Dos pares de colores complementarios, resultando en combinaciones ricas y variadas.',
    contentId: 'tetradic-colors',
    cardCount: 4,
  },
  {
    id: 'tints-section',
    icon: '⚪',
    title: 'Tintes',
    description: 'El color mezclado con blanco, aumentando la luminosidad.',
    contentId: 'tints-container',
    cardCount: 1,
  },
  {
    id: 'shades-section',
    icon: '⚫',
    title: 'Sombras',
    description: 'El color mezclado con negro, reduciendo la luminosidad.',
    contentId: 'shades-container',
    cardCount: 1,
  },
] as const;

/** Tipo inferido para una sección individual. */
export type Section = (typeof sections)[number];
