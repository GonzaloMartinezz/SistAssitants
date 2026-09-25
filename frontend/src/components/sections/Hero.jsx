import React, { useEffect, useRef } from 'react';
import { Sparkles, Users, TrendingUp, Award, Dumbbell } from 'lucide-react';
import useScrollToSection from '../../hooks/useScrollToSection';

export default function Hero() {
  const scrollToSection = useScrollToSection();
  const photoRef = useRef(null);
  const quickStats = [
    { icon: Users, value: '75+', label: 'Red de Amigos', color: 'var(--pastel-pink)' },
    { icon: TrendingUp, value: '100%', label: 'Cuidado de Salud', color: 'var(--pastel-blue)' },
    { icon: Award, value: 'UBA', label: 'Estudiante Lic.', color: 'var(--pastel-green)' },
    { icon: Dumbbell, value: '20 Años', label: 'Energía & Pasión', color: 'var(--pastel-yellow)' }
  ];

  // Subtle parallax on the hero photo — it drifts slightly slower than the
  // page as you scroll past it, the same depth cue used throughout
  // nuperformancecoaching.com's hero.
  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const el = photoRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = rect.top * -0.06;
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
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
    <section id="hero" className="section-container" style={{ width: '100%', maxWidth: '1200px', padding: '2rem 1.5rem', margin: '0 auto', boxSizing: 'border-box' }}>
      <div className="hero-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Top Header Banner */}
        <div className="hero-banner" style={{ borderBottom: '3px solid var(--color-dark)', paddingBottom: '1.5rem' }}>
          <div className="hero-badge-float" data-reveal style={{ position: 'relative', display: 'inline-flex', top: '0', left: '0', transform: 'rotate(-1deg)', marginBottom: '1rem', zIndex: 10 }}>
            <Sparkles size={12} className="animate-spin" /> ESTUDIANTE DE LA LIC. EN NUTRICIÓN (UBA)
          </div>

          <h1 className="hero-title font-display" data-reveal style={{ '--reveal-delay': '80ms', fontSize: '3.5rem', lineHeight: '1.1', textTransform: 'uppercase', color: 'var(--color-dark)' }}>
            Guadalupe Martínez
          </h1>
          <p className="font-tech" data-reveal style={{ '--reveal-delay': '160ms', fontSize: '1rem', fontWeight: 'bold', color: 'var(--kraft-brown)', marginTop: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Ciencia Aplicada a la Salud, Planificación de Cargas & Comunidad Deportiva
          </p>
        </div>

        {/* Two-Column layout: photo with parallax on the left, story on the right */}
        <div className="hero-cols-grid">

          {/* Left Column: circular photo with parallax drift + decorative badges */}
          <div className="hero-col-photo" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="hero-image-block" data-reveal="left" style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', overflow: 'visible' }}>
              <div className="hero-badge-1" style={{ fontSize: '0.65rem', padding: '0.35rem 0.7rem' }}>
                🤝 COMUNIDAD DE APOYO
              </div>
              <div className="hero-badge-2" style={{ fontSize: '0.65rem', padding: '0.35rem 0.7rem' }}>
                🎓 EDUCACIÓN CIENTÍFICA
              </div>
              <div className="circle-frame" style={{ width: 'min(100%, 18rem)', height: 'auto', aspectRatio: '1/1', display: 'block' }}>
                <img
                  ref={photoRef}
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="Guadalupe Martinez - Estudiante de Nutrición"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
                  }}
                  style={{ width: '100%', height: '110%', objectFit: 'cover', willChange: 'transform' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Historia / Vision Card */}
          <div className="hero-col-story" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="hero-card" data-reveal="right" style={{ backgroundColor: 'var(--pastel-pink)', padding: '2rem', borderRadius: '1.5rem', border: '3px solid var(--color-dark)', boxShadow: '5px 5px 0px var(--color-dark)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: '900', lineHeight: '1.2' }}>Mi Historia & Propósito</h2>

              <p style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.5', margin: '0' }}>
                ¡Hola! Soy Guada Martínez, tengo 20 años y estoy cursando la Licenciatura en Nutrición.
              </p>

              <p style={{ fontSize: '0.85rem', fontWeight: '600', lineHeight: '1.6', color: 'var(--color-muted)', margin: '0' }}>
                Mi visión es ir mucho más allá del típico consultorio rígido. Busco construir una red de amigos y deportistas basada en la confianza absoluta, explicándoles el porqué de cada carga de forma detallada.
              </p>

              <p style={{ fontSize: '0.85rem', fontWeight: '600', lineHeight: '1.6', color: 'var(--color-muted)', margin: '0' }}>
                Entiendo la salud como un proceso de apoyo mutuo y educación constante. Aquí trabajaremos juntos para que logres tus metas físicas y de salud de forma guiada, paso a paso, aprendiendo a nutrirte sin restricciones irracionales.
              </p>

              <div className="hero-card-divider" style={{ height: '2px', backgroundColor: 'var(--color-dark)', opacity: '0.15', margin: '0.5rem 0' }}></div>

              <div className="hero-buttons-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-neo btn-neo-sm btn-accent"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.9rem' }}
                >
                  Agendar Consulta 📅
                </button>
                <button
                  onClick={() => { window.location.hash = '#/plan-elite'; }}
                  className="btn-neo btn-neo-sm"
                  style={{ backgroundColor: 'var(--pastel-peach)', fontSize: '0.75rem', padding: '0.45rem 0.9rem' }}
                >
                  Ver Mi Plan Élite ⚡
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Stats Row */}
        <div className="hero-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {quickStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="hero-stat-chip"
                data-reveal
                style={{ '--reveal-delay': `${i * 70}ms`, backgroundColor: stat.color, border: '3px solid var(--color-dark)', borderRadius: '1rem', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '3px 3px 0px var(--color-dark)' }}
              >
                <div className="hero-stat-icon" style={{ padding: '0.35rem', border: '2px solid var(--color-dark)', borderRadius: '0.5rem', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={14} />
                </div>
                <div className="hero-stat-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span className="hero-stat-value font-tech" style={{ fontSize: '1.1rem', fontWeight: '900', lineHeight: '1' }}>{stat.value}</span>
                  <span className="hero-stat-label font-tech" style={{ fontSize: '0.6rem', fontWeight: '700', color: 'var(--color-muted)' }}>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialties Badges Row */}
        <div className="hero-specialties-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          <span className="badge-neo" style={{ backgroundColor: 'var(--pastel-pink)', fontSize: '0.75rem', padding: '0.4rem 0.8rem', rotate: '-1.5deg' }}>🏋️ Fuerza & Hipertrofia</span>
          <span className="badge-neo" style={{ backgroundColor: 'var(--pastel-blue)', fontSize: '0.75rem', padding: '0.4rem 0.8rem', rotate: '1deg' }}>🥗 Nutrición Educativa & Práctica</span>
          <span className="badge-neo" style={{ backgroundColor: 'var(--pastel-green)', fontSize: '0.75rem', padding: '0.4rem 0.8rem', rotate: '-0.5deg' }}>🏃 Rendimiento Deportivo</span>
          <span className="badge-neo" style={{ backgroundColor: 'var(--pastel-yellow)', fontSize: '0.75rem', padding: '0.4rem 0.8rem', rotate: '1.5deg' }}>🤝 Red de Apoyo Mutuo</span>
          <span className="badge-neo" style={{ backgroundColor: 'var(--pastel-peach)', fontSize: '0.75rem', padding: '0.4rem 0.8rem', rotate: '-2deg' }}>🧬 Bioquímica de la Nutrición</span>
        </div>

      </div>
    </section>
  );
}
