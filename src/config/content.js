export const BRAND_IDENTITY = Object.freeze({
  brand: 'HONIESH',
  tagline: 'Honey, thoughtfully brought to everyday life.',
  brandEssence: 'Honey for every kind of moment.',
  positioning: 'A contemporary premium honey brand combining flavour exploration, thoughtful packaging and useful everyday product formats.',
  mission: 'To make honey a more accessible and enjoyable part of everyday life through thoughtfully presented products, convenient packaging and useful knowledge.',
  vision: 'To grow HONIESH into a recognizable contemporary honey brand known for distinctive presentation, versatile product formats and clear, trustworthy communication.',
  values: Object.freeze([
    'Thoughtful design.',
    'Everyday usefulness.',
    'Honest communication.',
    'Curiosity and learning.',
    'Consistency.',
    'Considered presentation.',
  ]),
  personality: Object.freeze([
    'Sophisticated.',
    'Warm.',
    'Modern.',
    'Knowledgeable.',
    'Clear.',
    'Approachable.',
  ]),
});

export const COMPANY_CONTENT = {
  overview: `${BRAND_IDENTITY.tagline} HONIESH is ${BRAND_IDENTITY.positioning.charAt(0).toLowerCase()}${BRAND_IDENTITY.positioning.slice(1)}`,
  about: `${BRAND_IDENTITY.brandEssence} ${BRAND_IDENTITY.mission}`,
  capabilities: 'Product discovery across glass jars, honey sticks and hygienic portion packs, supported by packaging education, the Honey Journal, everyday applications, hospitality and food-service use cases, and a framework for genuine customer case studies.',
  contact: {
    email: null,
    phone: null,
    address: null,
  },
};
