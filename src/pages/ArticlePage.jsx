import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import ArticleCard from '../components/editorial/ArticleCard.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import {
  JOURNAL_ARTICLE_BY_SLUG,
  getRelatedArticles,
  getRelatedProductsForArticle,
} from '../data/editorial.js';
import { ROUTES, hrefFor, legacyHref } from '../config/routes.js';

export default function ArticlePage({ articleSlug }) {
  const article = JOURNAL_ARTICLE_BY_SLUG[articleSlug];
  if (!article) return <NotFoundPage />;

  const relatedArticles = getRelatedArticles(article, 3);
  const relatedProducts = getRelatedProductsForArticle(article, 2);

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb__list">
          <li><a href={hrefFor(ROUTES.home)}>Home</a></li>
          <li><a href={hrefFor(ROUTES.journal)}>Honey Journal</a></li>
          <li aria-current="page">{article.title}</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow={`${article.category} · ${article.readingTimeMinutes} min read`}
        title={article.title}
        description={article.summary}
      />

      <Section id="article-cover" eyebrow="Article cover" title="Illustrated for clarity">
        <EditorialVisual visualId={article.visualId} label={article.title} large />
      </Section>

      <Section id="article-body" eyebrow="Editorial draft" title="The article">
        <EditorialDisclosure title="Publication status">
          <p>{article.publicationNote}</p>
          <p>Author: not supplied. Publication date: not supplied. Final fact-check approval: pending.</p>
        </EditorialDisclosure>

        <article className="article-prose">
          {article.body.map((section) => (
            <section key={section.heading} className="article-prose__section">
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets.length > 0 && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </Section>

      <Section eyebrow="Sources" title="Reference links" tinted>
        <ul className="source-list">
          {article.sources.map((source) => {
            const sourceHref = legacyHref(source.url);
            const opensExternal = /^https?:\/\//.test(sourceHref);
            return (
              <li key={source.url}>
                <a
                  href={sourceHref}
                  {...(opensExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {source.label}
                  {opensExternal && <span aria-hidden="true"> ↗</span>}
                </a>
              </li>
            );
          })}
        </ul>
        <EditorialDisclosure title="Claim boundary">
          <p>
            This article uses general references. It does not state HONIESH formulation, nutrition, medical,
            origin or certification information unless that information is separately supplied and approved.
          </p>
        </EditorialDisclosure>
      </Section>

      {relatedProducts.length > 0 && (
        <Section
          eyebrow="Related products"
          title="Confirmed HONIESH formats"
          description="These product links reflect confirmed packaging specifications; imagery and formulation remain concept-stage."
        >
          <div className="product-grid product-grid--related">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="Keep reading" title="Related articles" tinted>
        <div className="editorial-card-grid editorial-card-grid--journal">
          {relatedArticles.map((related) => (
            <ArticleCard key={related.slug} article={related} />
          ))}
        </div>
      </Section>

      <Section title="Continue exploring">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Next step</p>
            <h3 className="cta-panel__title">Browse the journal or the collection</h3>
            <p className="cta-panel__description">
              Read more context or move directly to the product configurations.
            </p>
          </div>
          <div className="cta-panel__actions">
            <Button href={hrefFor(ROUTES.journal)} variant="secondary">All articles</Button>
            <Button href={hrefFor(ROUTES.products)}>Our Honey</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
