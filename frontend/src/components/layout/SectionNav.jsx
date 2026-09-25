import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ArrowUp } from 'lucide-react';
import useScrollToSection from '../../hooks/useScrollToSection';

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'workflow', label: 'Método' },
  { id: 'plans', label: 'Planes' },
  { id: 'recipes', label: 'Comidas' },
  { id: 'news', label: 'Noticias' },
  { id: 'posts', label: 'Posteos' },
  { id: 'social', label: 'Redes' },
  { id: 'testimonials', label: 'Alumnos' },
  { id: 'calculator', label: 'Calculadora' },
  { id: 'contact', label: 'Contacto' }
];

export default function SectionNav() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past 300px
      setShowNav(window.scrollY > 300);

      // Detect which section is currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => scrollToSection('hero', { offset: 0 });

  const goPrev = () => {
    if (currentIndex > 0) {
      scrollToSection(SECTIONS[currentIndex - 1].id);
    }
  };

  const goNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      scrollToSection(SECTIONS[currentIndex + 1].id);
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < SECTIONS.length - 1;

  return (
    <div
      className="section-nav-float"
      style={{
        opacity: showNav ? 1 : 0,
        pointerEvents: showNav ? 'auto' : 'none',
        transform: showNav ? 'translateX(0)' : 'translateX(20px)'
      }}
    >
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="section-nav-btn section-nav-top"
        title="Subir al inicio"
      >
        <ArrowUp size={16} />
      </button>

      {/* Current section indicator */}
      <div className="section-nav-indicator">
        <span className="section-nav-step font-tech">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="section-nav-label font-tech">
          {SECTIONS[currentIndex]?.label}
        </span>
      </div>

      {/* Previous Section */}
      <button
        onClick={goPrev}
        disabled={!hasPrev}
        className="section-nav-btn"
        title={hasPrev ? `← ${SECTIONS[currentIndex - 1]?.label}` : 'Ya estás al inicio'}
      >
        <ChevronUp size={16} />
      </button>

      {/* Next Section */}
      <button
        onClick={goNext}
        disabled={!hasNext}
        className="section-nav-btn"
        title={hasNext ? `→ ${SECTIONS[currentIndex + 1]?.label}` : 'Última sección'}
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
}
