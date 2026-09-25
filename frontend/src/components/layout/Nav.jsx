import React, { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import {
  Home,
  Award,
  TrendingUp,
  Calculator,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  Share2,
  Mail,
  LayoutDashboard,
  Users,
  Menu,
  X,
  Sparkles,
  Users as UsersStat,
  TrendingUp as TrendingUpStat,
  Dumbbell
} from 'lucide-react';
import useScrollToSection from '../../hooks/useScrollToSection';

// Unified navigation model — the single source of truth for every link shown
// anywhere in the nav (top bar context + the fullscreen overlay), on every
// route. Previously this list was duplicated across GlobalNavBar (App.jsx)
// and Sidebar.jsx, which is how the two components drifted out of sync and
// ended up stacked as two separate headers on mobile.
const PAGE_SECTIONS = [
  { id: 'hero', label: 'Inicio', icon: Home, color: 'var(--pastel-pink)' },
  { id: 'workflow', label: 'Método', icon: Award, color: 'var(--pastel-blue)' },
  { id: 'plans', label: 'Planes', icon: TrendingUp, color: 'var(--pastel-green)' },
  { id: 'recipes', label: 'Comidas', icon: BookOpen, color: 'var(--pastel-peach)' },
  { id: 'news', label: 'Noticias', icon: Newspaper, color: 'var(--pastel-yellow)' },
  { id: 'posts', label: 'Posteos', icon: ImageIcon, color: 'var(--pastel-pink)' },
  { id: 'social', label: 'Redes', icon: Share2, color: 'var(--pastel-blue)' },
  { id: 'testimonials', label: 'Alumnos', icon: Users, color: 'var(--pastel-green)' },
  { id: 'calculator', label: 'Calculadora', icon: Calculator, color: 'var(--pastel-yellow)' },
  { id: 'contact', label: 'Contacto', icon: Mail, color: 'var(--pastel-peach)' }
];

const HASH_ROUTES = [
  { id: 'plan-elite', hash: '#/plan-elite', label: 'Mi Plan Élite', icon: Award, color: 'var(--pastel-pink)', badge: 'ATLETA' },
  { id: 'admin', hash: '#/admin', label: 'Panel Nutri', icon: LayoutDashboard, color: 'var(--kraft-brown-light)', badge: 'PRO' }
];

const HERO_QUICK_STATS = [
  { icon: UsersStat, value: '75+', label: 'Red de Amigos' },
  { icon: TrendingUpStat, value: '100%', label: 'Cuidado de Salud' },
  { icon: Dumbbell, value: '20 Años', label: 'Energía & Pasión' }
];

export default function Nav({ currentRoute }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const scrollToSection = useScrollToSection();
  const lenis = useLenis();
  const closeTimerRef = useRef(null);

  const isHome = currentRoute === '#/' || !currentRoute;

  // Track which in-page section is in view (only meaningful on the public route)
  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) return;
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = PAGE_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(PAGE_SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(PAGE_SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Pause Lenis (and, via the .lenis-stopped CSS hook, page scroll entirely)
  // while the fullscreen menu is open, and resume it when it closes.
  useEffect(() => {
    if (!lenis) return;
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [open, lenis]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  const goHome = () => {
    setOpen(false);
    if (!isHome) {
      window.location.hash = '#/';
      closeTimerRef.current = setTimeout(() => scrollToSection('hero', { offset: 0 }), 200);
    } else {
      closeTimerRef.current = setTimeout(() => scrollToSection('hero', { offset: 0 }), 150);
    }
  };

  const handleNav = (id) => {
    setOpen(false);
    if (!isHome) {
      window.location.hash = '#/';
      closeTimerRef.current = setTimeout(() => scrollToSection(id), 220);
    } else {
      // Give Lenis a beat to resume (triggered by the `open` effect above)
      // before asking it to animate to the target — otherwise the very
      // first scrollTo after closing the overlay can get swallowed.
      closeTimerRef.current = setTimeout(() => scrollToSection(id), 60);
    }
  };

  const handleHashNav = (hash) => {
    setOpen(false);
    closeTimerRef.current = setTimeout(() => {
      window.location.hash = hash;
    }, 60);
  };

  return (
    <>
      {/* Slim fixed top bar — the ONLY persistent nav chrome, on every route */}
      <header className="nav-topbar select-none">
        <div className="nav-topbar-logo" onClick={goHome}>
          <span className="nav-topbar-title font-display">Guadalupe Martínez</span>
          <span className="nav-topbar-sub font-tech">Nutrición Deportiva &amp; Salud</span>
        </div>

        <button
          className="nav-topbar-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
          <span className="font-tech nav-topbar-toggle-label">{open ? 'CERRAR' : 'MENÚ'}</span>
        </button>
      </header>

      {/* Fullscreen dropdown menu — Framer-style overlay. Always mounted so
          the open/close transition can animate; visibility is toggled via
          inline style (same pattern as SectionNav's floating panel). */}
      <div
        className={`nav-overlay${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transform: open ? 'translateY(0)' : 'translateY(-1.5rem)'
        }}
      >
        <div className="nav-overlay-header">
          <div className="nav-overlay-logo font-display" onClick={goHome}>Guadalupe.</div>
          <button className="nav-overlay-close" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X size={20} />
          </button>
        </div>

        <div className="nav-overlay-body">
          {/* The Hero, distilled — lives inside the menu so it's the first
              thing visitors see when they open it, exactly like the split
              hero+nav panels in the Framer reference. */}
          <div className="nav-overlay-hero">
            <div className="nav-overlay-hero-photo">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                alt="Guadalupe Martínez"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';
                }}
              />
            </div>

            <span className="badge-neo font-tech nav-overlay-hero-badge">
              <Sparkles size={11} /> ESTUDIANTE DE LA LIC. EN NUTRICIÓN (UBA)
            </span>

            <h3 className="font-display nav-overlay-hero-name">Guadalupe Martínez</h3>
            <p className="font-tech nav-overlay-hero-tagline">
              Ciencia aplicada a la salud, planificación de cargas &amp; comunidad deportiva.
            </p>

            <div className="nav-overlay-hero-actions">
              <button className="btn-neo btn-neo-sm btn-accent" onClick={() => handleNav('contact')}>
                Agendar Consulta 📅
              </button>
              <button
                className="btn-neo btn-neo-sm"
                style={{ backgroundColor: 'var(--pastel-peach)' }}
                onClick={() => handleHashNav('#/plan-elite')}
              >
                Ver Mi Plan Élite ⚡
              </button>
            </div>

            <div className="nav-overlay-hero-stats">
              {HERO_QUICK_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="nav-overlay-hero-stat">
                    <Icon size={13} />
                    <span className="font-tech nav-overlay-hero-stat-value">{stat.value}</span>
                    <span className="font-tech nav-overlay-hero-stat-label">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full link list — every section, always fully visible (2-column
              grid keeps this well under viewport height on any screen). */}
          <div className="nav-overlay-links-wrap">
            <nav className="nav-overlay-links">
              {PAGE_SECTIONS.map((item, i) => {
                const Icon = item.icon;
                const isActive = isHome && activeId === item.id;
                return (
                  <button
                    key={item.id}
                    className={`nav-overlay-link${isActive ? ' is-active' : ''}`}
                    style={{
                      '--link-color': item.color,
                      transitionDelay: open ? `${60 + i * 35}ms` : '0ms'
                    }}
                    onClick={() => handleNav(item.id)}
                  >
                    <span className="nav-overlay-link-index font-tech">{String(i + 1).padStart(2, '0')}</span>
                    <Icon size={20} />
                    <span className="nav-overlay-link-label font-display">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="nav-overlay-routes">
              {HASH_ROUTES.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.hash;
                return (
                  <button
                    key={item.id}
                    className={`nav-overlay-route-btn${isActive ? ' is-active' : ''}`}
                    style={{ '--link-color': item.color }}
                    onClick={() => handleHashNav(item.hash)}
                  >
                    <Icon size={16} />
                    <span className="font-tech">{item.label}</span>
                    <span className="badge-neo font-tech nav-overlay-route-badge">{item.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
