import React, { useState, useEffect, useRef } from 'react';
import { Star, TrendingUp, Users, Award, ChevronLeft, ChevronRight, Quote, Dumbbell, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Ortiz',
    age: 28,
    sport: 'Powerlifting',
    avatar: '💪',
    quote: 'Leticia me ayudó a subir mi sentadilla de 120kg a 165kg en 6 meses sin ganar grasa innecesaria. Su plan de timing de carbohidratos fue clave para mis sesiones pesadas.',
    statBefore: { weight: 82, fat: 22, muscle: 38 },
    statAfter: { weight: 86, fat: 15, muscle: 44 },
    months: 6,
    rating: 5,
    bgColor: 'var(--pastel-pink)'
  },
  {
    id: 2,
    name: 'Sofía Benítez',
    age: 24,
    sport: 'Crossfit',
    avatar: '⚡',
    quote: 'Pasé de no poder hacer 1 muscle-up a encadenar 8 seguidos. La suplementación y el plan nutricional de Leti me dieron la energía que necesitaba para los WODs más intensos.',
    statBefore: { weight: 62, fat: 28, muscle: 30 },
    statAfter: { weight: 59, fat: 18, muscle: 35 },
    months: 5,
    rating: 5,
    bgColor: 'var(--pastel-blue)'
  },
  {
    id: 3,
    name: 'Martín Ruiz',
    age: 32,
    sport: 'Culturismo Natural',
    avatar: '🏆',
    quote: 'Gracias al protocolo de definición de Leticia, competí por primera vez en la categoría Men\'s Physique y quedé top 3. La dieta reversa post-competencia fue impecable.',
    statBefore: { weight: 88, fat: 18, muscle: 42 },
    statAfter: { weight: 83, fat: 9, muscle: 45 },
    months: 4,
    rating: 5,
    bgColor: 'var(--pastel-green)'
  },
  {
    id: 4,
    name: 'Valentina Torres',
    age: 26,
    sport: 'Gimnasio / Estética',
    avatar: '✨',
    quote: 'Siempre hacía dietas restrictivas que me dejaban sin energía. Con Leti aprendí a comer para rendir y verme bien. Gané glúteo, definí abdomen y como más que antes.',
    statBefore: { weight: 58, fat: 30, muscle: 25 },
    statAfter: { weight: 56, fat: 20, muscle: 31 },
    months: 7,
    rating: 5,
    bgColor: 'var(--pastel-yellow)'
  },
  {
    id: 5,
    name: 'Federico Álvarez',
    age: 35,
    sport: 'Running / Trail',
    avatar: '🏃',
    quote: 'Bajé mi marca de 10K de 52 minutos a 44 minutos. La carga de glucógeno y la hidratación pre-carrera que me diseñó Leticia fue un antes y un después en mi rendimiento.',
    statBefore: { weight: 75, fat: 20, muscle: 35 },
    statAfter: { weight: 72, fat: 14, muscle: 37 },
    months: 5,
    rating: 5,
    bgColor: 'var(--pastel-peach)'
  }
];

