export const PACKAGING_STATUS = Object.freeze({
  confirmedSpecification: 'confirmed-specification',
  conceptVisualPendingPhotography: 'concept-visual-pending-photography',
});

export const PACKAGING_IDENTITY = Object.freeze({
  batchCertification: 'Every product box includes a batch certification sticker. Certification authorities, standards and test results are not published here.',
  finalPackagingNotice: 'Packaging artwork shown on this website is a concept presentation, not final manufactured packaging.',
});

export const PACKAGING_FAMILIES = Object.freeze([
  {
    id: 'glass-jars',
    slug: 'glass-jars',
    name: 'Glass Jar Collection',
    shortName: 'Glass jar',
    format: 'Glass jar',
    specificationStatus: PACKAGING_STATUS.confirmedSpecification,
    finalDesignStatus: 'not-finalized',
    visualStatus: PACKAGING_STATUS.conceptVisualPendingPhotography,
    visualDisclosure: 'Premium illustrative packaging concept; not a photograph of finalized packaging.',
    sizeLabel: 'Size',
    sizes: Object.freeze([
      Object.freeze({
        id: '250-g',
        label: '250 g',
        value: 250,
        unit: 'g',
        unitType: 'mass',
      }),
      Object.freeze({
        id: '500-g',
        label: '500 g',
        value: 500,
        unit: 'g',
        unitType: 'mass',
      }),
      Object.freeze({
        id: '1-litre',
        label: '1 litre',
        value: 1,
        unit: 'litre',
        unitType: 'volume',
      }),
    ]),
    unitCount: null,
    unitWeightGrams: null,
    netContent: null,
    intendedConvenience: 'Glass jar format available in 250 g, 500 g and 1 litre.',
    displayOrder: 1,
  },
  {
    id: 'honey-sticks',
    slug: 'honey-sticks',
    name: 'Honey Sticks Collection',
    shortName: 'Honey sticks',
    format: 'Cylindrical container with a removable top lid',
    specificationStatus: PACKAGING_STATUS.confirmedSpecification,
    finalDesignStatus: 'concept-presentation',
    visualStatus: PACKAGING_STATUS.conceptVisualPendingPhotography,
    visualDisclosure: 'Illustration showing the cylindrical container and individual sticks; concept presentation.',
    sizeLabel: 'Format',
    sizes: Object.freeze([]),
    unitCount: 20,
    unitWeightGrams: 8,
    netContent: Object.freeze({
      value: 160,
      unit: 'g',
      unitType: 'mass',
      label: '160 g',
    }),
    intendedConvenience: 'Individually wrapped single-serve sticks stored in a cylindrical container with a removable top lid.',
    displayOrder: 2,
  },
  {
    id: 'portion-packs',
    slug: 'portion-packs',
    name: 'Hygienic Portion Pack Collection',
    shortName: 'Portion packs',
    format: 'Plastic dispensing box with a split-open dispensing design',
    specificationStatus: PACKAGING_STATUS.confirmedSpecification,
    finalDesignStatus: 'concept-presentation',
    visualStatus: PACKAGING_STATUS.conceptVisualPendingPhotography,
    visualDisclosure: 'Illustration showing the intended split-open dispensing design; concept presentation.',
    sizeLabel: 'Format',
    sizes: Object.freeze([]),
    unitCount: 30,
    unitWeightGrams: 8,
    netContent: Object.freeze({
      value: 240,
      unit: 'g',
      unitType: 'mass',
      label: '240 g',
    }),
    intendedConvenience: 'A dispensing box intended to make individual 8 g portions convenient to access.',
    displayOrder: 3,
  },
]);

export const PACKAGING_BY_ID = Object.freeze(
  Object.fromEntries(PACKAGING_FAMILIES.map((family) => [family.id, family])),
);

export const PACKAGING_BY_SLUG = Object.freeze(
  Object.fromEntries(PACKAGING_FAMILIES.map((family) => [family.slug, family])),
);

export const GLASS_JAR_SIZES = Object.freeze(
  PACKAGING_BY_ID['glass-jars'].sizes.map((size) => ({ ...size })),
);

export const PACKAGING_PATHS = Object.freeze(
  Object.fromEntries(PACKAGING_FAMILIES.map((family) => [family.id, `/products/${family.slug}/`])),
);

export const PACKAGING_SUMMARY = Object.freeze({
  totalFamilies: PACKAGING_FAMILIES.length,
  glassJarSizes: GLASS_JAR_SIZES.length,
  honeyStickCount: PACKAGING_BY_ID['honey-sticks'].unitCount,
  honeyStickWeightGrams: PACKAGING_BY_ID['honey-sticks'].unitWeightGrams,
  honeyStickNetContentGrams: PACKAGING_BY_ID['honey-sticks'].netContent.value,
  portionPackCount: PACKAGING_BY_ID['portion-packs'].unitCount,
  portionPackWeightGrams: PACKAGING_BY_ID['portion-packs'].unitWeightGrams,
  portionPackNetContentGrams: PACKAGING_BY_ID['portion-packs'].netContent.value,
  volumeRule: 'The 1 litre glass jar is a volume specification and must not be described as 1 kg.',
  batchCertification: PACKAGING_IDENTITY.batchCertification,
  finalPackagingNotice: PACKAGING_IDENTITY.finalPackagingNotice,
});
