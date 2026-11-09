import { useEffect } from 'react';

const BASE = 'https://ngazihub.org';

function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// Sets the title, description, canonical, social tags and JSON-LD for each page.
// Client-side only: see the README notes about pre-rendering for best SEO.
export default function Seo({ title, description, path = '/', jsonLd }) {
  useEffect(() => {
    document.title = title;
    upsert('meta[name="description"]', 'meta', { name: 'description', content: description });
    upsert('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
    upsert('meta[property="og:description"]', 'meta', { property: 'og:description', content: description });
    upsert('meta[property="og:url"]', 'meta', { property: 'og:url', content: BASE + path });
    upsert('link[rel="canonical"]', 'link', { rel: 'canonical', href: BASE + path });

    let script = document.getElementById('page-jsonld');
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'page-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);

      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, jsonLd]);
  return null;
}

export const faqJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});