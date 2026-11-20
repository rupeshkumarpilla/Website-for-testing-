import { FLAVOURS, FORMULATION_STATUS } from './flavours.js';
import { PACKAGING_BY_ID, PACKAGING_FAMILIES } from './packaging.js';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildVariants(family) {
  if (family.sizes.length > 0) {
    return family.sizes.map((size) => ({
      size,
      sizeLabel: size.label,
      netContent: Object.freeze({
        label: size.label,
        value: size.value,
        unit: size.unit,
        unitType: size.unitType,
      }),
    }));
  }

  return [
    {
      size: null,
      sizeLabel: family.netContent.label,
      netContent: family.netContent,
    },
  ];
}

function buildConfiguration(flavour, family, variant) {
  const sizeSegment = variant.size?.id ?? 'single';
  const slug = variant.size
    ? slugify(`${family.id}-${variant.size.id}-${flavour.id}`)
    : slugify(`${family.id}-${flavour.id}`);
  const displayName = variant.size
    ? `${flavour.name} / ${family.shortName} ${variant.size.label}`
    : `${flavour.name} / ${family.shortName}`;
  const shortDescription = variant.size
    ? `${flavour.name} concept in a ${variant.size.label} glass jar. Packaging shown is a concept illustration.`
    : `${flavour.name} concept in the ${family.format}. Packaging shown is a concept illustration.`;

  return Object.freeze({
    id: slug,
    slug,
    configurationKey: `${family.id}:${flavour.id}:${sizeSegment}`,
    displayName,
    shortDescription,
    formulationNotice: 'Flavour formulation is unconfirmed and requires review before publication.',
    flavourId: flavour.id,
    flavourName: flavour.name,
    flavourSlug: flavour.slug,
    packagingId: family.id,
    packagingName: family.name,
    packagingShortName: family.shortName,
    packagingSlug: family.slug,
    sizeId: variant.size ? variant.size.id : null,
    sizeLabel: variant.size ? variant.size.label : null,
    variantLabel: variant.sizeLabel,
    unitType: variant.size ? variant.size.unitType : variant.netContent.unitType,
    netContent: variant.netContent,
    unitCount: family.unitCount,
    unitWeightGrams: family.unitWeightGrams,
    format: family.format,
    intendedConvenience: family.intendedConvenience,
    formulationStatus: FORMULATION_STATUS.unconfirmed,
    visualStatus: family.visualStatus,
    visualDisclosure: family.visualDisclosure,
    detailPageStatus: 'variant-view',
    enquiryType: 'product-enquiry',
    price: null,
    availability: null,
    sku: null,
    rating: null,
    reviewCount: null,
    reviewRequired: true,
    pendingInformation: [
      ...flavour.pendingInformation,
      'Final packaging photography or approved illustration',
    ],
  });
}

function assertCatalogueIntegrity(configurations) {
  const ids = new Set();
  const keys = new Set();
  const triples = new Set();

  configurations.forEach((configuration) => {
    const triple = `${configuration.packagingId}|${configuration.flavourId}|${configuration.sizeId ?? 'single'}`;
    if (ids.has(configuration.id)) throw new Error(`Duplicate product id: ${configuration.id}`);
    if (keys.has(configuration.configurationKey)) {
      throw new Error(`Duplicate configuration key: ${configuration.configurationKey}`);
    }
    if (triples.has(triple)) throw new Error(`Duplicate product variant: ${triple}`);
    ids.add(configuration.id);
    keys.add(configuration.configurationKey);
    triples.add(triple);
  });

  const expected = PACKAGING_FAMILIES.reduce((total, family) => {
    const variantCount = family.sizes.length > 0 ? family.sizes.length : 1;
    return total + variantCount * FLAVOURS.length;
  }, 0);

  if (configurations.length !== expected) {
    throw new Error(`Catalogue expected ${expected} configurations, received ${configurations.length}`);
  }
}

export const PRODUCT_CONFIGURATIONS = Object.freeze(
  PACKAGING_FAMILIES.flatMap((family) =>
    buildVariants(family).flatMap((variant) =>
      FLAVOURS.map((flavour) => buildConfiguration(flavour, family, variant)),
    ),
  ),
);

