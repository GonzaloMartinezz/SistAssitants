import React from 'react';
import { ClipboardList, Target, CalendarDays, LineChart } from 'lucide-react';

export default function Workflow({ onNavigate }) {
  const steps = [
    {
      num: '01',
      title: 'Evaluación de Fuerza y Hábitos',
      desc: 'Analizamos tus porcentajes de grasa y músculo, tus niveles de fuerza, tus cargas máximas y la disciplina que practicas.',
      icon: ClipboardList,
      bgColor: 'var(--pastel-blue)'
    },
    {
      num: '02',
      title: 'Estructuración Macro y Timing',
      desc: 'Calculamos tus calorías e ideamos un plan de macronutrientes distribuidos en pre, intra y post entrenamiento para rendir al 100%.',
      icon: Target,
      bgColor: 'var(--pastel-pink)'
    },
    {
      num: '03',
      title: 'Agendamiento y Sincronización',
      desc: 'Programamos tus consultas de forma sincronizada en Google Calendar, integrando tus cargas semanales y descansos.',
      icon: CalendarDays,
      bgColor: 'var(--pastel-yellow)'
    },
    {
      num: '04',
      title: 'Ajuste Constante y Progreso',
      desc: 'Analizamos tus métricas de rendimiento semana a semana y ajustamos tu alimentación para evitar estancamientos y seguir creciendo.',
      icon: LineChart,
      bgColor: 'var(--pastel-green)'
    }
  ];

  return (
    <section id="workflow" className="workflow-section">
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        
        {/* Tilted Header */}
        <div className="tilted-container">
          <h2 className="tilted-text">
            ¿cómo funciona <br />
            <span style={{ color: 'var(--kraft-brown)' }}>el método?</span>
          </h2>
        </div>

        {/* 4 Steps timeline row */}
        <div className="workflow-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="step-card"
              >
                {/* Custom circular step icon frame */}
                <div 
                  className="step-icon-circle"
                  style={{ backgroundColor: step.bgColor }}
                >
                  <Icon size={32} />
                  <span className="step-num-badge font-tech">
                    {step.num}
                  </span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA booking button */}
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => onNavigate('calendar')}
            className="btn-neo btn-accent"
            style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
          >
            Comenzar Asesoría Deportiva ⚡
          </button>
        </div>
      </div>
    </section>
  );
}
