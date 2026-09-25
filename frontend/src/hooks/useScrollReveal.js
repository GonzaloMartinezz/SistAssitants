import { useEffect } from 'react';

/**
 * Global "reveal on scroll" system. Any element rendered anywhere in the
 * public page can opt in with `data-reveal` (optionally `data-reveal="left"`
 * / `"right"` / `"scale"` for a different entrance) and, once it crosses
 * into the viewport, gets the `.is-revealed` class added — which is what
 * actually animates it in (see the [data-reveal] rules in index.css).
 *
 * One IntersectionObserver is shared for the whole page. A MutationObserver
 * keeps it aware of elements that mount later (fetched recipes, the admin
 * panel, route changes) instead of only scanning once on first paint.
 */
export default function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip the animation machinery entirely — just mark everything visible.
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
        observer.observe(el);
      });
    };

    scan();

    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}
