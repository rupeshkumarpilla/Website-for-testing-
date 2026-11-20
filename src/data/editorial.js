import { PRODUCT_CONFIGURATIONS } from './products.js';

export const EDITORIAL_STATUS = Object.freeze({
  editorialDraft: 'editorial-draft',
  planned: 'planned',
  proposed: 'proposed',
  illustrativePlaceholder: 'illustrative-placeholder',
});

const SOURCE_NHB_FAQ = Object.freeze({
  label: 'National Honey Board — Honey FAQ',
  url: 'https://honey.com/faq',
});

const SOURCE_NHB_REFERENCE = Object.freeze({
  label: 'National Honey Board — Honey Reference Guide (PDF)',
  url: 'https://honey.com/images/files/refguide.pdf',
});

const SOURCE_NHB_COLOR = Object.freeze({
  label: 'National Honey Board — Honey Color and Flavor',
  url: 'https://honey.com/newsroom/presskit/honey-color-and-flavor',
});

const SOURCE_NHB_HOW_MADE = Object.freeze({
  label: 'National Honey Board — How Honey Is Made',
  url: 'https://www.honey.com/about-honey/how-honey-is-made',
});

const SOURCE_USDA_FOODKEEPER = Object.freeze({
  label: 'USDA — FoodKeeper storage guidance',
  url: 'https://www.usda.gov/about-usda/news/blog/new-usda-foodkeeper-app-your-new-tool-smart-food-storage',
});

const SOURCE_HONIESH_CATALOGUE = Object.freeze({
  label: 'HONIESH product catalogue — confirmed specifications',
  url: '#/products',
});

const PUBLICATION_NOTE = 'Editorial draft. Author, publication date and final fact-check approval are pending.';

function buildArticle(config) {
  return Object.freeze({
    author: null,
    publishedAt: null,
    status: EDITORIAL_STATUS.editorialDraft,
    factCheckRequired: true,
    publicationNote: PUBLICATION_NOTE,
    prohibitedClaims: Object.freeze(['medical', 'therapeutic', 'nutrition superiority', 'unverified origin claims']),
    ...config,
    sources: Object.freeze(config.sources ?? []),
    relatedPackagingIds: Object.freeze(config.relatedPackagingIds ?? []),
    relatedFlavourIds: Object.freeze(config.relatedFlavourIds ?? []),
    relatedArticleSlugs: Object.freeze(config.relatedArticleSlugs ?? []),
    body: Object.freeze((config.body ?? []).map((section) => Object.freeze({
      ...section,
      paragraphs: Object.freeze(section.paragraphs ?? []),
      bullets: Object.freeze(section.bullets ?? []),
    }))),
    outline: Object.freeze((config.body ?? []).map((section) => section.heading)),
  });
}

