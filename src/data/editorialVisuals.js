import editorialHoneycomb from '../assets/editorial-honeycomb.svg';
import editorialStorage from '../assets/editorial-storage.svg';
import editorialTexture from '../assets/editorial-texture.svg';
import editorialKitchen from '../assets/editorial-kitchen.svg';
import editorialPackaging from '../assets/editorial-packaging.svg';
import editorialSticks from '../assets/editorial-sticks.svg';
import editorialPortions from '../assets/editorial-portions.svg';

export const EDITORIAL_VISUALS = Object.freeze({
  honeycomb: Object.freeze({
    src: editorialHoneycomb,
    alt: 'Honeycomb and honey drop editorial illustration.',
  }),
  storage: Object.freeze({
    src: editorialStorage,
    alt: 'Jar and pantry storage editorial illustration.',
  }),
  texture: Object.freeze({
    src: editorialTexture,
    alt: 'Abstract honey texture editorial illustration.',
  }),
  kitchen: Object.freeze({
    src: editorialKitchen,
    alt: 'Kitchen table and honey serving editorial illustration.',
  }),
  packaging: Object.freeze({
    src: editorialPackaging,
    alt: 'Jar, stick and portion-pack format editorial illustration.',
  }),
  sticks: Object.freeze({
    src: editorialSticks,
    alt: 'Single-serve honey stick editorial illustration.',
  }),
  portions: Object.freeze({
    src: editorialPortions,
    alt: 'Individual portion box editorial illustration.',
  }),
});

export function getEditorialVisual(visualId) {
  return EDITORIAL_VISUALS[visualId] ?? EDITORIAL_VISUALS.honeycomb;
}
