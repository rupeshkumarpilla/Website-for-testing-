import { useMemo, useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import ArticleCard from '../components/editorial/ArticleCard.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import { JOURNAL_ARTICLES, EDITORIAL_SUMMARY } from '../data/editorial.js';
import { CONTENT_GAPS } from '../config/informationArchitecture.js';
import { ROUTES, hrefFor } from '../config/routes.js';

const EDITORIAL_GAP = CONTENT_GAPS.find((gap) => gap.id === 'editorial-authorship');

export default function JournalPage() {
  const [topic, setTopic] = useState('all');
  const topics = useMemo(() => ['all', ...new Set(JOURNAL_ARTICLES.map((article) => article.category))], []);
  const featured = JOURNAL_ARTICLES[0];
  const filteredArticles = topic === 'all'
    ? JOURNAL_ARTICLES
    : JOURNAL_ARTICLES.filter((article) => article.category === topic);

  return (
    <>
      <PageHeader
        eyebrow="Honey Journal"
        title="Honey education, without the overclaiming."
        description="A growing set of short articles about honey characteristics, storage questions, packaging formats and everyday use. General references are linked; HONIESH-specific claims remain pending review."
        visual={<EditorialVisual visualId="honeycomb" label="Honey Journal cover" large />}
      />

      <Section
        id="featured"
        eyebrow="Featured article"
        title={featured.title}
        description={featured.summary}
        variant="split"
      >
        <ArticleCard article={featured} featured />
      </Section>

      <Section
        id="topics"
        eyebrow="Article index"
        title={`${EDITORIAL_SUMMARY.articleCount} journal articles`}
        description="Filter by topic. Every article is marked as an editorial draft until authorship, dating and final fact-check approval are supplied."
      >
        <nav className="topic-nav" aria-label="Journal topics">
          {topics.map((item) => (
            <button
              key={item}
              type="button"
              className={`topic-chip${topic === item ? ' is-active' : ''}`}
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
            >
              {item === 'all' ? 'All topics' : item}
            </button>
          ))}
        </nav>
        <div className="editorial-card-grid editorial-card-grid--journal" aria-live="polite">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Editorial standard" title="What each article includes" tinted>
        <div className="editorial-standard">
          <div>
            <h3>Clear sourcing</h3>
            <p>Each article links to the general references used for its educational statements.</p>
          </div>
          <div>
            <h3>Visible draft status</h3>
            <p>Author, date and final fact-check approval are shown as pending rather than invented.</p>
          </div>
          <div>
            <h3>Relevant product links</h3>
            <p>Articles connect to confirmed HONIESH formats and flavour concepts where relevant.</p>
          </div>
        </div>
        <EditorialDisclosure title="Required before publication">
          <ul>{(EDITORIAL_GAP?.items ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
        </EditorialDisclosure>
      </Section>

      <Section title="Explore the collection">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">From reading to choosing</p>
            <h3 className="cta-panel__title">View the HONIESH formats</h3>
            <p className="cta-panel__description">
              Packaging specifications are confirmed; final imagery and formulation details remain pending.
            </p>
          </div>
          <Button href={hrefFor(ROUTES.products)}>Open Our Honey</Button>
        </div>
      </Section>
    </>
  );
}