export const JOURNAL_ARTICLES = Object.freeze([
  buildArticle({
    id: 'why-does-honey-crystallize',
    slug: 'why-does-honey-crystallize',
    title: 'Why Does Honey Crystallize?',
    category: 'Honey education',
    summary: 'Crystallization is a natural honey characteristic. Learn what affects it and how to think about texture without treating it as a defect.',
    visualId: 'honeycomb',
    readingTimeMinutes: 4,
    sources: Object.freeze([SOURCE_NHB_FAQ, SOURCE_NHB_REFERENCE]),
    relatedPackagingIds: Object.freeze(['glass-jars']),
    relatedFlavourIds: Object.freeze(['original-honey']),
    relatedArticleSlugs: Object.freeze(['understanding-honey-texture-colour-and-aroma', 'how-should-honey-be-stored']),
    body: Object.freeze([
      Object.freeze({
        heading: 'Crystallization is normal',
        paragraphs: Object.freeze([
          'Honey can form crystals over time. The National Honey Board describes crystallization as a natural process and notes that all honey will eventually crystallize, even when it is filtered.',
          'A change in texture should not automatically be read as a change in quality. For HONIESH, product-specific descriptions remain pending review, so this article explains honey generally rather than describing any unconfirmed formulation.',
        ]),
      }),
      Object.freeze({
        heading: 'What influences crystal formation',
        paragraphs: Object.freeze([
          'The National Honey Board notes that suspended particles and fine air bubbles can contribute to faster crystallization, while filtering helps delay it. Storage conditions are also worth considering when a jar changes texture.',
          'Different honeys can behave differently. Colour, aroma and texture are part of honey’s natural variety, so a single texture expectation does not fit every product.',
        ]),
        bullets: Object.freeze([
          'Crystals can appear gradually rather than all at once.',
          'Texture can vary between honeys and between containers.',
          'HONIESH flavour formulations are not described here because confirmation is pending.',
        ]),
      }),
      Object.freeze({
        heading: 'Practical observations',
        paragraphs: Object.freeze([
          'If a HONIESH concept jar is being assessed, record the visible texture and keep the packaging closed between uses. Any shelf-life, storage or quality claim for a specific product needs review before publication.',
          'For general honey education, crystallization is best presented as one of honey’s natural characteristics rather than as a failure of the product.',
        ]),
      }),
    ]),
  }),
  buildArticle({
    id: 'how-should-honey-be-stored',
    slug: 'how-should-honey-be-stored',
    title: 'How Should Honey Be Stored?',
    category: 'Honey education',
    summary: 'A careful introduction to storage principles, container handling and the questions that still require a food-safety reviewer.',
    visualId: 'storage',
    readingTimeMinutes: 5,
    sources: Object.freeze([SOURCE_NHB_FAQ, SOURCE_NHB_REFERENCE, SOURCE_USDA_FOODKEEPER]),
    relatedPackagingIds: Object.freeze(['glass-jars', 'honey-sticks', 'portion-packs']),
    relatedFlavourIds: Object.freeze([]),
    relatedArticleSlugs: Object.freeze(['why-does-honey-crystallize', 'glass-jars-vs-single-serve-honey-packaging']),
    body: Object.freeze([
      Object.freeze({
        heading: 'Start with general storage guidance',
        paragraphs: Object.freeze([
          'Storage guidance for honey should come from credible food-storage and honey-sector references. The USDA FoodKeeper programme provides general guidance for many foods, while the National Honey Board publishes honey-specific educational material.',
          'This article does not promise a shelf life or make a food-safety guarantee for HONIESH products. Those statements require product-specific review.',
        ]),
      }),
      Object.freeze({
        heading: 'Container and handling considerations',
        paragraphs: Object.freeze([
          'Keep containers closed when not in use and handle them with clean utensils. These are practical handling principles, not a substitute for a verified HONIESH storage instruction.',
          'Format can affect how a product is used. Glass jars, honey sticks and portion packs each create different handling moments, but none should be described as safer or more hygienic than another without evidence.',
        ]),
        bullets: Object.freeze([
          'Keep the container closed between uses.',
          'Use clean utensils and avoid introducing moisture.',
          'Store according to verified, product-specific guidance once available.',
        ]),
      }),
      Object.freeze({
        heading: 'Questions to confirm before publication',
        paragraphs: Object.freeze([
          'A food-safety reviewer should confirm any advice about temperature, shelf life, container suitability and what to do if honey changes texture. Until then, HONIESH will keep this guidance general and clearly marked as an editorial draft.',
        ]),
      }),
    ]),
  }),
  buildArticle({
    id: 'understanding-honey-texture-colour-and-aroma',
    slug: 'understanding-honey-texture-colour-and-aroma',
    title: 'Understanding Honey Texture, Colour and Aroma',
    category: 'Honey education',
    summary: 'Explore how honey’s sensory character varies, while keeping product-specific descriptions pending confirmation.',
    visualId: 'texture',
    readingTimeMinutes: 5,
    sources: Object.freeze([SOURCE_NHB_COLOR, SOURCE_NHB_FAQ, SOURCE_NHB_REFERENCE]),
    relatedPackagingIds: Object.freeze(['glass-jars']),
    relatedFlavourIds: Object.freeze([]),
    relatedArticleSlugs: Object.freeze(['why-does-honey-crystallize', 'honey-in-everyday-cooking']),
    body: Object.freeze([
      Object.freeze({
        heading: 'Texture',
        paragraphs: Object.freeze([
          'Honey texture can range from fluid to crystallized. The National Honey Board explains that crystallization is natural and can occur over time.',
          'HONIESH does not publish a verified texture description for any flavour concept yet. Words such as smooth, thick or creamy need product confirmation before they are used publicly.',
        ]),
      }),
      Object.freeze({
        heading: 'Colour',
        paragraphs: Object.freeze([
          'The National Honey Board notes that honey colour varies with the nectar source. Its general guide is that lighter honeys tend to be milder and darker honeys tend to have a more robust flavour.',
          'Colour should not be used alone to describe a HONIESH flavour concept. Final product descriptions need the confirmed formulation and approved visual reference.',
        ]),
      }),
      Object.freeze({
        heading: 'Aroma',
        paragraphs: Object.freeze([
          'Aroma is part of honey’s sensory character. Because HONIESH flavour formulations are unconfirmed, this journal avoids names or descriptions that imply a verified scent profile.',
          'When product details are supplied, aroma notes can be added separately from colour and texture so each claim remains traceable to an approved source.',
        ]),
      }),
    ]),
  }),
  buildArticle({
    id: 'honey-in-everyday-cooking',
    slug: 'honey-in-everyday-cooking',
    title: 'Honey in Everyday Cooking',
    category: 'Culinary guide',
    summary: 'Common culinary uses for honey, from breakfast tables to dressings, without nutrition or health claims.',
    visualId: 'kitchen',
    readingTimeMinutes: 4,
    sources: Object.freeze([SOURCE_NHB_REFERENCE, SOURCE_NHB_COLOR]),
    relatedPackagingIds: Object.freeze(['glass-jars', 'honey-sticks']),
    relatedFlavourIds: Object.freeze(['original-honey', 'cinnamon-honey', 'cardamom-honey']),
    relatedArticleSlugs: Object.freeze(['different-ways-to-use-honey-in-everyday-life', 'understanding-honey-texture-colour-and-aroma']),
    body: Object.freeze([
      Object.freeze({
        heading: 'Breakfast and spreading',
        paragraphs: Object.freeze([
          'Honey is commonly used at the breakfast table as a spread or as an addition to yoghurt, fruit and warm drinks. A jar works when several people are serving themselves; a stick or portion can be considered when individual serving is the priority.',
          'HONIESH flavour concepts are not described as confirmed ingredients. Any pairing note for cinnamon, cardamom, ginger or lemon must wait for formulation approval.',
        ]),
      }),
      Object.freeze({
        heading: 'Baking and dressings',
        paragraphs: Object.freeze([
          'The National Honey Board’s reference material covers honey’s use in cooking and baking. Honey can be considered as an ingredient in recipes where its flavour and handling characteristics are appropriate.',
          'For dressings and warm dishes, add honey gradually and taste as you go. This is a practical preparation note, not a claim about a HONIESH product’s performance.',
        ]),
        bullets: Object.freeze([
          'Drizzle over breakfast foods.',
          'Include in a dressing or marinade.',
          'Use in baking only when the recipe and product details support it.',
        ]),
      }),
      Object.freeze({
        heading: 'Choosing a format for the kitchen',
        paragraphs: Object.freeze([
          'Glass jars are presented here for shared kitchen use. Honey sticks and portion packs are presented as individual formats for convenience-focused contexts.',
          'No claims are made about price, availability, shelf life or suitability for every household.',
        ]),
      }),
    ]),
  }),
  buildArticle({
    id: 'glass-jars-vs-single-serve-honey-packaging',
    slug: 'glass-jars-vs-single-serve-honey-packaging',
    title: 'Glass Jars vs Single-Serve Honey Packaging',
    category: 'Packaging comparison',
    summary: 'Compare HONIESH’s three confirmed packaging families by format, quantity and intended convenience.',
    visualId: 'packaging',
    readingTimeMinutes: 5,
    sources: Object.freeze([SOURCE_HONIESH_CATALOGUE]),
    relatedPackagingIds: Object.freeze(['glass-jars', 'honey-sticks', 'portion-packs']),
    relatedFlavourIds: Object.freeze([]),
    relatedArticleSlugs: Object.freeze(['what-are-honey-sticks', 'how-should-honey-be-stored']),
    body: Object.freeze([
      Object.freeze({
        heading: 'Three formats, different moments',
        paragraphs: Object.freeze([
          'HONIESH presents three packaging families: glass jars, honey sticks and hygienic portion packs. Each family is shown with confirmed specifications and concept visuals.',
          'Glass jars are organised by size and flavour. Honey sticks are shown as a container holding 20 sticks of 8 g each. Portion packs are shown as a dispensing box holding 30 portions of 8 g each.',
        ]),
      }),
      Object.freeze({
        heading: 'At home and away from home',
        paragraphs: Object.freeze([
          'A shared jar suits a table where multiple people serve themselves. Individual sticks and portions suit contexts where each person receives their own serving.',
          'These are format observations, not performance guarantees. The best choice depends on the setting and on information that still needs confirmation, such as final packaging and product availability.',
        ]),
        bullets: Object.freeze([
          'Glass jars: 250 g, 500 g and 1 litre concept sizes.',
          'Honey sticks: 20 × 8 g = 160 g per container.',
          'Portion packs: 30 × 8 g = 240 g per box.',
        ]),
      }),
      Object.freeze({
        heading: 'Enquiry considerations',
        paragraphs: Object.freeze([
          'Before choosing a format for retail, hospitality or gifting, confirm final packaging, approved imagery, formulation details and business terms with HONIESH. Enquiries are accepted only after a real contact destination is connected.',
        ]),
      }),
    ]),
  }),
  buildArticle({
    id: 'what-are-honey-sticks',
    slug: 'what-are-honey-sticks',
    title: 'What Are Honey Sticks?',
    category: 'Packaging guide',
    summary: 'A clear explanation of the single-serve stick format and HONIESH’s confirmed container specifications.',
    visualId: 'sticks',
    readingTimeMinutes: 3,
    sources: Object.freeze([SOURCE_HONIESH_CATALOGUE]),
    relatedPackagingIds: Object.freeze(['honey-sticks']),
    relatedFlavourIds: Object.freeze(['original-honey', 'ginger-honey', 'lemon-honey']),
    relatedArticleSlugs: Object.freeze(['glass-jars-vs-single-serve-honey-packaging', 'understanding-individual-honey-portions']),
    body: Object.freeze([
      Object.freeze({
        heading: 'Format definition',
        paragraphs: Object.freeze([
          'A honey stick is an individual-format packaging concept. In the HONIESH catalogue, the honey-stick family is presented as a container holding individual sticks rather than as a single large jar.',
        ]),
      }),
      Object.freeze({
        heading: 'Confirmed specifications',
        paragraphs: Object.freeze([
          'Each HONIESH honey-stick container is specified as 20 sticks × 8 g, giving a total net content of 160 g. Five flavour concepts are shown for this format.',
          'Flavour formulations, final packaging photography and product availability remain pending confirmation.',
        ]),
        bullets: Object.freeze([
          '20 individual sticks per container.',
          '8 g per stick.',
          '160 g total net content.',
        ]),
      }),
      Object.freeze({
        heading: 'Where the format fits',
        paragraphs: Object.freeze([
          'The format is presented for contexts where an individual serving is useful, such as breakfast service, travel or sampling. These are proposed contexts rather than confirmed partnerships or customer results.',
        ]),
      }),
    ]),
  }),
  buildArticle({
    id: 'individual-honey-portions',
    slug: 'understanding-individual-honey-portions',
    title: 'Understanding Individual Honey Portions',
    category: 'Use-case guide',
    summary: 'How individual honey portions fit into away-from-home contexts, with no food-safety or regulatory claims.',
    visualId: 'portions',
    readingTimeMinutes: 4,
    sources: Object.freeze([SOURCE_HONIESH_CATALOGUE, SOURCE_USDA_FOODKEEPER]),
    relatedPackagingIds: Object.freeze(['honey-sticks', 'portion-packs']),
    relatedFlavourIds: Object.freeze([]),
    relatedArticleSlugs: Object.freeze(['what-are-honey-sticks', 'glass-jars-vs-single-serve-honey-packaging']),
    body: Object.freeze([
      Object.freeze({
        heading: 'What individual portions are',
        paragraphs: Object.freeze([
          'Individual portions are single-serving formats. HONIESH shows two such families: honey sticks and hygienic portion packs.',
          'The portion-pack family is specified as 30 × 8 g, for a total of 240 g per box. The split-open dispensing design remains a concept until final packaging is approved.',
        ]),
      }),
      Object.freeze({
        heading: 'Away-from-home contexts',
        paragraphs: Object.freeze([
          'Individual portions can be considered for breakfast counters, hospitality settings and travel. These are proposed use contexts, not confirmed clients, placements or results.',
          'No airline, regulatory or food-safety claim is made. Any such statement needs a verified reviewer and approved product information.',
        ]),
        bullets: Object.freeze([
          'Breakfast and food-service counters.',
          'Hospitality service contexts.',
          'Travel and convenience-focused settings.',
        ]),
      }),
      Object.freeze({
        heading: 'Checks before publication',
        paragraphs: Object.freeze([
          'Confirm packaging suitability, final artwork, handling instructions and any jurisdiction-specific requirements before making public claims about individual portions.',
        ]),
      }),
    ]),
  }),
  buildArticle({
    id: 'different-ways-to-use-honey-in-everyday-life',
    slug: 'different-ways-to-use-honey-in-everyday-life',
    title: 'Different Ways to Use Honey in Everyday Life',
    category: 'Culinary guide',
    summary: 'A broad, non-medical look at honey in daily routines, meals and thoughtful gifting concepts.',
    visualId: 'kitchen',
    readingTimeMinutes: 4,
    sources: Object.freeze([SOURCE_NHB_REFERENCE, SOURCE_NHB_COLOR]),
    relatedPackagingIds: Object.freeze(['glass-jars', 'honey-sticks', 'portion-packs']),
    relatedFlavourIds: Object.freeze(['original-honey', 'cinnamon-honey', 'cardamom-honey']),
    relatedArticleSlugs: Object.freeze(['honey-in-everyday-cooking', 'understanding-honey-texture-colour-and-aroma']),
    body: Object.freeze([
      Object.freeze({
        heading: 'Everyday food moments',
        paragraphs: Object.freeze([
          'Honey can be part of breakfast, baking, dressings and warm drinks. The National Honey Board’s reference material provides general culinary context for these uses.',
          'HONIESH flavour concepts are not presented as confirmed formulations. Any tasting note must be added only after product review.',
        ]),
      }),
      Object.freeze({
        heading: 'Shared and individual formats',
        paragraphs: Object.freeze([
          'A glass jar can sit on a shared table. Sticks and portion packs can be considered when an individual serving is more practical.',
          'The choice is about format and context, not about a superiority claim over another format.',
        ]),
        bullets: Object.freeze([
          'Jar: shared kitchen and table use.',
          'Sticks: individual serving concept.',
          'Portion packs: split-open dispensing concept.',
        ]),
      }),
      Object.freeze({
        heading: 'Gifting concepts',
        paragraphs: Object.freeze([
          'A gift-pack concept is a possible future editorial topic, but no confirmed HONIESH gift range is claimed here. Details require product and packaging approval.',
        ]),
      }),
    ]),
  }),
]);

