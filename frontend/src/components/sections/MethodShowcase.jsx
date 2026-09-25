import React from 'react';
import { Activity, TrendingUp, Brain, Dumbbell } from 'lucide-react';
import StickyShowcase from '../common/StickyShowcase';

const PILLARS = [
  { label: 'Ciencia', angle: -45 },
  { label: 'Constancia', angle: 45 },
  { label: 'Educación', angle: 135 },
  { label: 'Comunidad', angle: 225 }
];

const SCIENTIFIC_METHODS = [
  {
    title: 'Composición Corporal Científica (Antropometría)',
    desc: 'Medimos la grasa, el músculo y la estructura ósea con calipers y mediciones ISAK. Evaluamos tu avance real en recomposición corporal. El peso en balanza no mide tu salud; tu verdadero progreso se mide en masa muscular activa y tejido adiposo saludable.',
    icon: Activity,
    color: 'var(--pastel-blue)',
    tag: 'COMPOSICIÓN CORPORAL REAL'
  },
  {
    title: 'Periodización de Cargas y Macros',
    desc: 'Calculamos tu Gasto Energético Diario y diseñamos una proporción exacta de proteínas, carbohidratos y grasas saludables adaptada al tipo de entrenamiento (fuerza, hipertrofia o resistencia) para nutrir al músculo y optimizar la quema de grasas simultáneamente.',
    icon: TrendingUp,
    color: 'var(--pastel-green)',
    tag: 'ESTIMULACIÓN METABÓLICA'
  },
  {
    title: 'Educación Alimentaria Sin Restricciones',
    desc: 'Buscamos crear hábitos sostenibles para toda la vida basados en la ciencia del comportamiento. Te enseñamos a entender el porqué de cada macronutriente. Sin dietas aburridas ni restrictivas; te acompañamos en un aprendizaje integral paso a paso.',
    icon: Brain,
    color: 'var(--pastel-peach)',
    tag: 'APRENDIZAJE PASO A PASO'
  },
  {
    title: 'Sinergia Nutrición & Entrenamiento Híbrido',
    desc: 'Alineamos tu alimentación diaria con tus planes de fuerza y rutinas físicas. El ejercicio físico es el mayor disparador de longevidad y salud metabólica; junto a una ingesta proteica calculada al detalle, logramos las metas necesarias para cada uno de ellos.',
    icon: Dumbbell,
    color: 'var(--pastel-yellow)',
    tag: 'RENDIMIENTO Y RECOMPOSICIÓN'
  }
];

export default function MethodShowcase() {
  return (
    <section id="method" className="section-container method-showcase-section">
      <div className="method-diagram-row">
        <div className="method-diagram-intro" data-reveal>
          <span className="section-label">Método de Tratamiento Estudiado 🧬</span>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>cuatro pilares, un mismo objetivo</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-muted)', maxWidth: '30rem', margin: 0 }}>
            Las nutricionistas aplicamos herramientas respaldadas por estudios clínicos para guiar los
            tratamientos de forma segura y eficaz. El objetivo no es solo bajar de peso, sino un
            tratamiento adaptado a tu biología individual — apoyado en estos cuatro pilares:
          </p>
        </div>

        <div className="method-orbit" data-reveal="scale" aria-hidden="true">
          <div className="method-orbit-ring method-orbit-ring-outer" />
          <div className="method-orbit-ring method-orbit-ring-inner" />
          <div className="method-orbit-center font-display">GM</div>
          {PILLARS.map((pillar) => (
            <div
              key={pillar.label}
              className="method-orbit-node font-tech"
              style={{ '--orbit-angle': `${pillar.angle}deg` }}
            >
              <span>{pillar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <StickyShowcase items={SCIENTIFIC_METHODS} />
    </section>
  );
}