assertCatalogueIntegrity(PRODUCT_CONFIGURATIONS);

export const CATALOGUE_SUMMARY = Object.freeze({
  totalConfigurations: PRODUCT_CONFIGURATIONS.length,
  glassJarConfigurations: PRODUCT_CONFIGURATIONS.filter((item) => item.packagingId === 'glass-jars').length,
  honeyStickConfigurations: PRODUCT_CONFIGURATIONS.filter((item) => item.packagingId === 'honey-sticks').length,
  portionPackConfigurations: PRODUCT_CONFIGURATIONS.filter((item) => item.packagingId === 'portion-packs').length,
  flavourCount: FLAVOURS.length,
  packagingFamilyCount: PACKAGING_FAMILIES.length,
  detailPageRule: 'One detail view per stable configuration; variants are selectable from each detail view. No separate SEO pages in Stage B.',
});

const PRODUCT_BY_ID = Object.fromEntries(
  PRODUCT_CONFIGURATIONS.map((configuration) => [configuration.id, configuration]),
);

export function getProductConfiguration(id) {
  return PRODUCT_BY_ID[id] ?? null;
}

export function getProductConfigurationsByPackaging(packagingId) {
  return PRODUCT_CONFIGURATIONS.filter((configuration) => configuration.packagingId === packagingId);
}

export function getProductConfigurationsByFlavour(flavourId) {
  return PRODUCT_CONFIGURATIONS.filter((configuration) => configuration.flavourId === flavourId);
}

export function getProductConfigurationsByGlassJarSize(sizeId) {
  return PRODUCT_CONFIGURATIONS.filter(
    (configuration) => configuration.packagingId === 'glass-jars' && configuration.sizeId === sizeId,
  );
}

export function findProductConfiguration({ packagingId, flavourId, sizeId = null }) {
  return PRODUCT_CONFIGURATIONS.find(
    (configuration) =>
      configuration.packagingId === packagingId
      && configuration.flavourId === flavourId
      && configuration.sizeId === sizeId,
  ) ?? null;
}

export function getVariantConfigurations(product) {
  if (!product) return [];

  if (product.packagingId === 'glass-jars') {
    return PACKAGING_BY_ID['glass-jars'].sizes
      .map((size) => findProductConfiguration({
        packagingId: 'glass-jars',
        flavourId: product.flavourId,
        sizeId: size.id,
      }))
      .filter(Boolean);
  }

  return FLAVOURS
    .map((flavour) => findProductConfiguration({
      packagingId: product.packagingId,
      flavourId: flavour.id,
      sizeId: null,
    }))
    .filter(Boolean);
}

export function getRelatedProductConfigurations(product, limit = 4) {
  if (!product) return [];

  const orderedCandidates = [
    ...PRODUCT_CONFIGURATIONS.filter(
      (configuration) => configuration.flavourId === product.flavourId
        && configuration.packagingId !== product.packagingId,
    ),
    ...PRODUCT_CONFIGURATIONS.filter(
      (configuration) => configuration.flavourId !== product.flavourId
        && configuration.packagingId !== product.packagingId,
    ),
    ...PRODUCT_CONFIGURATIONS.filter(
      (configuration) => configuration.packagingId === product.packagingId
        && configuration.flavourId !== product.flavourId,
    ),
  ];

  const seen = new Set([product.id]);
  return orderedCandidates
    .filter((configuration) => {
      if (seen.has(configuration.id)) return false;
      seen.add(configuration.id);
      return true;
    })
    .slice(0, limit);
}

export function getCatalogueFilters() {
  return Object.freeze({
    flavours: FLAVOURS.map((flavour) => Object.freeze({
      id: flavour.id,
      label: flavour.name,
      value: flavour.id,
    })),
    packagingFamilies: PACKAGING_FAMILIES.map((family) => Object.freeze({
      id: family.id,
      label: family.shortName,
      value: family.id,
    })),
    glassJarSizes: PACKAGING_BY_ID['glass-jars'].sizes.map((size) => Object.freeze({
      id: size.id,
      label: size.label,
      value: size.id,
      unitType: size.unitType,
    })),
  });
}
