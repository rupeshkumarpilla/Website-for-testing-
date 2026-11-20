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
  const variantPart = variant.size ? variant.size.id : family.id;
  const slug = slugify(`${family.id}-${variantPart}-${flavour.id}`);
  const displayName = variant.size
    ? `${flavour.name} / ${family.shortName} ${variant.size.label}`
    : `${flavour.name} / ${family.shortName}`;

  return Object.freeze({
    id: slug,
    slug,
    displayName,
    flavourId: flavour.id,
    flavourName: flavour.name,
    flavourSlug: flavour.slug,
    packagingId: family.id,
    packagingName: family.name,
    packagingSlug: family.slug,
    sizeId: variant.size ? variant.size.id : null,
    sizeLabel: variant.size ? variant.size.label : null,
    unitType: variant.size ? variant.size.unitType : variant.netContent.unitType,
    netContent: variant.netContent,
    unitCount: family.unitCount,
    unitWeightGrams: family.unitWeightGrams,
    format: family.format,
    intendedConvenience: family.intendedConvenience,
    formulationStatus: FORMULATION_STATUS.unconfirmed,
    visualStatus: family.visualStatus,
    visualDisclosure: family.visualDisclosure,
    detailPageStatus: 'not-planned-unless-distinctive-content-added',
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

export const PRODUCT_CONFIGURATIONS = Object.freeze(
  PACKAGING_FAMILIES.flatMap((family) =>
    buildVariants(family).flatMap((variant) =>
      FLAVOURS.map((flavour) => buildConfiguration(flavour, family, variant)),
    ),
  ),
);

export const CATALOGUE_SUMMARY = Object.freeze({
  totalConfigurations: PRODUCT_CONFIGURATIONS.length,
  glassJarConfigurations: PRODUCT_CONFIGURATIONS.filter((item) => item.packagingId === 'glass-jars').length,
  honeyStickConfigurations: PRODUCT_CONFIGURATIONS.filter((item) => item.packagingId === 'honey-sticks').length,
  portionPackConfigurations: PRODUCT_CONFIGURATIONS.filter((item) => item.packagingId === 'portion-packs').length,
  flavourCount: FLAVOURS.length,
  packagingFamilyCount: PACKAGING_FAMILIES.length,
  detailPageRule: 'No 25-page SEO split; use category, packaging and flavour pages with selectable variants.',
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

export function getCatalogueFilters() {
  return Object.freeze({
    flavours: FLAVOURS.map((flavour) => Object.freeze({
      id: flavour.id,
      label: flavour.name,
      value: flavour.id,
    })),
    packagingFamilies: PACKAGING_FAMILIES.map((family) => Object.freeze({
      id: family.id,
      label: family.name,
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
