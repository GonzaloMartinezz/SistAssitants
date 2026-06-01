import React, { useState } from 'react';
import { 
  Home, 
  Award, 
  TrendingUp, 
  Calculator, 
  BookOpen, 
  Calendar, 
  LayoutDashboard, 
  CheckCircle2,
  Menu,
  X,
  Users
} from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'Inicio', icon: Home, color: 'var(--pastel-pink)' },
    { id: 'workflow', label: 'Método', icon: Award, color: 'var(--pastel-blue)' },
    { id: 'plans', label: 'Planes', icon: TrendingUp, color: 'var(--pastel-green)' },
    { id: 'athlete-portal', label: 'Mi Plan Élite', icon: Award, color: 'var(--pastel-pink)' },
    { id: 'calculator', label: 'Calculadora', icon: Calculator, color: 'var(--pastel-yellow)' },
    { id: 'recipes', label: 'Recetas', icon: BookOpen, color: 'var(--pastel-peach)' },
    { id: 'testimonials', label: 'Alumnos', icon: Users, color: 'var(--pastel-green)' },
    { id: 'calendar', label: 'Agenda Cita', icon: Calendar, color: 'var(--pastel-blue)' },
    { id: 'admin', label: 'Panel Nutri', icon: LayoutDashboard, color: 'var(--kraft-brown-light)', special: true },
  ];

  const handleNavClick = (id) => {
    if (id === 'admin') {
      setMobileMenuOpen(false);
      window.location.hash = '#/admin';
      return;
    }

    setActiveSection(id);
    setMobileMenuOpen(false);
    
    // Ensure we are on the public route before scrolling
    if (window.location.hash && window.location.hash !== '#/') {
      window.location.hash = '#/';
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Mobile Top Bar Header */}
      <header className="nav-mobile-header">
        <div 
          className="mobile-logo-text font-display"
          onClick={() => handleNavClick('hero')}
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
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="sidebar-item-btn"
                style={{ 
                  backgroundColor: isActive ? item.color : '#ffffff',
                  transform: isActive ? 'translate(-2px, -2px)' : 'none',
                  boxShadow: isActive ? '4px 4px 0px var(--color-dark)' : '2px 2px 0px var(--color-dark)'
                }}
              >
                <div className="sidebar-icon-pad">
                  <Icon size={20} />
                </div>
                <span>{item.label}</span>
                {item.special && (
                  <span className="badge-neo font-tech" style={{ marginLeft: 'auto', backgroundColor: '#111111', color: '#f6f4ee', border: 'none' }}>
                    Admin
                  </span>
                )}
              </button>
            );
          })}
          
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
            onClick={() => handleNavClick('hero')}
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
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
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
                      PRO
                    </span>
                  )}
                </button>
              );
            })}
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
