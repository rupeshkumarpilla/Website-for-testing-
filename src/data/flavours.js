export const FORMULATION_STATUS = Object.freeze({
  unconfirmed: 'unconfirmed',
});

export const FLAVOURS = Object.freeze([
  {
    id: 'original-honey',
    slug: 'original-honey',
    name: 'Original Honey',
    conceptDirection: 'original',
    description: 'Initial creative flavour concept for the HONIESH website.',
    formulationStatus: FORMULATION_STATUS.unconfirmed,
    ingredients: null,
    ingredientPercentages: null,
    nutritionalValues: null,
    healthClaims: null,
    reviewRequired: true,
    pendingInformation: [
      'Confirmed ingredient list',
      'Confirmed formulation',
      'Approved product description',
    ],
  },
  {
    id: 'ginger-honey',
    slug: 'ginger-honey',
    name: 'Ginger Honey',
    conceptDirection: 'ginger',
    description: 'Initial creative flavour concept using the ginger flavour direction.',
    formulationStatus: FORMULATION_STATUS.unconfirmed,
    ingredients: null,
    ingredientPercentages: null,
    nutritionalValues: null,
    healthClaims: null,
    reviewRequired: true,
    pendingInformation: [
      'Confirmed ingredient list',
      'Confirmed ginger formulation',
      'Approved product description',
    ],
  },
  {
    id: 'lemon-honey',
    slug: 'lemon-honey',
    name: 'Lemon Honey',
    conceptDirection: 'lemon',
    description: 'Initial creative flavour concept using the lemon flavour direction.',
    formulationStatus: FORMULATION_STATUS.unconfirmed,
    ingredients: null,
    ingredientPercentages: null,
    nutritionalValues: null,
    healthClaims: null,
    reviewRequired: true,
    pendingInformation: [
      'Confirmed ingredient list',
      'Confirmed lemon formulation',
      'Approved product description',
    ],
  },
  {
    id: 'cinnamon-honey',
    slug: 'cinnamon-honey',
    name: 'Cinnamon Honey',
    conceptDirection: 'cinnamon',
    description: 'Initial creative flavour concept using the cinnamon flavour direction.',
    formulationStatus: FORMULATION_STATUS.unconfirmed,
    ingredients: null,
    ingredientPercentages: null,
    nutritionalValues: null,
    healthClaims: null,
    reviewRequired: true,
    pendingInformation: [
      'Confirmed ingredient list',
      'Confirmed cinnamon formulation',
      'Approved product description',
    ],
  },
  {
    id: 'cardamom-honey',
    slug: 'cardamom-honey',
    name: 'Cardamom Honey',
    conceptDirection: 'cardamom',
    description: 'Initial creative flavour concept using the cardamom flavour direction.',
    formulationStatus: FORMULATION_STATUS.unconfirmed,
    ingredients: null,
    ingredientPercentages: null,
    nutritionalValues: null,
    healthClaims: null,
    reviewRequired: true,
    pendingInformation: [
      'Confirmed ingredient list',
      'Confirmed cardamom formulation',
      'Approved product description',
    ],
  },
]);

export const FLAVOUR_BY_ID = Object.freeze(
  Object.fromEntries(FLAVOURS.map((flavour) => [flavour.id, flavour])),
);

export const FLAVOUR_BY_SLUG = Object.freeze(
  Object.fromEntries(FLAVOURS.map((flavour) => [flavour.slug, flavour])),
);

export const FLAVOUR_PATHS = Object.freeze(
  Object.fromEntries(FLAVOURS.map((flavour) => [flavour.id, `/flavours/${flavour.slug}/`])),
);

export const FLAVOUR_SUMMARY = Object.freeze({
  total: FLAVOURS.length,
  formulationStatus: FORMULATION_STATUS.unconfirmed,
  publicationRule: 'Flavour concepts are website concepts until formulation details are confirmed.',
});
