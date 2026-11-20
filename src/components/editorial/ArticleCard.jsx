import { ROUTES, hrefFor } from '../../config/routes.js';
import EditorialVisual from './EditorialVisual.jsx';

export default function ArticleCard({ article, featured = false }) {
  const path = `${ROUTES.journal}/${article.slug}`;

  return (
    <article className={`article-card${featured ? ' article-card--featured' : ''}`}>
      <div className="article-card__visual">
        <EditorialVisual visualId={article.visualId} label={article.title} large={featured} />
      </div>
      <div className="article-card__body">
        <p className="article-card__meta">
          <span>{article.category}</span>
          <span>{article.readingTimeMinutes} min read</span>
        </p>
        <h3 className="article-card__title">
          <a href={hrefFor(path)}>{article.title}</a>
        </h3>
        <p className="article-card__summary">{article.summary}</p>
        <a className="article-card__link" href={hrefFor(path)}>
          Read article <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
