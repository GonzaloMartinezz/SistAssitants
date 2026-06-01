import React from 'react';

export default function Ticker() {
  const alerts = [
    { text: '¡CARLOS ORTIZ ROMPIÓ SU PR EN SENTADILLA: 165KG!', icon: '🏆' },
    { text: 'NUEVAS RUTINAS DE VOLUMEN DISPONIBLES EN EL PANEL', icon: '⚡' },
    { text: 'SOFÍA BENÍTEZ CLASIFICÓ AL REGIONAL DE CROSSFIT', icon: '🔥' },
    { text: 'AGENDA TU CONSULTA GRATIS — CUPOS LIMITADOS MAYO', icon: '📅' },
    { text: 'MARTÍN RUIZ TOP 3 EN MEN\'S PHYSIQUE NATURAL', icon: '🥇' },
    { text: 'NUEVO PROTOCOLO DE SUPLEMENTACIÓN PARA FUERZA', icon: '💊' },
    { text: '127+ ATLETAS CONFÍAN EN NUESTRO MÉTODO CIENTÍFICO', icon: '💪' },
    { text: 'PLAN DE DEFINICIÓN ESTÉTICA — TEMPORADA DE CUTTING', icon: '🔥' }
  ];

  const scrollItems = [...alerts, ...alerts, ...alerts];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-scroller">
        {scrollItems.map((item, index) => (
          <span key={index} className="ticker-item font-tech">
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
