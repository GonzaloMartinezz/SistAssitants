import { useLenis } from 'lenis/react';

/**
 * Returns a function that smoothly scrolls (via Lenis) to a section id.
 * Falls back to native scrollIntoView if Lenis hasn't mounted yet.
 */
export default function useScrollToSection() {
  const lenis = useLenis();

  return (id, options = {}) => {
    const target = typeof id === 'string' ? document.getElementById(id) : id;
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -16,
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
