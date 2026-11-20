export const FORMULATION_STATUS = Object.freeze({
  unconfirmed: 'unconfirmed',
});

export const FLAVOURS = Object.freeze([
  {
    id: 'original-honey',
    slug: 'original-honey',
    name: 'Original',
    conceptDirection: 'original',
    description: 'Original concept direction in the HONIESH collection. Formulation and ingredient details pending confirmation.',
    accentColor: '#c99536',
    accentSoft: '#f4e8d1',
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
    name: 'Ginger',
    conceptDirection: 'ginger',
    description: 'Ginger concept direction in the HONIESH collection. Formulation and ingredient details pending confirmation.',
    accentColor: '#b96b43',
    accentSoft: '#f3e2d7',
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
    name: 'Lemon',
    conceptDirection: 'lemon',
    description: 'Lemon concept direction in the HONIESH collection. Formulation and ingredient details pending confirmation.',
    accentColor: '#d3b84f',
    accentSoft: '#f7f2d8',
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
    name: 'Cinnamon',
    conceptDirection: 'cinnamon',
    description: 'Cinnamon concept direction in the HONIESH collection. Formulation and ingredient details pending confirmation.',
    accentColor: '#965c47',
    accentSoft: '#efe0d9',
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
    name: 'Cardamom',
    conceptDirection: 'cardamom',
    description: 'Cardamom concept direction in the HONIESH collection. Formulation and ingredient details pending confirmation.',
    accentColor: '#798268',
    accentSoft: '#e7ebdf',
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
