import glassJarConcept from '../assets/product-glass-jars.svg';
import honeyStickConcept from '../assets/product-honey-sticks.svg';
import portionPackConcept from '../assets/product-portion-packs.svg';

export const PRODUCT_VISUALS = Object.freeze({
  'glass-jars': Object.freeze({
    src: glassJarConcept,
    alt: 'Illustrative concept of HONIESH glass jars with branded labels.',
    caption: 'Glass jar packaging concept. Final jar design has not been finalized.',
  }),
  'honey-sticks': Object.freeze({
    src: honeyStickConcept,
    alt: 'Illustrative concept of a HONIESH cylindrical honey stick container with individual sticks.',
    caption: 'Honey stick packaging concept. Final packaging photography pending.',
  }),
  'portion-packs': Object.freeze({
    src: portionPackConcept,
    alt: 'Illustrative concept of a HONIESH split-open portion-pack dispensing box.',
    caption: 'Portion-pack packaging concept showing the intended split-open dispensing design.',
  }),
});

export function getProductVisual(packagingId, product = null) {
  const visual = PRODUCT_VISUALS[packagingId] ?? PRODUCT_VISUALS['glass-jars'];

  if (!product) return visual;

  return Object.freeze({
    ...visual,
    alt: `${product.displayName}: ${visual.alt}`,
    caption: `${product.displayName} — ${visual.caption}`,
  });
}

export function getProductVariantBadge(product) {
  if (!product) return null;
  if (product.sizeLabel) return product.sizeLabel;
  if (product.unitCount && product.unitWeightGrams) return `${product.unitCount} × ${product.unitWeightGrams} g`;
  return product.format;
}
