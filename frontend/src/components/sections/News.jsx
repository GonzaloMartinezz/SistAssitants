import React, { useState } from 'react';
import { Newspaper, ArrowRight, X, Clock } from 'lucide-react';
import HorizontalScrollSection from '../common/HorizontalScrollSection';

const ARTICLES = [
  {
    id: 1,
    tag: 'Suplementación',
    date: '18 Sep 2026',
    readTime: '6 min',
    title: 'Creatina en Mujeres Deportistas: Mitos y Verdades',
    excerpt: 'La creatina monohidrato sigue siendo uno de los suplementos más estudiados y seguros, pero persisten mitos sobre retención de líquidos en mujeres. Repasamos qué dice realmente la evidencia y cómo dosificarla según tu fase de entrenamiento.',
    body: 'La creatina monohidrato es, junto con la cafeína, el suplemento con mayor respaldo científico del mercado. En mujeres deportistas, los estudios muestran mejoras en fuerza, potencia y recuperación entre sesiones sin el aumento de peso graso que muchas temen. La retención de agua inicial es intracelular (dentro del músculo) y suele ser mínima con protocolos de mantenimiento de 3-5g diarios, sin necesidad de fase de carga. Además, hay evidencia emergente sobre beneficios cognitivos y en la salud ósea a largo plazo. Como siempre, la clave es la consistencia diaria y ajustar la dosis a tu peso corporal y objetivo de entrenamiento.'
  },
  {
    id: 2,
    tag: 'Rendimiento',
    date: '05 Sep 2026',
    readTime: '5 min',
    title: 'Timing de Carbohidratos: Lo que Dice la Evidencia',
    excerpt: 'No todos los carbohidratos deben comerse igual. Te cuento cómo distribuyo los hidratos de carbono antes, durante y después del entrenamiento para maximizar rendimiento y recuperación sin excederte en calorías totales.',
    body: 'El "carb timing" dejó de ser una moda para convertirse en una herramienta práctica: consumir carbohidratos de absorción rápida 30-60 minutos antes de entrenar mejora la disponibilidad de glucógeno, mientras que la ventana post-entreno (idealmente combinada con proteína en ratio 3:1) acelera la resíntesis de glucógeno muscular. En sesiones de más de 90 minutos de alta intensidad, incorporar 30-60g de carbohidratos por hora sostiene el rendimiento. Fuera de esas ventanas, la distribución puede ser más flexible según tus preferencias y digestión individual.'
  },
  {
    id: 3,
    tag: 'Hidratación',
    date: '22 Ago 2026',
    readTime: '4 min',
    title: 'Electrolitos en Verano: Guía para Entrenos Intensos',
    excerpt: 'Con el calor, perder solo agua no alcanza para explicar la fatiga en pleno WOD o serie pesada. Sodio, potasio y magnesio cumplen un rol clave que muchas veces se ignora en la hidratación deportiva.',
    body: 'La deshidratación del 2% del peso corporal ya afecta el rendimiento cognitivo y físico. En climas cálidos o sesiones de más de una hora, reponer solo agua puede diluir el sodio plasmático y generar calambres o fatiga temprana. Una bebida deportiva casera con 500ml de agua, una pizca de sal marina, jugo de limón y una cucharadita de miel cubre buena parte de tus necesidades de electrolitos sin recurrir a productos comerciales azucarados. Pesarte antes y después del entrenamiento es la forma más simple de estimar cuánto líquido perdiste realmente.'
  },
  {
    id: 4,
    tag: 'Educación',
    date: '10 Ago 2026',
    readTime: '7 min',
    title: 'Cómo Leer una Etiqueta Nutricional Como un Profesional',
    excerpt: 'Aprender a leer el rotulado nutricional te libera de depender de "dietas mágicas". Te enseño en qué fijarte primero: porción, macronutrientes por 100g y los ingredientes ocultos que más importan.',
    body: 'El primer error común es mirar los valores "por porción" sin fijarse en el tamaño real de esa porción. Comparar siempre por cada 100g o 100ml te da una lectura objetiva entre productos. Después, priorizá proteína y fibra (cuanto más, mejor) y prestá atención a los azúcares agregados, que en Argentina deben declararse aparte de los azúcares totales. Por último, revisá la lista de ingredientes: están ordenados de mayor a menor cantidad, así que si el azúcar aparece entre los primeros tres, ya tenés una pista clara del producto.'
  },
  {
    id: 5,
    tag: 'Mitos & Ciencia',
    date: '29 Jul 2026',
    readTime: '5 min',
    title: 'Ayuno Intermitente y Rendimiento: ¿Sirve para Atletas?',
    excerpt: 'El ayuno intermitente puede ser una herramienta útil para algunos objetivos de composición corporal, pero no es gratuito para quienes entrenan fuerte. Te cuento cuándo lo recomiendo y cuándo definitivamente no.',
    body: 'Para un atleta de fuerza o hipertrofia, entrenar en ayuno prolongado puede comprometer el rendimiento en la sesión y la síntesis proteica posterior si la ventana de alimentación no permite cubrir los requerimientos totales de proteína y energía. Dicho esto, protocolos moderados (12-14 horas de ayuno nocturno) pueden encajar perfecto en la rutina de muchas personas sin afectar el entrenamiento, especialmente en fases de mantenimiento. La recomendación siempre es individual: depende de tu disciplina, horario de entrenamiento y cómo responde tu cuerpo.'
  },
  {
    id: 6,
    tag: 'Novedades',
    date: '02 Jul 2026',
    readTime: '3 min',
    title: 'Nuevos Cupos de Asesoría — Temporada 2026/2027',
    excerpt: 'Abro un número limitado de cupos nuevos para acompañamiento 1 a 1 en nutrición deportiva. Si venís posponiendo tu consulta, este es el momento de sumarte a la comunidad.',
    body: 'Después de una temporada increíble junto a atletas de powerlifting, crossfit, running y culturismo natural, abro nuevos cupos para asesoría personalizada. El proceso incluye evaluación antropométrica inicial, plan de macronutrientes adaptado a tu disciplina, seguimiento quincenal y soporte directo por WhatsApp para resolver dudas del día a día. Los cupos son limitados para poder darle a cada atleta la atención que merece — reservá tu lugar desde la sección de contacto.'
  }
];

