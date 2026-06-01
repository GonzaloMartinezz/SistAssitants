import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ArrowUp } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'workflow', label: 'Método' },
  { id: 'plans', label: 'Planes' },
  { id: 'calculator', label: 'Calculadora' },
  { id: 'recipes', label: 'Recetas' },
  { id: 'testimonials', label: 'Alumnos' },
  { id: 'calendar', label: 'Agenda' },
  { id: 'admin', label: 'Panel' }
];

export default function SectionNav() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
