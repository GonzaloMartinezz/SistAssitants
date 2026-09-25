import React from 'react';
import { Camera, Music2, PlayCircle, MessageCircle, Share2 } from 'lucide-react';

const LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@guada_nutrisalud',
    href: 'https://instagram.com/guada_nutrisalud',
    icon: Camera,
    color: 'var(--pastel-pink)'
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@guada.nutrisport',
    href: 'https://tiktok.com/@guada.nutrisport',
    icon: Music2,
    color: 'var(--pastel-blue)'
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: 'Guadalupe Martínez',
    href: 'https://youtube.com/@guadanutrisport',
    icon: PlayCircle,
    color: 'var(--pastel-yellow)'
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: '+54 9 11 5555-6789',
    href: 'https://wa.me/5491155556789',
    icon: MessageCircle,
    color: 'var(--pastel-green)'
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'Guada Nutrición Deportiva',
    href: 'https://facebook.com/guadanutrideportiva',
    icon: Share2,
    color: 'var(--pastel-peach)'
  }
];

const MARQUEE_WORDS = ['Nutrición Deportiva', 'Comunidad Real', 'Ciencia Aplicada', 'Rendimiento', 'Recetas Fit', 'Educación'];

export default function SocialLinks() {
  const marqueeItems = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <section id="social" className="social-section">
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>
        <span className="section-label">Sigamos en Contacto</span>
        <h2 className="section-title" style={{ marginBottom: 0 }}>redes sociales</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-muted)', maxWidth: '32rem' }}>
          Elegí tu plataforma favorita y sumate a la comunidad. Respondo dudas de nutrición
          deportiva todas las semanas.
        </p>
      </div>

      {/* Auto-scrolling horizontal marquee — always moving, independent of vertical scroll */}
      <div className="social-marquee-row">
        <div className="social-marquee-scroller">
          {marqueeItems.map((word, i) => (
            <span key={i} className="social-marquee-item font-display">
              {word} <Camera size={22} style={{ margin: '0 0.5rem' }} />
            </span>
          ))}
        </div>
      </div>
      <div className="social-marquee-row">
        <div className="social-marquee-scroller reverse">
          {marqueeItems.map((word, i) => (
            <span key={i} className="social-marquee-item font-display" style={{ color: 'var(--kraft-brown)' }}>
              {word} <Music2 size={22} style={{ margin: '0 0.5rem' }} />
            </span>
          ))}
        </div>
      </div>

      <div className="social-links-grid" style={{ marginTop: '2.5rem' }}>
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.id} href={link.href} target="_blank" rel="noreferrer" className="social-link-card">
              <div className="social-link-icon" style={{ backgroundColor: link.color }}>
                <Icon size={20} />
              </div>
              <h4>{link.label}</h4>
              <span>{link.handle}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