export const JOURNAL_ARTICLE_BY_SLUG = Object.freeze(
  Object.fromEntries(JOURNAL_ARTICLES.map((article) => [article.slug, article])),
);

export const USE_CASES = Object.freeze([
  Object.freeze({
    id: 'household-use',
    slug: 'household-use',
    title: 'Household Use',
    description: 'Proposed contexts for HONIESH formats in a home setting, from shared jars to individual servings.',
    status: EDITORIAL_STATUS.proposed,
    isConfirmedPartnership: false,
    suggestedPackagingIds: Object.freeze(['glass-jars', 'honey-sticks', 'portion-packs']),
    contextNotes: Object.freeze(['Shared table', 'Breakfast preparation', 'Individual serving']),
    proofPoints: Object.freeze([]),
  }),
  Object.freeze({
    id: 'breakfast-and-food-service',
    slug: 'breakfast-and-food-service',
    title: 'Breakfast and Food Service',
    description: 'Proposed use contexts for breakfast counters and food-service settings.',
    status: EDITORIAL_STATUS.proposed,
    isConfirmedPartnership: false,
    suggestedPackagingIds: Object.freeze(['honey-sticks', 'portion-packs']),
    contextNotes: Object.freeze(['Counter service', 'Individual portions', 'Menu pairing concepts']),
    proofPoints: Object.freeze([]),
  }),
  Object.freeze({
    id: 'hotels-and-hospitality',
    slug: 'hotels-and-hospitality',
    title: 'Hotels and Hospitality',
    description: 'Proposed application for hospitality service contexts.',
    status: EDITORIAL_STATUS.proposed,
    isConfirmedPartnership: false,
    suggestedPackagingIds: Object.freeze(['honey-sticks', 'portion-packs']),
    contextNotes: Object.freeze(['Breakfast service', 'In-room concepts', 'Guest amenity concepts']),
    proofPoints: Object.freeze([]),
  }),
  Object.freeze({
    id: 'cafes-and-restaurants',
    slug: 'cafes-and-restaurants',
    title: 'Cafés and Restaurants',
    description: 'Proposed application for café and restaurant service contexts.',
    status: EDITORIAL_STATUS.proposed,
    isConfirmedPartnership: false,
    suggestedPackagingIds: Object.freeze(['glass-jars', 'honey-sticks', 'portion-packs']),
    contextNotes: Object.freeze(['Table service', 'Drink pairings', 'Recipe concepts']),
    proofPoints: Object.freeze([]),
  }),
  Object.freeze({
    id: 'corporate-and-personal-gifting',
    slug: 'corporate-and-personal-gifting',
    title: 'Corporate and Personal Gifting',
    description: 'Proposed gift-pack concept using HONIESH packaging families.',
    status: EDITORIAL_STATUS.proposed,
    isConfirmedPartnership: false,
    suggestedPackagingIds: Object.freeze(['glass-jars']),
    contextNotes: Object.freeze(['Gift-pack concept', 'Seasonal concept', 'Personal gifting concept']),
    proofPoints: Object.freeze([]),
  }),
  Object.freeze({
    id: 'travel-and-convenient-portioning',
    slug: 'travel-and-convenient-portioning',
    title: 'Travel and Convenient Portioning',
    description: 'Proposed use contexts where single-serve formats may be convenient.',
    status: EDITORIAL_STATUS.proposed,
    isConfirmedPartnership: false,
    suggestedPackagingIds: Object.freeze(['honey-sticks', 'portion-packs']),
    contextNotes: Object.freeze(['Away-from-home routines', 'Individual servings', 'Convenience-focused formats']),
    proofPoints: Object.freeze([]),
  }),
  Object.freeze({
    id: 'food-service-businesses',
    slug: 'food-service-businesses',
    title: 'Food-Service Businesses',
    description: 'Proposed application for business enquiries and format selection.',
    status: EDITORIAL_STATUS.proposed,
    isConfirmedPartnership: false,
    suggestedPackagingIds: Object.freeze(['honey-sticks', 'portion-packs', 'glass-jars']),
    contextNotes: Object.freeze(['Format selection', 'Service context review', 'Business enquiry']),
    proofPoints: Object.freeze([]),
  }),
]);

