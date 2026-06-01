import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function FeaturedPlans({ onNavigate }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'fuerza',
      title: 'Plan Fuerza Máxima & Powerlifting',
      price: '$45.00',
      period: 'Mes',
      desc: 'Optimizado para atletas que buscan incrementar sus RMs en sentadilla, banca y peso muerto sin perder masa muscular.',
      bgColor: 'var(--pastel-pink)',
      features: [
        'Distribución calórica con superávit controlado',
        'Estructura de macros adaptada a tus días de carga pesada',
        'Timing de carbohidratos alrededor del entrenamiento',
        'Soporte directo por WhatsApp para dudas de suplementación',
        'Plan de carga de creatina y beta-alanina'
      ]
    },
    {
      id: 'definicion',
      title: 'Definición Estética & Fitness',
      price: '$50.00',
      period: 'Mes',
      desc: 'Diseñado para culturistas naturales y entusiastas del gimnasio que buscan bajar su porcentaje de grasa al dígito simple conservando el músculo.',
      bgColor: 'var(--pastel-green)',
      features: [
        'Déficit calórico estructurado (refed de carbohidratos)',
        'Cálculo de proteína elevado para preservar masa magra',
        'Distribución de comidas para saciedad óptima',
        'Guía de suplementación quemadora (termo-nutrición)',
        'Ajuste semanal según pliegues antropométricos'
      ]
    },
    {
      id: 'crossfit',
      title: 'Rendimiento Crossfit & Funcional',
      price: '$55.00',
      period: 'Mes',
      desc: 'Enfocado en atletas híbridos que combinan fuerza pesada con resistencia cardiovascular extrema (WODs).',
      bgColor: 'var(--pastel-blue)',
      features: [
        'Periodización nutricional según intensidad del WOD',
        'Suplementación de electrolitos e hidratación avanzada',
        'Carga glucogénica para doble sesión de entrenamiento',
        'Plan de suplementación buffer (bicarbonato y beta-alanina)',
        'Monitoreo de recuperación y fatiga muscular'
      ]
    },
    {
      id: 'suplementacion',
      title: 'Protocolo de Suplementación Élite',
      price: '$35.00',
      period: 'Mes',
      desc: 'Asesoría pura de suplementación avanzada basada en evidencia científica para maximizar fuerza, foco mental y salud.',
      bgColor: 'var(--pastel-yellow)',
      features: [
        'Análisis de analíticas sanguíneas y carencias',
        'Protocolo de nootrópicos para foco pre-entrenamiento',
        'Estrategias ergogénicas testadas en laboratorio',
        'Guía de adaptógenos para modular el cortisol',
        'Plan de salud general (antioxidantes y omegas)'
      ]
    }
  ];

  return (
    <section id="plans" className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* Title */}
      <div className="flex flex-col text-left">
        <span className="section-label">Programas Deportivos</span>
        <h2 className="section-title">
          Planes de combustible
        </h2>
      </div>

      {/* Split banner matching image 3 top card */}
      <div className="plans-split-banner">
        
        {/* Left card */}
        <div className="plans-split-left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span className="badge-neo" style={{ backgroundColor: 'var(--pastel-pink)', rotate: '-2deg', alignSelf: 'flex-start' }}>
              ⚡ NUEVA TEMPORADA DE VOLUMEN
            </span>
            <h3>¡Listo para la temporada de volumen!</h3>
            <p>
              El superávit calórico y la periodización de cargas son la única forma de construir masa real. Con nuestro protocolo estructurado de Timing de Macros, llevarás tu volumen al siguiente nivel sin acumular grasa excesiva.
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate('calculator')}
            className="btn-neo btn-accent"
          >
            Calcular mis Calorías Gratis ⚡
          </button>
        </div>

        {/* Right card full bleed kettlebell photo */}
        <div className="plans-split-right">
          <img 
            src="/training.png" 
            alt="Atleta entrenando con kettlebells" 
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800";
            }}
          />
          <div className="badge-neo font-tech" style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#111111', color: '#f6f4ee', border: 'none', fontSize: '0.6rem' }}>
            @leticia_nutrisport
          </div>
        </div>

      </div>

      {/* 4 Cards grid */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className="plan-card"
            style={{ backgroundColor: plan.bgColor }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
              <h4>{plan.title}</h4>
              <p>{plan.desc}</p>
            </div>

            <div className="plan-price-row">
              <span className="plan-price-text">
                {plan.price}
                <span className="plan-price-sub"> / {plan.period}</span>
              </span>
              
              <button 
                onClick={() => setSelectedPlan(plan)}
                className="btn-neo"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', backgroundColor: '#ffffff' }}
              >
                Más Info
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Plans details modal drawer */}
      {selectedPlan && (
        <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div 
              className="modal-header"
              style={{ backgroundColor: selectedPlan.bgColor }}
            >
              <h3>{selectedPlan.title}</h3>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="modal-close-btn"
              >
                <X size={16} />
              </button>
            </div>

            {/* List */}
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span className="font-tech text-xs uppercase font-bold" style={{ color: 'var(--kraft-brown)' }}>¿Qué incluye este plan?</span>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                  {selectedPlan.desc}
                </p>
              </div>

              <div className="sidebar-divider"></div>

              <ul className="modal-features-list">
                {selectedPlan.features.map((feature, i) => (
                  <li key={i} className="modal-feature-item">
                    <div className="feature-tick-box">
                      <Check size={12} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <span className="plan-price-text">
                {selectedPlan.price}
                <span className="plan-price-sub"> / {selectedPlan.period}</span>
              </span>
              
              <button 
                onClick={() => {
                  setSelectedPlan(null);
                  onNavigate('calendar');
                }}
                className="btn-neo btn-accent"
              >
                Reservar Consulta ⚡
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