export default function News() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="news" className="news-section">
      <HorizontalScrollSection
        header={
          <>
            <span className="section-label" data-reveal>Blog & Novedades</span>
            <h2 className="section-title" style={{ color: 'var(--bg-cream)' }}>
              noticias
            </h2>
            <p className="news-intro">
              Notas cortas de ciencia aplicada, mitos que desarmo con evidencia y novedades
              de la comunidad — escrito para que entiendas el porqué de cada recomendación,
              no solo el qué.
            </p>
            <span className="badge-neo font-tech" style={{ backgroundColor: 'var(--pastel-yellow)', alignSelf: 'flex-start' }}>
              <Newspaper size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />
              {ARTICLES.length} artículos recientes
            </span>
          </>
        }
        trackClassName="news-track"
      >
        {ARTICLES.map((article) => (
          <article key={article.id} className="news-card">
            <div>
              <div className="news-card-top">
                <span className="badge-neo font-tech" style={{ backgroundColor: 'var(--pastel-yellow)', border: 'none', color: 'var(--color-dark)' }}>
                  {article.tag}
                </span>
                <span className="news-card-date">{article.date}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </div>
            <div className="news-card-footer">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: 0.75 }}>
                <Clock size={12} /> {article.readTime} de lectura
              </span>
              <button
                onClick={() => setSelected(article)}
                style={{ background: 'none', border: 'none', color: 'var(--pastel-yellow)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-tech)', fontWeight: 700, fontSize: '0.7rem' }}
              >
                Leer más <ArrowRight size={12} />
              </button>
            </div>
          </article>
        ))}
      </HorizontalScrollSection>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: 'var(--pastel-yellow)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
                <span className="badge-neo font-tech" style={{ backgroundColor: '#ffffff', alignSelf: 'flex-start' }}>
                  {selected.tag} · {selected.date}
                </span>
                <h3>{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="modal-close-btn">
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-muted)' }}>
                {selected.body}
              </p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button onClick={() => setSelected(null)} className="btn-neo btn-accent" style={{ width: '100%', maxWidth: '20rem' }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