export const CASE_STUDIES = Object.freeze([
  Object.freeze({
    id: 'breakfast-counter-single-serve',
    slug: 'breakfast-counter-single-serve',
    title: 'Single-Serve Honey at Breakfast Counters',
    summary: 'An illustrative framework for discussing how individual formats might be evaluated in a breakfast setting.',
    status: EDITORIAL_STATUS.illustrativePlaceholder,
    disclosure: 'Illustrative use case; not a customer case study.',
    client: null,
    results: Object.freeze([]),
    quotes: Object.freeze([]),
    statistics: Object.freeze([]),
    relatedPackagingIds: Object.freeze(['honey-sticks', 'portion-packs']),
    framework: Object.freeze(['Service context', 'Format choice', 'Handling notes', 'Information still required']),
  }),
  Object.freeze({
    id: 'hospitality-portioning',
    slug: 'hospitality-portioning',
    title: 'Portion-Controlled Honey for Hospitality',
    summary: 'An illustrative framework for hospitality conversations without claiming a customer placement.',
    status: EDITORIAL_STATUS.illustrativePlaceholder,
    disclosure: 'Illustrative use case; not a customer case study.',
    client: null,
    results: Object.freeze([]),
    quotes: Object.freeze([]),
    statistics: Object.freeze([]),
    relatedPackagingIds: Object.freeze(['portion-packs']),
    framework: Object.freeze(['Guest context', 'Portion format', 'Service workflow', 'Approval requirements']),
  }),
  Object.freeze({
    id: 'travel-honey-sticks',
    slug: 'travel-honey-sticks',
    title: 'Honey Sticks for Travel and Convenience',
    summary: 'An illustrative framework for away-from-home format discussions.',
    status: EDITORIAL_STATUS.illustrativePlaceholder,
    disclosure: 'Illustrative use case; not a customer case study.',
    client: null,
    results: Object.freeze([]),
    quotes: Object.freeze([]),
    statistics: Object.freeze([]),
    relatedPackagingIds: Object.freeze(['honey-sticks']),
    framework: Object.freeze(['Context', 'Individual format', 'Handling considerations', 'Claims to verify']),
  }),
  Object.freeze({
    id: 'honey-gift-pack-concepts',
    slug: 'honey-gift-pack-concepts',
    title: 'Honey Gift-Pack Concepts',
    summary: 'An illustrative concept framework; no confirmed gift range is claimed.',
    status: EDITORIAL_STATUS.illustrativePlaceholder,
    disclosure: 'Illustrative concept; not a confirmed product range or customer case study.',
    client: null,
    results: Object.freeze([]),
    quotes: Object.freeze([]),
    statistics: Object.freeze([]),
    relatedPackagingIds: Object.freeze(['glass-jars']),
    framework: Object.freeze(['Occasion', 'Packaging concept', 'Flavour concept', 'Approval requirements']),
  }),
  Object.freeze({
    id: 'packaging-selection-guide',
    slug: 'packaging-selection-guide',
    title: 'Packaging Selection for Different Business Needs',
    summary: 'An illustrative framework for choosing between confirmed HONIESH packaging families.',
    status: EDITORIAL_STATUS.illustrativePlaceholder,
    disclosure: 'Illustrative framework; no client results are implied.',
    client: null,
    results: Object.freeze([]),
    quotes: Object.freeze([]),
    statistics: Object.freeze([]),
    relatedPackagingIds: Object.freeze(['glass-jars', 'honey-sticks', 'portion-packs']),
    framework: Object.freeze(['Audience', 'Format', 'Quantity', 'Information still required']),
  }),
]);

