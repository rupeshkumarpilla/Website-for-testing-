import { useEffect } from 'react';
import { seoForRoute } from '../config/seo.js';

function setMeta(key, attribute, name, content) {
  let element = document.head.querySelector(`[data-seo="${key}"]`);
  if (!content) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('data-seo', key);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, name);
  element.setAttribute('content', content);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[data-seo="canonical"]');
  if (!url) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    element.setAttribute('data-seo', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

export function useDocumentMetadata(route) {
  useEffect(() => {
    const seo = seoForRoute(route);
    if (!seo) return;
    setMeta('description', 'name', 'description', seo.description);
    setMeta('robots', 'name', 'robots', seo.robots);
    setCanonical(seo.canonical);
    setMeta('og-title', 'property', 'og:title', seo.ogTitle);
    setMeta('og-type', 'property', 'og:type', seo.ogType);
    setMeta('og-url', 'property', 'og:url', seo.ogUrl);
    setMeta('og-site-name', 'property', 'og:site_name', seo.ogSiteName);
    setMeta('og-description', 'property', 'og:description', seo.ogDescription);
    setMeta('twitter-card', 'name', 'twitter:card', seo.twitterCard);
    setMeta('twitter-title', 'name', 'twitter:title', seo.twitterTitle);
    setMeta('twitter-description', 'name', 'twitter:description', seo.twitterDescription);
    setMeta('twitter-url', 'name', 'twitter:url', seo.twitterUrl);
  }, [route]);
}
