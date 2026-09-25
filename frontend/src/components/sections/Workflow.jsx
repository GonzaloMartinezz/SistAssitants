import React from 'react';
import { ClipboardList, Target, CalendarDays, LineChart } from 'lucide-react';
import useScrollToSection from '../../hooks/useScrollToSection';
import HorizontalScrollSection from '../common/HorizontalScrollSection';

export default function Workflow() {
  const scrollToSection = useScrollToSection();
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
      <HorizontalScrollSection
        header={
          <>
            <span className="section-label">Paso a Paso</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              ¿cómo funciona el método?
            </h2>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-neo btn-accent"
              style={{ fontSize: '0.85rem', padding: '0.75rem 1.25rem', alignSelf: 'flex-start' }}
            >
              Comenzar Asesoría ⚡
            </button>
          </>
        }
        trackClassName="workflow-track"
      >
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="step-card"
              style={{ width: '18rem', flex: '0 0 18rem' }}
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
      </HorizontalScrollSection>
    </section>
  );
}
