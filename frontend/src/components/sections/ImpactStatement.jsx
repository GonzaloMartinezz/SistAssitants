import React, { useEffect, useRef } from 'react';

/**
 * ImpactStatement
 * ------------------------------------------------------------------
 * A single-screen "impact" moment: a giant headline with a photo visible
 * through the letters (background-clip: text + a heavy outline stroke to
 * keep the neobrutalist border language), inside a dark diagonal-edged
 * band — the visual language borrowed from nuperformancecoaching.com's
 * masked "NU" title section, kept compatible with the rest of the site's
 * pastel/thick-border system.
 */
const IMPACT_PHOTO_URL =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1400';

export default function ImpactStatement() {
  const imgLayerRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        // Ambient blurred glow layer behind the text — drifts slower than
        // the page for depth.
        const glow = imgLayerRef.current;
        if (glow) {
          const rect = glow.getBoundingClientRect();
          const offset = (rect.top - window.innerHeight / 2) * 0.08;
          glow.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
        }
        // The photo clipped inside the giant letters drifts too, at its
        // own slower rate, via background-position rather than transform
        // (a transform would drag the glyph shapes themselves).
        const word = wordRef.current;
        if (word) {
          const rect = word.getBoundingClientRect();
          const shift = (rect.top - window.innerHeight / 2) * 0.05;
          word.style.backgroundPosition = `center calc(50% + ${shift}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="impact-statement" aria-label="Guadalupe Martínez — Nutrición Deportiva">
      <div className="impact-diagonal-edge impact-diagonal-edge-top" aria-hidden="true" />

      <div className="impact-statement-inner">
        <div className="impact-text-mask" data-reveal="scale">
          <div
            ref={imgLayerRef}
            className="impact-text-mask-photo"
            style={{ backgroundImage: `url('${IMPACT_PHOTO_URL}')` }}
          />
          <h2
            ref={wordRef}
            className="impact-text-mask-word font-display"
            aria-hidden="true"
            style={{ backgroundImage: `url('${IMPACT_PHOTO_URL}')` }}
          >
            GUADA
          </h2>
          <span className="sr-only">Guadalupe Martínez</span>
        </div>

        <p className="impact-statement-tagline font-tech" data-reveal>
          No te conformes con un estándar menor al de élite — la misma ciencia que usan los
          profesionales, adaptada a vos.
        </p>
      </div>

      <div className="impact-diagonal-edge impact-diagonal-edge-bottom" aria-hidden="true" />
    </section>
  );
}