export const EDITORIAL_SUMMARY = Object.freeze({
  articleCount: JOURNAL_ARTICLES.length,
  useCaseCount: USE_CASES.length,
  caseStudyCount: CASE_STUDIES.length,
  publicationRule: 'Articles are editorial drafts until authorship, publication dates, final fact-check approval and product-specific claims are supplied.',
});

export function getRelatedArticles(article, limit = 3) {
  if (!article) return [];

  const related = article.relatedArticleSlugs
    .map((slug) => JOURNAL_ARTICLE_BY_SLUG[slug])
    .filter(Boolean)
    .slice(0, limit);

  if (related.length >= limit) return related;

  return [
    ...related,
    ...JOURNAL_ARTICLES.filter((candidate) => candidate.slug !== article.slug
      && !related.some((item) => item.slug === candidate.slug)).slice(0, limit - related.length),
  ];
}

export function getRelatedProductsForArticle(article, limit = 3) {
  if (!article) return [];

  const matches = [];
  const seen = new Set();

  const add = (product) => {
    if (!product || seen.has(product.id)) return;
    seen.add(product.id);
    matches.push(product);
  };

  article.relatedPackagingIds.forEach((packagingId) => {
    add(PRODUCT_CONFIGURATIONS.find((product) => product.packagingId === packagingId
      && article.relatedFlavourIds.includes(product.flavourId)));
    add(PRODUCT_CONFIGURATIONS.find((product) => product.packagingId === packagingId));
  });

  article.relatedFlavourIds.forEach((flavourId) => {
    add(PRODUCT_CONFIGURATIONS.find((product) => product.flavourId === flavourId));
  });

  return matches.slice(0, limit);
}