const stats = [
  { label: 'Atletas Asesorados', value: 127, icon: Users, suffix: '+', color: 'var(--pastel-pink)' },
  { label: 'Kg de Grasa Eliminados', value: 840, icon: TrendingUp, suffix: 'kg', color: 'var(--pastel-blue)' },
  { label: 'Competidores Preparados', value: 23, icon: Award, suffix: '', color: 'var(--pastel-green)' },
  { label: 'Satisfacción General', value: 98, icon: Heart, suffix: '%', color: 'var(--pastel-yellow)' }
];

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="workflow-section">
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Title */}
        <div className="flex flex-col text-left select-none">
          <span className="section-label">Resultados Reales</span>
          <h2 className="section-title">
            mis alumnos hablan
          </h2>
        </div>

        {/* Stats Counter Row */}
        <div className="testimonials-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-counter-card"
                style={{ backgroundColor: stat.color }}
              >
                <div className="stat-counter-icon">
                  <Icon size={24} />
                </div>
                <div className="stat-counter-value font-display">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span className="stat-counter-label font-tech">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Testimonial Carousel Card */}
        <div className="testimonial-carousel-wrapper">

          {/* Main Testimonial Card */}
          <div
            className="testimonial-main-card"
            style={{ backgroundColor: current.bgColor }}
          >
            {/* Top Row: Avatar + Name + Sport */}
            <div className="testimonial-header-row">
              <div className="testimonial-avatar">
                <span style={{ fontSize: '2rem' }}>{current.avatar}</span>
              </div>
              <div className="testimonial-meta">
                <h3 className="font-display" style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.2 }}>
                  {current.name}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="badge-neo font-tech" style={{ backgroundColor: '#ffffff', fontSize: '0.6rem' }}>
                    <Dumbbell size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> {current.sport}
                  </span>
                  <span className="font-tech" style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.7 }}>
                    {current.age} años · {current.months} meses de asesoría
                  </span>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="testimonial-quote-block">
              <Quote size={20} style={{ opacity: 0.3, flexShrink: 0 }} />
              <p className="testimonial-quote-text">
                {current.quote}
              </p>
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={16} fill="#b45309" color="#b45309" />
              ))}
            </div>

            {/* Before/After Stats */}
            <div className="testimonial-stats-comparison">
              <div className="testimonial-stat-col">
                <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase' }}>Antes</span>
                <div className="testimonial-stat-row">
                  <div className="testimonial-stat-item">
                    <span className="font-tech" style={{ fontSize: '0.5rem', fontWeight: 700, opacity: 0.6 }}>PESO</span>
                    <span className="font-tech" style={{ fontWeight: 900, fontSize: '1rem' }}>{current.statBefore.weight}kg</span>
                  </div>
                  <div className="testimonial-stat-divider"></div>
                  <div className="testimonial-stat-item">
                    <span className="font-tech" style={{ fontSize: '0.5rem', fontWeight: 700, opacity: 0.6 }}>GRASA</span>
                    <span className="font-tech" style={{ fontWeight: 900, fontSize: '1rem', color: '#dc2626' }}>{current.statBefore.fat}%</span>
                  </div>
                  <div className="testimonial-stat-divider"></div>
                  <div className="testimonial-stat-item">
                    <span className="font-tech" style={{ fontSize: '0.5rem', fontWeight: 700, opacity: 0.6 }}>MÚSCULO</span>
                    <span className="font-tech" style={{ fontWeight: 900, fontSize: '1rem' }}>{current.statBefore.muscle}%</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-arrow-divider">
                <TrendingUp size={20} />
              </div>

              <div className="testimonial-stat-col">
                <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Después</span>
                <div className="testimonial-stat-row">
                  <div className="testimonial-stat-item">
                    <span className="font-tech" style={{ fontSize: '0.5rem', fontWeight: 700, opacity: 0.6 }}>PESO</span>
                    <span className="font-tech" style={{ fontWeight: 900, fontSize: '1rem' }}>{current.statAfter.weight}kg</span>
                  </div>
                  <div className="testimonial-stat-divider"></div>
                  <div className="testimonial-stat-item">
                    <span className="font-tech" style={{ fontSize: '0.5rem', fontWeight: 700, opacity: 0.6 }}>GRASA</span>
                    <span className="font-tech" style={{ fontWeight: 900, fontSize: '1rem', color: '#059669' }}>{current.statAfter.fat}%</span>
                  </div>
                  <div className="testimonial-stat-divider"></div>
                  <div className="testimonial-stat-item">
                    <span className="font-tech" style={{ fontSize: '0.5rem', fontWeight: 700, opacity: 0.6 }}>MÚSCULO</span>
                    <span className="font-tech" style={{ fontWeight: 900, fontSize: '1rem', color: '#059669' }}>{current.statAfter.muscle}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="testimonial-nav-row">
            <button onClick={prevTestimonial} className="btn-neo" style={{ padding: '0.6rem' }}>
              <ChevronLeft size={18} />
            </button>

            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="testimonial-dot"
                  style={{
                    backgroundColor: i === activeIndex ? 'var(--color-dark)' : 'var(--kraft-brown-light)',
                    transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)'
                  }}
                />
              ))}
            </div>

            <button onClick={nextTestimonial} className="btn-neo" style={{ padding: '0.6rem' }}>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Mini Avatars Row */}
          <div className="testimonial-mini-avatars">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                className="testimonial-mini-avatar"
                style={{
                  backgroundColor: t.bgColor,
                  transform: i === activeIndex ? 'scale(1.15) rotate(-3deg)' : 'scale(1)',
                  boxShadow: i === activeIndex ? '4px 4px 0px var(--color-dark)' : '2px 2px 0px var(--color-dark)'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{t.avatar}</span>
                <span className="font-tech" style={{ fontSize: '0.55rem', fontWeight: 700 }}>{t.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
