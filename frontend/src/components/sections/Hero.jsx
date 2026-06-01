import React from 'react';
import { Sparkles, Users, TrendingUp, Award, Dumbbell, Activity, Brain, ShieldAlert } from 'lucide-react';

export default function Hero({ onNavigate }) {
  const quickStats = [
    { icon: Users, value: '75+', label: 'Red de Amigos', color: 'var(--pastel-pink)' },
    { icon: TrendingUp, value: '100%', label: 'Cuidado de Salud', color: 'var(--pastel-blue)' },
    { icon: Award, value: 'UBA', label: 'Estudiante Lic.', color: 'var(--pastel-green)' },
    { icon: Dumbbell, value: '20 Años', label: 'Energía & Pasión', color: 'var(--pastel-yellow)' }
  ];

  const scientificMethods = [
    {
      title: "1. Composición Corporal Científica (Antropometría)",
      desc: "Medimos la grasa, el músculo y la estructura ósea con calipers y mediciones ISAK. Evaluamos tu avance real en recomposición corporal. El peso en balanza no mide tu salud; tu verdadero progreso se mide en masa muscular activa y tejido adiposo saludable.",
      icon: Activity,
      color: "var(--pastel-blue)",
      tag: "COMPOSICIÓN CORPORAL REAL"
    },
    {
      title: "2. Periodización de Cargas y Macros",
      desc: "Calculamos tu Gasto Energético Diario y diseñamos una proporción exacta de proteínas, carbohidratos y grasas saludables adaptada al tipo de entrenamiento (fuerza, hipertrofia o resistencia) para nutrir al músculo y optimizar la quema de grasas simultáneamente.",
      icon: TrendingUp,
      color: "var(--pastel-green)",
      tag: "ESTIMULACIÓN METABÓLICA"
    },
    {
      title: "3. Educación Alimentaria Sin Restricciones",
      desc: "Buscamos crear hábitos sostenibles para toda la vida basados en la ciencia del comportamiento. Te enseñamos a entender el porqué de cada macronutriente. Sin dietas aburridas ni restrictivas; te acompañamos en un aprendizaje integral paso a paso.",
      icon: Brain,
      color: "var(--pastel-peach)",
      tag: "APRENDIZAJE PASO A PASO"
    },
    {
      title: "4. Sinergia Nutrición & Entrenamiento Híbrido",
      desc: "Alineamos tu alimentación diaria con tus planes de fuerza y rutinas físicas. El ejercicio físico es el mayor disparador de longevidad y salud metabólica; junto a una ingesta proteica calculada al detalle, logramos las metas necesarias para cada uno de ellos.",
      icon: Dumbbell,
      color: "var(--pastel-yellow)",
      tag: "RENDIMIENTO Y RECOMPOSICIÓN"
    }
  ];

  return (
    <section id="hero" className="section-container" style={{ width: '100%', maxWidth: '1200px', padding: '2rem 1.5rem', margin: '0 auto', boxSizing: 'border-box' }}>
      <div className="hero-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Top Header Banner */}
        <div className="hero-banner" style={{ borderBottom: '3px solid var(--color-dark)', paddingBottom: '1.5rem' }}>
          <div className="hero-badge-float" style={{ position: 'relative', display: 'inline-flex', top: '0', left: '0', transform: 'rotate(-1deg)', marginBottom: '1rem', zIndex: 10 }}>
            <Sparkles size={12} className="animate-spin" /> ESTUDIANTE DE LA LIC. EN NUTRICIÓN (UBA)
          </div>
          
          <h1 className="hero-title font-display" style={{ fontSize: '3.5rem', lineHeight: '1.1', textTransform: 'uppercase', color: 'var(--color-dark)' }}>
            Guadalupe Martínez
          </h1>
          <p className="font-tech" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--kraft-brown)', marginTop: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Ciencia Aplicada a la Salud, Planificación de Cargas & Comunidad Deportiva
          </p>
        </div>

        {/* Two-Column split layout: History on left, Scientific methods on right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* Left Column: Guadalupe Story (takes 5 columns) */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* The circular image frame with decorative badges */}
            <div className="hero-image-block" style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div className="hero-badge-1" style={{ fontSize: '0.65rem', padding: '0.35rem 0.7rem' }}>
                🤝 COMUNIDAD DE APOYO
              </div>
              <div className="hero-badge-2" style={{ fontSize: '0.65rem', padding: '0.35rem 0.7rem' }}>
                🎓 EDUCACIÓN CIENTÍFICA
              </div>
              <div className="circle-frame" style={{ width: '100%', height: 'auto', aspectRatio: '1/1', maxHeight: '18rem', display: 'block' }}>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="Guadalupe Martinez - Estudiante de Nutrición" 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Historia / Vision Card */}
            <div className="hero-card" style={{ backgroundColor: 'var(--pastel-pink)', padding: '2rem', borderRadius: '1.5rem', border: '3px solid var(--color-dark)', boxShadow: '5px 5px 0px var(--color-dark)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  onClick={() => onNavigate('calendar')}
                  className="btn-neo btn-neo-sm btn-accent"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.9rem' }}
                >
                  Agendar Consulta 📅
                </button>
                <button 
                  onClick={() => onNavigate('athlete-portal')}
                  className="btn-neo btn-neo-sm"
                  style={{ backgroundColor: 'var(--pastel-peach)', fontSize: '0.75rem', padding: '0.45rem 0.9rem' }}
                >
                  Ver Mi Plan Élite ⚡
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Studied Scientific Methods (takes 7 columns) */}
          <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ border: '3px solid var(--color-dark)', padding: '1.5rem', borderRadius: '1.25rem', backgroundColor: 'var(--pastel-blue)', boxShadow: '5px 5px 0px var(--color-dark)', textAlign: 'left' }}>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Método de Tratamiento Estudiado 🧬
              </h2>
              <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-muted)', lineHeight: '1.6', margin: '0' }}>
                Las nutricionistas aplicamos herramientas respaldadas por estudios clínicos para guiar los tratamientos de los pacientes de forma segura y eficaz. El objetivo no es solo bajar de peso, sino realizar un tratamiento adaptado a la biología individual:
              </p>
            </div>

            {/* List of Scientific Methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {scientificMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div 
                    key={index}
                    style={{
                      border: '3px solid var(--color-dark)',
                      borderRadius: '1.25rem',
                      padding: '1.25rem',
                      backgroundColor: method.color,
                      boxShadow: '4px 4px 0px var(--color-dark)',
                      display: 'flex',
                      gap: '1.25rem',
                      alignItems: 'flex-start',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '50%',
                      border: '2px solid var(--color-dark)',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '2px 2px 0px var(--color-dark)',
                      marginTop: '0.2rem'
                    }}>
                      <Icon size={18} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--color-dark)', opacity: '0.6', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {method.tag}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-sans)', margin: '0', color: 'var(--color-dark)' }}>
                        {method.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', lineHeight: '1.5', fontWeight: '600', color: 'var(--color-dark)', opacity: '0.9', margin: '0' }}>
                        {method.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Quick Stats Row */}
        <div className="hero-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="hero-stat-chip"
                style={{ backgroundColor: stat.color, border: '3px solid var(--color-dark)', borderRadius: '1rem', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '3px 3px 0px var(--color-dark)' }}
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
