import React, { useState, useEffect } from 'react';
import { Flame, Dumbbell, Activity, Apple } from 'lucide-react';

export default function Calculator() {
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(25);
  const [sport, setSport] = useState('gym'); // gym, crossfit, cardio
  const [goal, setGoal] = useState('muscle'); // muscle, cut, recomposition
  const [calories, setCalories] = useState(2800);
  const [macros, setMacros] = useState({ protein: 150, carbs: 320, fats: 70 });

  useEffect(() => {
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5; 
    let activityMultiplier = 1.375; 
    if (sport === 'crossfit') activityMultiplier = 1.55;
    if (sport === 'gym') activityMultiplier = 1.45;

    let tdee = Math.round(bmr * activityMultiplier);

    let targetCal = tdee;
    let pRatio = 2.0; 
    let fRatio = 0.9; 
    
    if (goal === 'muscle') {
      targetCal = tdee + 350; 
      pRatio = 2.2;
      fRatio = 1.0;
    } else if (goal === 'cut') {
      targetCal = tdee - 450; 
      pRatio = 2.4; 
      fRatio = 0.8;
    } else {
      targetCal = tdee; 
      pRatio = 2.2;
      fRatio = 0.9;
    }

    const proteinGram = Math.round(weight * pRatio);
    const fatGram = Math.round(weight * fRatio);
    
    let carbCal = targetCal - (proteinGram * 4 + fatGram * 9);
    if (carbCal < 0) carbCal = 100 * 4; 
    const carbGram = Math.round(carbCal / 4);

    setCalories(targetCal);
    setMacros({ protein: proteinGram, carbs: carbGram, fats: fatGram });

  }, [weight, height, age, sport, goal]);

  const totalGrams = macros.protein + macros.carbs + macros.fats;
  const pPct = Math.round((macros.protein / totalGrams) * 100);
  const cPct = Math.round((macros.carbs / totalGrams) * 100);
  const fPct = Math.round((macros.fats / totalGrams) * 100);

  return (
    <section id="calculator" className="workflow-section">
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Title */}
        <div className="flex flex-col text-left select-none">
          <span className="section-label">Combustible y Macros</span>
          <h2 className="section-title">
            calculadora deportista
          </h2>
        </div>

        {/* Calculator Grid */}
        <div className="calculator-grid">
          
          {/* Left Block form */}
          <div className="calc-form-card">
            
            {/* Weight Slider */}
            <div className="calc-input-group">
              <div className="calc-input-label-row">
                <span>PESO CORPORAL</span>
                <span style={{ color: '#b45309', fontSize: '1.1rem' }}>{weight} KG</span>
              </div>
              <input 
                type="range" 
                min="45" 
                max="140" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                className="calc-slider"
              />
            </div>

            {/* Height Slider */}
            <div className="calc-input-group">
              <div className="calc-input-label-row">
                <span>ESTATURA</span>
                <span style={{ color: '#b45309', fontSize: '1.1rem' }}>{height} CM</span>
              </div>
              <input 
                type="range" 
                min="130" 
                max="210" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="calc-slider"
              />
            </div>

            {/* Age Slider */}
            <div className="calc-input-group">
              <div className="calc-input-label-row">
                <span>EDAD</span>
                <span style={{ color: '#b45309', fontSize: '1.1rem' }}>{age} AÑOS</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="75" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))}
                className="calc-slider"
              />
            </div>

            {/* Sport Select Toggle grid */}
            <div className="calc-input-group">
              <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.75rem', color: 'var(--color-muted)' }}>DISCIPLINA DEPORTIVA</label>
              <div className="calc-btn-grid">
                {[
                  { id: 'gym', label: 'Gimnasio', icon: Dumbbell, color: 'var(--pastel-pink)' },
                  { id: 'crossfit', label: 'Crossfit', icon: Activity, color: 'var(--pastel-blue)' },
                  { id: 'cardio', label: 'Running', icon: Flame, color: 'var(--pastel-green)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSport(item.id)}
                    className="calc-toggle-btn"
                    style={{
                      backgroundColor: sport === item.id ? item.color : '#ffffff',
                      transform: sport === item.id ? 'translate(-1.5px, -1.5px)' : 'none',
                      boxShadow: sport === item.id ? '3px 3px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)'
                    }}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Select Toggle grid */}
            <div className="calc-input-group">
              <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.75rem', color: 'var(--color-muted)' }}>META DE RENDIMIENTO</label>
              <div className="calc-btn-grid">
                {[
                  { id: 'muscle', label: 'Ganar Masa', color: 'var(--pastel-yellow)' },
                  { id: 'cut', label: 'Definición', color: 'var(--pastel-green)' },
                  { id: 'recomp', label: 'Recomposic.', color: 'var(--pastel-peach)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    className="calc-toggle-btn"
                    style={{
                      backgroundColor: goal === item.id ? item.color : '#ffffff',
                      transform: goal === item.id ? 'translate(-1.5px, -1.5px)' : 'none',
                      boxShadow: goal === item.id ? '3px 3px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)'
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Block results representation */}
          <div className="calc-results-card">
            
            {/* Calories main badge */}
            <div className="calc-calories-block">
              <div>
                <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>Calorías Diarias Recomendadas</span>
                <div className="calc-calories-num">
                  {calories} <span className="calc-calories-sub">kcal</span>
                </div>
              </div>
              <div className="badge-neo font-tech" style={{ backgroundColor: 'var(--pastel-blue)', rotate: '4deg', fontSize: '0.65rem' }}>
                ⚡ ENERGÍA DE RENDIMIENTO
              </div>
            </div>

            {/* Macros numbers grid */}
            <div className="calc-macros-grid">
              <div className="calc-macro-box">
                <span className="calc-macro-label">PROTEÍNA (2.2g)</span>
                <span className="calc-macro-num" style={{ color: 'var(--kraft-brown)' }}>{macros.protein}G</span>
                <div className="badge-neo" style={{ backgroundColor: 'var(--pastel-pink)', fontSize: '0.55rem', border: 'none' }}>{pPct}% cal</div>
              </div>

              <div className="calc-macro-box">
                <span className="calc-macro-label">CARBOS (Timing)</span>
                <span className="calc-macro-num" style={{ color: '#b45309' }}>{macros.carbs}G</span>
                <div className="badge-neo" style={{ backgroundColor: 'var(--pastel-blue)', fontSize: '0.55rem', border: 'none' }}>{cPct}% cal</div>
              </div>

              <div className="calc-macro-box">
                <span className="calc-macro-label">GRASAS (Salud)</span>
                <span className="calc-macro-num" style={{ color: 'var(--kraft-brown)' }}>{macros.fats}G</span>
                <div className="badge-neo" style={{ backgroundColor: 'var(--pastel-green)', fontSize: '0.55rem', border: 'none' }}>{fPct}% cal</div>
              </div>
            </div>

            {/* Daily Timing Timeline Schedule */}
            <div className="calc-timing-box">
              <h4 className="calc-timing-title">
                <Apple size={18} style={{ color: '#b45309' }} /> Estructura de Alimentación Recomendada:
              </h4>

              <div className="calc-timing-list">
                <div className="calc-timing-item timing-border-pre">
                  <span className="timing-label" style={{ color: 'var(--kraft-brown)' }}>Pre-Entreno:</span>
                  <span>Carbohidratos rápidos y complejos ({Math.round(macros.carbs * 0.35)}g) + 30g de proteína para cargar el glucógeno muscular.</span>
                </div>
                <div className="calc-timing-item timing-border-post">
                  <span className="timing-label" style={{ color: '#b45309' }}>Post-Entreno:</span>
                  <span>Proteína de rápida digestión ({Math.round(macros.protein * 0.3)}g) + {Math.round(macros.carbs * 0.25)}g de carbohidratos para disparar la síntesis y recuperación.</span>
                </div>
                <div className="calc-timing-item timing-border-supp">
                  <span className="timing-label" style={{ color: 'var(--kraft-brown)' }}>Suplementación:</span>
                  <span>5g Creatina Monohidratada diario + electrolitos durante tus series de alta demanda.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
