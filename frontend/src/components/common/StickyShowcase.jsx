import React, { useEffect, useRef, useState } from 'react';

/**
 * StickyShowcase
 * ------------------------------------------------------------------
 * Vertical "scrollytelling" pattern (seen on nuperformancecoaching.com's
 * service list): a text panel stays pinned in the viewport while the
 * visitor scrolls past a tall column of visuals; whichever visual is
 * currently centered in the viewport drives which text block is shown,
 * cross-fading between them.
 *
 * Unlike HorizontalScrollSection (which drives a transform every frame
 * to translate a track), this only needs to know *which* item is active,
 * so a single IntersectionObserver watching a thin band at the vertical
 * center of the viewport is enough — no rAF loop required.
 *
 * On small screens the sticky column is disabled (stacks normally) since
 * there's no room for a side-by-side pinned layout.
 */
export default function StickyShowcase({ items, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 900px)').matches : true
  );
  const blockRefs = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.showcaseIndex);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      // A thin horizontal band right at the vertical center of the
      // viewport — whichever visual block crosses it becomes active.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isDesktop, items.length]);

  return (
    <div className={`sticky-showcase ${className}`}>
      <div className="sticky-showcase-grid">
        <div className="sticky-showcase-sticky-col">
          <div className="sticky-showcase-sticky-inner">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`sticky-showcase-textblock${i === activeIndex ? ' is-active' : ''}`}
                  style={{ '--block-color': item.color }}
                >
                  <div className="sticky-showcase-icon">
                    <Icon size={22} />
                  </div>
                  <span className="font-tech sticky-showcase-tag">{item.tag}</span>
                  <h3 className="font-display sticky-showcase-title">{item.title}</h3>
                  <p className="sticky-showcase-desc">{item.desc}</p>
                </div>
              );
            })}
            <div className="sticky-showcase-progress">
              {items.map((item, i) => (
                <span
                  key={item.title}
                  className={`sticky-showcase-dot${i === activeIndex ? ' is-active' : ''}`}
                  style={{ '--block-color': item.color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sticky-showcase-track-col">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => { blockRefs.current[i] = el; }}
                data-showcase-index={i}
                className={`sticky-showcase-visual${i === activeIndex ? ' is-active' : ''}`}
                style={{ '--block-color': item.color }}
              >
                <Icon size={54} strokeWidth={1.5} />
                <span className="font-tech sticky-showcase-visual-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
