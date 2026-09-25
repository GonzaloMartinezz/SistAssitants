import React from 'react';
import { Camera, Music2, PlayCircle, ExternalLink } from 'lucide-react';
import HorizontalScrollSection from '../common/HorizontalScrollSection';

const PLATFORM_ICON = {
  instagram: Camera,
  tiktok: Music2,
  youtube: PlayCircle,
};

const POSTS = [
  {
    id: 1,
    platform: 'instagram',
    emoji: '🥗',
    bg: 'var(--pastel-green)',
    tag: 'Reel',
    caption: 'Cómo armo mi plato post-entreno en 3 pasos: proteína, carbohidrato y color en el plato.',
    hashtags: '#nutricióndeportiva #postentreno #fuerza'
  },
  {
    id: 2,
    platform: 'instagram',
    emoji: '📊',
    bg: 'var(--pastel-blue)',
    tag: 'Carrusel',
    caption: '3 errores que veo todo el tiempo al armar una dieta "de internet" (y cómo evitarlos).',
    hashtags: '#mitosnutricionales #cienciaaplicada'
  },
  {
    id: 3,
    platform: 'tiktok',
    emoji: '💪',
    bg: 'var(--pastel-pink)',
    tag: 'Video',
    caption: 'Un día completo de comidas de un atleta de powerlifting en fase de volumen.',
    hashtags: '#loquecomoenundía #powerlifting'
  },
  {
    id: 4,
    platform: 'instagram',
    emoji: '🏆',
    bg: 'var(--pastel-yellow)',
    tag: 'Historia Destacada',
    caption: 'Resultado de Sofi tras 5 meses de asesoría: +8kg de fuerza en muscle-ups. ¡Vamos Sofi!',
    hashtags: '#resultadosreales #crossfit'
  },
  {
    id: 5,
    platform: 'youtube',
    emoji: '🎙️',
    bg: 'var(--pastel-peach)',
    tag: 'Video largo',
    caption: 'Charla completa: suplementación basada en evidencia para deportistas amateurs.',
    hashtags: '#suplementación #podcast'
  },
  {
    id: 6,
    platform: 'instagram',
    emoji: '🍳',
    bg: 'var(--pastel-blue)',
    tag: 'Reel',
    caption: 'Receta rápida: tortilla fit de claras para la cena post-entreno nocturno.',
    hashtags: '#recetasfit #cenaproteica'
  },
  {
    id: 7,
    platform: 'tiktok',
    emoji: '❓',
    bg: 'var(--pastel-green)',
    tag: 'Q&A en vivo',
    caption: 'Responde tus preguntas sobre timing de carbohidratos todos los jueves a las 19hs.',
    hashtags: '#preguntasyrespuestas #envivo'
  },
  {
    id: 8,
    platform: 'instagram',
    emoji: '🧬',
    bg: 'var(--pastel-pink)',
    tag: 'Carrusel',
    caption: 'Antropometría explicada: qué mide realmente un pliegue cutáneo y por qué importa más que la balanza.',
    hashtags: '#composicióncorporal #antropometría'
  }
];

export default function SocialPosts() {
  return (
    <section id="posts">
      <HorizontalScrollSection
        header={
          <>
            <span className="section-label" data-reveal>Contenido & Comunidad</span>
            <h2 className="section-title">posteos</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-muted)' }}>
              Un adelanto de lo último que comparto en redes: recetas, mitos que desarmo,
              resultados de mis alumnos y contenido educativo en video.
            </p>
            <a
              href="https://instagram.com/guada_nutrisalud"
              target="_blank"
              rel="noreferrer"
              className="btn-neo btn-accent"
              style={{ alignSelf: 'flex-start', fontSize: '0.75rem' }}
            >
              Ver feed completo <ExternalLink size={14} />
            </a>
          </>
        }
        trackClassName="posts-track"
      >
        {POSTS.map((post) => {
          const PlatformIcon = PLATFORM_ICON[post.platform];
          return (
            <div key={post.id} className="post-card">
              <div className="post-card-media" style={{ backgroundColor: post.bg }}>
                <div className="post-card-platform">
                  <PlatformIcon size={14} />
                </div>
                <span className="post-card-emoji">{post.emoji}</span>
                <span className="post-card-tag font-tech">{post.tag}</span>
              </div>
              <div className="post-card-body">
                <p className="post-card-caption">{post.caption}</p>
                <span className="post-card-hashtags">{post.hashtags}</span>
              </div>
            </div>
          );
        })}
      </HorizontalScrollSection>
    </section>
  );
}
