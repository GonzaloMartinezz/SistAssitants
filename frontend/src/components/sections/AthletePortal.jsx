import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Calendar, Search, Sparkles, Dumbbell, Clipboard, Award, ShieldCheck, Clock, BookOpen } from 'lucide-react';

export default function AthletePortal({ recipes }) {
  const [email, setEmail] = useState('');
  const [patient, setPatient] = useState(null);
  const [plan, setPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Recipe details modal state
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const mealSlots = [
    { id: 'Desayuno', label: '🍳 Desayuno' },
    { id: 'PreEntreno', label: '⚡ Pre-Entreno' },
    { id: 'Almuerzo', label: '🥗 Almuerzo / Comida' },
    { id: 'Merienda', label: '🍿 Merienda / Snack' },
    { id: 'PostEntreno', label: '🔥 Post-Entreno' },
    { id: 'Cena', label: '🥩 Cena' },
    { id: 'Colacion', label: '🍨 Colación Extra' }
  ];

  const handleSearchPlan = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage('');
    setSearched(true);
    
    try {
      const allPatients = await api.getPatients();
      const found = allPatients.find(p => p.email.toLowerCase().trim() === email.toLowerCase().trim());
      
      if (!found) {
        setPatient(null);
        setPlan(null);
        setErrorMessage('No encontramos ningún expediente asociado a este correo. Por favor, asegúrate de escribirlo correctamente o pídele a Guada Martínez que te dé de alta en su sistema.');
      } else {
        setPatient(found);
        const patientId = found._id || found.id;
        const patientPlan = await api.getWeeklyPlan(patientId);
        setPlan(patientPlan);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Ocurrió un error al consultar tu plan en la base de datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSearch = () => {
    setPatient(null);
    setPlan(null);
    setSearched(false);
    setEmail('');
    setErrorMessage('');
  };

  // Helper to sum macros for a given day in the plan
  const calculateDayMacros = (day) => {
    const dayData = plan?.days?.[day];
    const totals = { cals: 0, protein: 0, carbs: 0, fats: 0 };
    if (!dayData) return totals;

    mealSlots.forEach(slot => {
      const slotData = dayData[slot.id];
      if (slotData && slotData.recipes) {
        slotData.recipes.forEach(r => {
          // Resolve full recipe details if it's stored as ID
          let rData = typeof r === 'object' ? r : recipes.find(rec => (rec._id === r || rec.id === r));
          if (rData) {
            totals.cals += rData.cals || 0;
            totals.protein += rData.protein || 0;
            totals.carbs += rData.carbs || 0;
            totals.fats += rData.fats || 0;
          }
        });
      }
    });

    return totals;
  };

  const getPercent = (current, target) => {
    if (!target) return 0;
    return Math.min(100, Math.round((current / target) * 100));
  };

  const activeDayMacros = plan ? calculateDayMacros(selectedDay) : { cals: 0, protein: 0, carbs: 0, fats: 0 };
  const targetMacros = patient ? patient.macros : { cals: 2000, protein: 130, carbs: 220, fats: 60 };

  return (
    <section id="athlete-portal" className="section-container" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* Portal Header */}
      <div className="flex flex-col text-left select-none">
        <span className="section-label">Portal Privado de Alumnos</span>
        <h2 className="section-title">
          mi plan de élite
        </h2>
      </div>

      {!patient ? (
        /* Email Search State */
        <div 
          style={{
            border: '3px solid var(--color-dark)',
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
            backgroundColor: 'var(--pastel-blue)',
            boxShadow: '6px 6px 0px var(--color-dark)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxWidth: '650px',
            margin: '0 auto',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="sidebar-icon-pad" style={{ backgroundColor: '#ffffff', padding: '0.6rem' }}>
              <Award size={28} />
            </div>
            <div>
              <span className="font-tech text-xs font-bold uppercase opacity-85">Asesoría Guadalupe Martínez</span>
              <h3 className="font-display text-2xl font-black leading-tight mt-0.5">
                Ingresa para ver tus planes
              </h3>
            </div>
          </div>

          <p className="font-sans" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-dark)', opacity: 0.9 }}>
            Si eres alumno activo, ingresa tu correo electrónico registrado para descargar tu plan semanal personalizado de alimentación, suplementación inteligente y tu rutina de ejercicio físico diaria.
          </p>

          <form onSubmit={handleSearchPlan} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <input 
              type="email" 
              required 
              placeholder="tu-correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-neo font-tech"
              style={{ flex: 1, minWidth: '240px', fontWeight: 'bold' }}
            />
            <button 
              type="submit" 
              className="btn-neo btn-accent font-tech"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              disabled={loading}
            >
              <Search size={16} />
              {loading ? 'Consultando...' : 'Ver Mi Plan ⚡'}
            </button>
          </form>

          {errorMessage && (
            <div style={{ display: 'flex', gap: '0.5rem', border: '2px solid var(--color-dark)', padding: '1rem', borderRadius: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c' }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <p className="font-tech" style={{ fontSize: '0.8rem', fontWeight: 'bold', lineHeight: 1.4 }}>
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Loaded Patient Plan State */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Welcome Patient Card */}
          <div 
            style={{
              border: '3px solid var(--color-dark)',
              borderRadius: '1.5rem',
              padding: '1.5rem 2rem',
              backgroundColor: 'var(--pastel-peach)',
              boxShadow: '4px 4px 0px var(--color-dark)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              textAlign: 'left'
            }}
          >
            <div>
              <span className="badge-neo font-tech" style={{ backgroundColor: 'var(--color-dark)', color: '#ffffff', border: 'none', fontSize: '0.65rem' }}>
                ATLETA DE ALTO RENDIMIENTO
              </span>
              <h3 className="font-display" style={{ fontWeight: '900', fontSize: '1.75rem', marginTop: '0.25rem' }}>
                ¡Hola, {patient.name}!
              </h3>
              <p className="font-tech" style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-muted)', marginTop: '0.1rem' }}>
                Disciplina: {patient.sport} • Objetivo: {patient.target} • Frecuencia: {patient.trainingFrequency} entrenamientos/semana
              </p>
            </div>
            
            <button 
              onClick={handleResetSearch}
              className="btn-neo"
              style={{ backgroundColor: '#ffffff', fontSize: '0.75rem', padding: '0.5rem 1rem' }}
            >
              Salir de Mi Plan ✕
            </button>
          </div>

          {/* Core Portal Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }} className="admin-grid">
            
            {/* Left Column: Days Selector & Targets Dashboard */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Days Picker Row */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)', textAlign: 'left' }}>DÍA DE TU PLANIFICACIÓN:</span>
                {daysOfWeek.map((day) => {
                  const isActive = selectedDay === day;
                  const dMacros = calculateDayMacros(day);
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className="sidebar-item-btn"
                      style={{
                        backgroundColor: isActive ? 'var(--pastel-yellow)' : '#ffffff',
                        borderColor: isActive ? 'var(--color-dark)' : 'rgba(17, 17, 17, 0.4)',
                        transform: isActive ? 'translate(-2px, -2px)' : 'none',
                        boxShadow: isActive ? '4px 4px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)',
                        padding: '0.6rem 0.8rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span className="font-tech" style={{ fontWeight: 'bold' }}>{day}</span>
                      <span className="font-tech" style={{ fontSize: '0.55rem', opacity: 0.8 }}>
                        🔥 {dMacros.cals} / {targetMacros.cals} kcal
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Patient macro goals target widget */}
              <div style={{ border: '3px solid var(--color-dark)', borderRadius: '1.5rem', padding: '1.25rem', backgroundColor: '#ffffff', boxShadow: '4px 4px 0px var(--color-dark)', textAlign: 'left' }}>
                <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} style={{ color: 'var(--kraft-brown)' }} /> Estado Diario del Plan
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                  
                  {/* Calories Progress */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                      <span className="font-tech">Calorías ({getPercent(activeDayMacros.cals, targetMacros.cals)}%)</span>
                      <span className="font-tech">{activeDayMacros.cals} / {targetMacros.cals} kcal</span>
                    </div>
                    <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${getPercent(activeDayMacros.cals, targetMacros.cals)}%`, backgroundColor: 'var(--pastel-peach)' }}></div>
                    </div>
                  </div>

                  {/* Proteins Progress */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                      <span className="font-tech" style={{ color: 'red' }}>Proteínas ({getPercent(activeDayMacros.protein, targetMacros.protein)}%)</span>
                      <span className="font-tech">{activeDayMacros.protein} / {targetMacros.protein}g</span>
                    </div>
                    <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${getPercent(activeDayMacros.protein, targetMacros.protein)}%`, backgroundColor: 'var(--pastel-pink)' }}></div>
                    </div>
                  </div>

                  {/* Carbs Progress */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                      <span className="font-tech" style={{ color: 'blue' }}>Carbohidratos ({getPercent(activeDayMacros.carbs, targetMacros.carbs)}%)</span>
                      <span className="font-tech">{activeDayMacros.carbs} / {targetMacros.carbs}g</span>
                    </div>
                    <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${getPercent(activeDayMacros.carbs, targetMacros.carbs)}%`, backgroundColor: 'var(--pastel-blue)' }}></div>
                    </div>
                  </div>

                  {/* Fats Progress */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                      <span className="font-tech" style={{ color: 'orange' }}>Grasas ({getPercent(activeDayMacros.fats, targetMacros.fats)}%)</span>
                      <span className="font-tech">{activeDayMacros.fats} / {targetMacros.fats}g</span>
                    </div>
                    <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${getPercent(activeDayMacros.fats, targetMacros.fats)}%`, backgroundColor: 'var(--pastel-green)' }}></div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Day Plan Contents (Meals + Exercise) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              
              {/* --- Plan de Ejercicio (Rutina) --- */}
              <div 
                style={{
                  border: '3px solid var(--color-dark)',
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  backgroundColor: 'var(--pastel-green)',
                  boxShadow: '4px 4px 0px var(--color-dark)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Dumbbell size={20} /> Rutina de Ejercicios del {selectedDay}
                </h4>
                
                {plan.days?.[selectedDay]?.Entrenamiento ? (
                  <p 
                    className="font-tech" 
                    style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 'bold', 
                      lineHeight: 1.6, 
                      color: 'var(--color-dark)',
                      whiteSpace: 'pre-line',
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    {plan.days[selectedDay].Entrenamiento}
                  </p>
                ) : (
                  <div style={{ border: '2px dashed rgba(17, 17, 17, 0.2)', padding: '1rem', borderRadius: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={16} />
                    <p className="font-tech text-xs" style={{ fontWeight: 'bold' }}>
                      Día de descanso muscular activo o movilidad regenerativa. ¡Buen relax! 🧘⚡
                    </p>
                  </div>
                )}
              </div>

              {/* --- Plan de Alimentación --- */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>
                  TU PLAN DE ALIMENTACIÓN:
                </span>

                {(() => {
                  const dayData = plan.days?.[selectedDay] || {};
                  let mealsShown = 0;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {mealSlots.map((slot) => {
                        const slotData = dayData[slot.id] || { text: '', recipes: [] };
                        const recipesInSlot = slotData.recipes || [];
                        
                        // Hide empty slots to keep user experience premium
                        if (!slotData.text && recipesInSlot.length === 0) return null;
                        mealsShown++;

                        return (
                          <div 
                            key={slot.id}
                            style={{
                              border: '3px solid var(--color-dark)',
                              borderRadius: '1rem',
                              padding: '1.25rem',
                              backgroundColor: '#ffffff',
                              boxShadow: '2px 2px 0px var(--color-dark)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem'
                            }}
                          >
                            <h5 className="font-display" style={{ fontWeight: '900', fontSize: '1rem' }}>
                              {slot.label}
                            </h5>
                            
                            {slotData.text && (
                              <p className="font-tech text-xs font-bold" style={{ color: 'var(--color-muted)', lineHeight: 1.4 }}>
                                💡 {slotData.text}
                              </p>
                            )}

                            {recipesInSlot.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                                {recipesInSlot.map((r, i) => {
                                  const rData = typeof r === 'object' ? r : recipes.find(rec => (rec._id === r || rec.id === r));
                                  if (!rData) return null;
                                  return (
                                    <button 
                                      key={rData._id || rData.id || i}
                                      onClick={() => setSelectedRecipe(rData)}
                                      className="badge-neo font-tech"
                                      style={{ 
                                        backgroundColor: 'var(--pastel-blue)', 
                                        border: '1.5px solid var(--color-dark)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        padding: '0.25rem 0.6rem',
                                        fontSize: '0.65rem',
                                        cursor: 'pointer',
                                        boxShadow: '1px 1px 0px var(--color-dark)'
                                      }}
                                    >
                                      📖 Ver Receta: {rData.title}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {mealsShown === 0 && (
                        <div style={{ border: '2px dashed rgba(17, 17, 17, 0.2)', padding: '2rem', borderRadius: '1rem', backgroundColor: '#ffffff', textAlign: 'center' }}>
                          <p className="font-tech text-xs" style={{ color: 'var(--color-muted)', fontWeight: 'bold' }}>
                            No hay comidas específicas programadas para hoy. Sigue tu guía de alimentación basal.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Suplementación & Notas */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="admin-grid">
                
                {plan.days?.[selectedDay]?.Suplementacion && (
                  <div style={{ border: '3px solid var(--color-dark)', borderRadius: '1rem', padding: '1.25rem', backgroundColor: '#ffffff', boxShadow: '2px 2px 0px var(--color-dark)' }}>
                    <h5 className="font-display" style={{ fontWeight: '900', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      💊 Suplementación Deportiva
                    </h5>
                    <p className="font-tech text-xs font-bold text-amber-700" style={{ lineHeight: 1.4 }}>
                      {plan.days[selectedDay].Suplementacion}
                    </p>
                  </div>
                )}

                {plan.days?.[selectedDay]?.Notas && (
                  <div style={{ border: '3px solid var(--color-dark)', borderRadius: '1rem', padding: '1.25rem', backgroundColor: '#ffffff', boxShadow: '2px 2px 0px var(--color-dark)' }}>
                    <h5 className="font-display" style={{ fontWeight: '900', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      📝 Indicaciones Clínicas
                    </h5>
                    <p className="font-tech text-xs font-bold text-amber-700" style={{ lineHeight: 1.4 }}>
                      {plan.days[selectedDay].Notas}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* --- Recipe Details Modal Popup Overlay --- */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div 
            className="modal-card modal-card-wide" 
            onClick={(e) => e.stopPropagation()}
            style={{ textAlign: 'left', border: '3px solid var(--color-dark)', borderRadius: '1.5rem', boxShadow: '6px 6px 0px var(--color-dark)' }}
          >
            <div className="modal-header" style={{ backgroundColor: 'var(--pastel-pink)' }}>
              <div>
                <span className="font-tech text-xs font-bold uppercase" style={{ color: 'var(--kraft-brown)' }}>
                  📖 Receta Saludable de Guada
                </span>
                <h3 className="font-display text-2xl font-black mt-0.5">{selectedRecipe.title}</h3>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="modal-close-btn font-tech font-bold">
                Cerrar ✕
              </button>
            </div>

            <div className="modal-body" style={{ backgroundColor: 'var(--bg-cream)', padding: '1.5rem' }}>
              <p className="font-sans" style={{ fontStyle: 'italic', fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-muted)' }}>
                "{selectedRecipe.desc}"
              </p>

              {/* Recipe statistics row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.35rem', textAlign: 'center' }}>
                <div style={{ border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem', backgroundColor: '#ffffff' }}>
                  <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', fontWeight: 'bold' }}>TIEMPO</span>
                  <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                    <Clock size={10} /> {selectedRecipe.time}m
                  </span>
                </div>
                <div style={{ border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem', backgroundColor: '#ffffff' }}>
                  <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', fontWeight: 'bold' }}>ENERGÍA</span>
                  <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedRecipe.cals} kcal</span>
                </div>
                <div style={{ border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem', backgroundColor: '#ffffff' }}>
                  <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', color: 'red', fontWeight: 'bold' }}>PROT</span>
                  <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedRecipe.protein}g</span>
                </div>
                <div style={{ border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem', backgroundColor: '#ffffff' }}>
                  <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', color: 'blue', fontWeight: 'bold' }}>CARBS</span>
                  <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedRecipe.carbs}g</span>
                </div>
                <div style={{ border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem', backgroundColor: '#ffffff' }}>
                  <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', color: 'orange', fontWeight: 'bold' }}>GRASAS</span>
                  <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedRecipe.fats}g</span>
                </div>
              </div>

              {/* Ingredients & Steps rows */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }} className="admin-grid">
                <div>
                  <h4 className="font-display" style={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px dashed var(--color-dark)', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                    🛒 Ingredientes
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', fontFamily: 'var(--font-tech)', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {selectedRecipe.ingredients?.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display" style={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px dashed var(--color-dark)', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                    👨‍🍳 Preparación Paso a Paso
                  </h4>
                  <ol style={{ paddingLeft: '1.2rem', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: '600', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedRecipe.steps?.map((step, idx) => (
                      <li key={idx} style={{ lineHeight: 1.4 }}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
