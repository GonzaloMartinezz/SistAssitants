import React, { useState, useEffect } from 'react';
import {
  Home,
  Award,
  TrendingUp,
  Calculator,
  BookOpen,
  Newspaper,
  Image,
  Share2,
  Mail,
  LayoutDashboard,
  CheckCircle2,
  Menu,
  X,
  Users
} from 'lucide-react';
import useScrollToSection from '../../hooks/useScrollToSection';

const PAGE_SECTIONS = [
  { id: 'hero', label: 'Inicio', icon: Home, color: 'var(--pastel-pink)' },
  { id: 'workflow', label: 'Método', icon: Award, color: 'var(--pastel-blue)' },
  { id: 'plans', label: 'Planes', icon: TrendingUp, color: 'var(--pastel-green)' },
  { id: 'recipes', label: 'Comidas', icon: BookOpen, color: 'var(--pastel-peach)' },
  { id: 'news', label: 'Noticias', icon: Newspaper, color: 'var(--pastel-yellow)' },
  { id: 'posts', label: 'Posteos', icon: Image, color: 'var(--pastel-pink)' },
  { id: 'social', label: 'Redes', icon: Share2, color: 'var(--pastel-blue)' },
  { id: 'testimonials', label: 'Alumnos', icon: Users, color: 'var(--pastel-green)' },
  { id: 'calculator', label: 'Calculadora', icon: Calculator, color: 'var(--pastel-yellow)' },
  { id: 'contact', label: 'Contacto', icon: Mail, color: 'var(--pastel-peach)' }
];

const HASH_ROUTES = [
  { id: 'plan-elite', hash: '#/plan-elite', label: 'Mi Plan Élite', icon: Award, color: 'var(--pastel-pink)', special: true, badge: 'ATLETA' },
  { id: 'admin', hash: '#/admin', label: 'Panel Nutri', icon: LayoutDashboard, color: 'var(--kraft-brown-light)', special: true, badge: 'PRO' }
];

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const scrollToSection = useScrollToSection();

  // Track which in-page section is currently in view (only meaningful on the public route)
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash && window.location.hash !== '#/') return;
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
  }, []);

  const handleSectionClick = (id) => {
    setMobileMenuOpen(false);

    const goAndScroll = () => scrollToSection(id);

    if (window.location.hash && window.location.hash !== '#/') {
      window.location.hash = '#/';
      setTimeout(goAndScroll, 150);
    } else {
      goAndScroll();
    }
  };

  const handleHashClick = (hash) => {
    setMobileMenuOpen(false);
    window.location.hash = hash;
  };

  const renderItem = (item, isRoute) => {
    const Icon = item.icon;
    const isActive = isRoute
      ? window.location.hash === item.hash
      : activeId === item.id;

    return (
      <button
        key={item.id}
        onClick={() => (isRoute ? handleHashClick(item.hash) : handleSectionClick(item.id))}
        className="sidebar-item-btn"
        style={{
          backgroundColor: isActive ? item.color : '#ffffff',
          transform: isActive ? 'translate(-3px, -3px)' : 'none',
          boxShadow: isActive ? '5px 5px 0px var(--color-dark)' : '3px 3px 0px var(--color-dark)'
        }}
      >
        <div className="sidebar-icon-pad">
          <Icon size={16} />
        </div>
        <span>{item.label}</span>
        {item.special && (
          <span className="badge-neo font-tech" style={{ marginLeft: 'auto', backgroundColor: '#111111', color: '#f6f4ee', border: 'none', fontSize: '0.6rem' }}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Top Bar Header */}
      <header className="nav-mobile-header">
        <div
          className="mobile-logo-text font-display"
          onClick={() => handleSectionClick('hero')}
        >
          Guadalupe.
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          {PAGE_SECTIONS.map((item) => renderItem(item, false))}
          {HASH_ROUTES.map((item) => renderItem(item, true))}

          <div className="sidebar-status-panel" style={{ marginTop: 'auto' }}>
            <div className="sidebar-status-header">
              <CheckCircle2 size={14} /> Base de Datos Conectada
            </div>
            <p className="sidebar-meta-sub" style={{ fontSize: '0.75rem' }}>
              Estudiante Lic. en Nutrición
            </p>
          </div>
        </div>
      )}

      {/* Desktop Left-aligned Sidebar */}
      <aside className="nav-sidebar">
        <div className="sidebar-top">
          {/* Logo */}
          <div
            className="sidebar-logo"
            onClick={() => handleSectionClick('hero')}
          >
            <span className="sidebar-logo-text">
              Guadalupe
            </span>
            <span className="sidebar-logo-sub">
              Nutrición & Comunidad
            </span>
          </div>

          {/* Sidebar menu navigation links */}
          <nav className="sidebar-nav">
            {PAGE_SECTIONS.map((item) => renderItem(item, false))}
            <div className="sidebar-divider" style={{ margin: '0.35rem 0' }}></div>
            {HASH_ROUTES.map((item) => renderItem(item, true))}
          </nav>
        </div>

        {/* Status indicator panel */}
        <div className="sidebar-status-panel">
          <div className="sidebar-status-header">
            <span className="status-dot"></span>
            Conexión Local Activa
          </div>
          <div className="sidebar-divider"></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span className="sidebar-meta-name">Guadalupe Martínez</span>
            <span className="sidebar-meta-sub">ESTUDIANTE DE LIC. EN NUTRICIÓN</span>
          </div>
        </div>
      </aside>
    </>
  );
}
