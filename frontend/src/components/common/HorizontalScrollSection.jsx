import React, { useEffect, useRef, useState } from 'react';

/**
 * HorizontalScrollSection
 * ------------------------------------------------------------------
 * Framer-style "pinned" horizontal gallery: as the user scrolls the page
 * vertically (smoothed by Lenis), the section stays pinned to the
 * viewport while its inner track of cards glides horizontally until it
 * fully reveals, then normal vertical scroll resumes.
 *
 * Because Lenis smooths the *real* scroll position (window.scrollY),
 * simply reading getBoundingClientRect() inside a requestAnimationFrame
 * loop is enough to stay perfectly in sync with Lenis's easing — no
 * extra plugin required.
 *
 * On small screens the pin is disabled in favor of a native, swipeable
 * horizontal scroller (better touch ergonomics, avoids scroll-jacking
 * on mobile).
 */
export default function HorizontalScrollSection({
  header,
  children,
  className = '',
  trackClassName = '',
  progressClassName = '',
  scrollMultiplier = 1,
  showProgress = true,
}) {
  const wrapperRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 900px)').matches : true
  );
  const [wrapperHeight, setWrapperHeight] = useState('auto');

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return undefined;

    const recalcHeight = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      setWrapperHeight(`${window.innerHeight + maxTranslate * scrollMultiplier}px`);
    };

    recalcHeight();
    window.addEventListener('resize', recalcHeight);

    let rafId;
    const onFrame = () => {
      const wrapper = wrapperRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (wrapper && viewport && track) {
        const rect = wrapper.getBoundingClientRect();
        const scrollDistance = wrapper.offsetHeight - window.innerHeight;
        const progress = scrollDistance > 0
          ? Math.min(Math.max(-rect.top / scrollDistance, 0), 1)
          : 0;
        const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);
        track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress * 100}%`;
        }
      }
      rafId = requestAnimationFrame(onFrame);
    };
    rafId = requestAnimationFrame(onFrame);

    return () => {
      window.removeEventListener('resize', recalcHeight);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop, scrollMultiplier]);

  if (!isDesktop) {
    return (
      <div className={`h-scroll-mobile ${className}`}>
        {header}
        <div className={`h-scroll-mobile-track ${trackClassName}`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={`h-scroll-wrapper ${className}`} style={{ height: wrapperHeight }}>
      <div className="h-scroll-sticky">
        {header && <div className="h-scroll-header">{header}</div>}
        <div ref={viewportRef} className="h-scroll-viewport">
          <div ref={trackRef} className={`h-scroll-track ${trackClassName}`}>
            {children}
            <div className="h-scroll-spacer" aria-hidden="true" />
          </div>
          {showProgress && (
            <div className={`h-scroll-progress-track ${progressClassName}`}>
              <div ref={progressRef} className="h-scroll-progress-fill" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
