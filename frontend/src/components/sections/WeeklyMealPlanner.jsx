import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Calendar, Plus, Sparkles, Clipboard, CheckCircle2, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';

export default function WeeklyMealPlanner({ patient, recipes }) {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Track active slot being edited for recipe selection
  const [activeSlotForRecipe, setActiveSlotForRecipe] = useState(null); // 'Desayuno', 'PreEntreno', etc.

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

  // Fetch plan when patient changes
  useEffect(() => {
    if (!patient) return;
    
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const patientId = patient._id || patient.id;
        const data = await api.getWeeklyPlan(patientId);
        setPlan(data);
      } catch (error) {
        console.error('Error fetching plan', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [patient]);

  if (!patient) {
    return (
      <div style={{ border: '3px dashed rgba(17, 17, 17, 0.3)', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <Calendar size={48} style={{ color: 'var(--color-muted)', marginBottom: '1rem' }} />
        <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1.25rem' }}>Planificador Semanal Inteligente</h4>
        <p className="font-tech" style={{ fontSize: '0.8rem', color: 'var(--color-muted)', maxWidth: '300px', marginTop: '0.5rem' }}>
          Selecciona un paciente en la pestaña de <strong>Expedientes Pacientes</strong> para estructurar y calendarizar su plan alimentario semanal de alto rendimiento.
        </p>
      </div>
    );
  }

  // Helper to handle text changes in meal slots
  const handleSlotTextChange = (day, slot, val) => {
    if (!plan) return;
    const updatedDays = { ...plan.days };
    if (!updatedDays[day]) updatedDays[day] = {};
    if (!updatedDays[day][slot]) updatedDays[day][slot] = { text: '', recipes: [] };
    
    updatedDays[day][slot] = {
      ...updatedDays[day][slot],
      text: val
    };

    setPlan({ ...plan, days: updatedDays });
  };

  // Helper to handle suplementacion/notas changes
  const handleExtraChange = (day, field, val) => {
    if (!plan) return;
    const updatedDays = { ...plan.days };
    if (!updatedDays[day]) updatedDays[day] = {};
    updatedDays[day][field] = val;

    setPlan({ ...plan, days: updatedDays });
  };

  // Helper to toggle a recipe in a meal slot
  const toggleRecipeInSlot = (day, slot, recipe) => {
    if (!plan) return;
    const updatedDays = { ...plan.days };
    if (!updatedDays[day]) updatedDays[day] = {};
    if (!updatedDays[day][slot]) updatedDays[day][slot] = { text: '', recipes: [] };

    const currentRecipes = updatedDays[day][slot].recipes || [];
    const recipeId = recipe._id || recipe.id;
    
    // Check if already exists (handles populated object or plain id string)
    const existsIndex = currentRecipes.findIndex(r => {
      const id = typeof r === 'string' ? r : (r._id || r.id);
      return id === recipeId;
    });

    let newRecipes = [...currentRecipes];
    if (existsIndex > -1) {
      newRecipes.splice(existsIndex, 1);
    } else {
      newRecipes.push(recipe); // Guardar objeto completo local para cálculos inmediatos
    }

    updatedDays[day][slot] = {
      ...updatedDays[day][slot],
      recipes: newRecipes
    };

    setPlan({ ...plan, days: updatedDays });
  };

  // Calculate day macros
  const calculateDayMacros = (day) => {
    const dayData = plan?.days?.[day];
    const totals = { cals: 0, protein: 0, carbs: 0, fats: 0 };
    if (!dayData) return totals;

    mealSlots.forEach(slot => {
      const slotData = dayData[slot.id];
      if (slotData && slotData.recipes) {
        slotData.recipes.forEach(r => {
          if (r && typeof r === 'object') {
            totals.cals += r.cals || 0;
            totals.protein += r.protein || 0;
            totals.carbs += r.carbs || 0;
            totals.fats += r.fats || 0;
          }
        });
      }
    });

    return totals;
  };

  const handleSavePlan = async () => {
    setSaving(true);
    try {
      const patientId = patient._id || patient.id;
      
      // Map recipes to IDs before saving to database (so Mongoose saves references correctly)
      const daysToSave = {};
      Object.keys(plan.days).forEach(dayKey => {
        daysToSave[dayKey] = { ...plan.days[dayKey] };
        mealSlots.forEach(slot => {
          const slotData = daysToSave[dayKey][slot.id];
          if (slotData && slotData.recipes) {
            daysToSave[dayKey][slot.id] = {
              ...slotData,
              recipes: slotData.recipes.map(r => typeof r === 'string' ? r : (r._id || r.id))
            };
          }
        });
      });

      const updated = await api.saveWeeklyPlan(patientId, daysToSave);
      
      // Refresh local state with populated data
      setPlan(updated);
      alert('¡Planificación semanal guardada y sincronizada en MongoDB con éxito! ⚡🍃');
    } catch (error) {
      console.error('Error saving plan', error);
      alert('Ocurrió un error al guardar el plan semanal.');
    } finally {
      setSaving(false);
    }
  };

  const dayTotals = calculateDayMacros(selectedDay);
  const targetMacros = patient.macros || { cals: 2000, protein: 130, carbs: 220, fats: 60 };

  // Macro progress calculations
  const getPercent = (current, target) => {
    if (!target) return 0;
    return Math.min(100, Math.round((current / target) * 100));
  };

  return (
    <div className="console-form" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top bar with actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="sidebar-icon-pad" style={{ backgroundColor: 'var(--pastel-green)', padding: '0.5rem' }}>
            <Calendar size={20} />
          </div>
          <div>
            <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>
              PLANIFICADOR SEMANAL ACTIVO
            </span>
            <h3 className="font-display" style={{ fontWeight: '900', fontSize: '1.25rem', lineHeight: 1.1 }}>
              Plan Nutricional: {patient.name}
            </h3>
          </div>
        </div>

        <button 
          onClick={handleSavePlan}
          disabled={saving || !plan}
          className="btn-neo btn-accent"
          style={{ padding: '0.6rem 1.2rem', transform: 'rotate(-1deg)' }}
        >
          {saving ? 'Guardando en DB...' : 'Guardar Plan Semanal ⚡'}
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <span className="font-tech" style={{ fontWeight: 'bold' }}>Cargando planificación de MongoDB... 📥</span>
        </div>
      ) : !plan ? (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <span className="font-tech" style={{ fontWeight: 'bold', color: 'red' }}>Error al estructurar el plan semanal.</span>
        </div>
      ) : (
        <div className="responsive-grid-split">
          
          {/* Left Sub-Column: Day Picker & Macro Dashboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Days picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>DÍAS DE CARGA:</span>
              {daysOfWeek.map((day) => {
                const isActive = selectedDay === day;
                const dMacros = calculateDayMacros(day);
                return (
                  <button
                    key={day}
                    onClick={() => { setSelectedDay(day); setActiveSlotForRecipe(null); }}
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
                    <span>{day}</span>
                    <span className="font-tech" style={{ fontSize: '0.55rem', opacity: 0.8 }}>
                      🔥 {dMacros.cals} kcal
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Day Macro tracker widget */}
            <div style={{ border: '3px solid var(--color-dark)', borderRadius: '1rem', padding: '1rem', backgroundColor: '#ffffff', boxShadow: '3px 3px 0px var(--color-dark)' }}>
              <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={14} style={{ color: 'var(--kraft-brown)' }} /> Macros de {selectedDay}
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                
                {/* Calories Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                    <span className="font-tech">Calorías ({getPercent(dayTotals.cals, targetMacros.cals)}%)</span>
                    <span className="font-tech">{dayTotals.cals} / {targetMacros.cals} kcal</span>
                  </div>
                  <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${getPercent(dayTotals.cals, targetMacros.cals)}%`, backgroundColor: 'var(--pastel-peach)' }}></div>
                  </div>
                </div>

                {/* Protein Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                    <span className="font-tech" style={{ color: 'red' }}>Proteínas ({getPercent(dayTotals.protein, targetMacros.protein)}%)</span>
                    <span className="font-tech">{dayTotals.protein} / {targetMacros.protein}g</span>
                  </div>
                  <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${getPercent(dayTotals.protein, targetMacros.protein)}%`, backgroundColor: 'var(--pastel-pink)' }}></div>
                  </div>
                </div>

                {/* Carbs Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                    <span className="font-tech" style={{ color: 'blue' }}>Carbohidratos ({getPercent(dayTotals.carbs, targetMacros.carbs)}%)</span>
                    <span className="font-tech">{dayTotals.carbs} / {targetMacros.carbs}g</span>
                  </div>
                  <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${getPercent(dayTotals.carbs, targetMacros.carbs)}%`, backgroundColor: 'var(--pastel-blue)' }}></div>
                  </div>
                </div>

                {/* Fats Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold' }}>
                    <span className="font-tech" style={{ color: 'orange' }}>Grasas ({getPercent(dayTotals.fats, targetMacros.fats)}%)</span>
                    <span className="font-tech">{dayTotals.fats} / {targetMacros.fats}g</span>
                  </div>
                  <div style={{ height: '0.8rem', border: '2px solid var(--color-dark)', borderRadius: '4px', backgroundColor: 'var(--bg-cream)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${getPercent(dayTotals.fats, targetMacros.fats)}%`, backgroundColor: 'var(--pastel-green)' }}></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Sub-Column: Meals Slots & Recipe Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Meal Slots List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>
                DISTRIBUCIÓN DE COMIDAS PARA EL {selectedDay.toUpperCase()}:
              </span>
              
              {mealSlots.map((slot) => {
                const dayPlan = plan.days?.[selectedDay] || {};
                const slotData = dayPlan[slot.id] || { text: '', recipes: [] };
                const currentSlotRecipes = slotData.recipes || [];

                return (
                  <div 
                    key={slot.id}
                    style={{
                      border: '3px solid var(--color-dark)',
                      borderRadius: '1rem',
                      padding: '1.25rem',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '2px 2px 0px var(--color-dark)'
                    }}
                  >
                    {/* Slot Title Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1rem' }}>
                        {slot.label}
                      </h4>
                      <button
                        onClick={() => setActiveSlotForRecipe(activeSlotForRecipe === slot.id ? null : slot.id)}
                        className="btn-neo"
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.65rem',
                          backgroundColor: activeSlotForRecipe === slot.id ? 'var(--pastel-pink)' : 'var(--bg-cream)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <BookOpen size={10} />
                        {activeSlotForRecipe === slot.id ? 'Cerrar Recetas' : 'Vincular Receta 🥗'}
                      </button>
                    </div>

                    {/* Text instructions */}
                    <textarea
                      rows="2"
                      value={slotData.text || ''}
                      onChange={(e) => handleSlotTextChange(selectedDay, slot.id, e.target.value)}
                      placeholder="Ej. Consumir con un café negro. Priorizar hidratación..."
                      className="input-neo font-tech"
                      style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                    />

                    {/* Linked Recipes Tags List */}
                    {currentSlotRecipes.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {currentSlotRecipes.map((r, i) => {
                          const rData = typeof r === 'object' ? r : recipes.find(rec => (rec._id === r || rec.id === r));
                          if (!rData) return null;
                          return (
                            <span 
                              key={rData._id || rData.id || i}
                              className="badge-neo font-tech"
                              style={{ 
                                backgroundColor: 'var(--pastel-blue)', 
                                border: '1.5px solid var(--color-dark)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.15rem 0.5rem',
                                fontSize: '0.6rem'
                              }}
                            >
                              🥗 {rData.title} ({rData.cals} kcal)
                              <button 
                                type="button"
                                onClick={() => toggleRecipeInSlot(selectedDay, slot.id, rData)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.65rem', marginLeft: '0.2rem' }}
                              >
                                ✕
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Interactive Recipe selection dropdown list for this specific slot */}
                    {activeSlotForRecipe === slot.id && (
                      <div 
                        style={{
                          border: '2px solid var(--color-dark)',
                          borderRadius: '0.75rem',
                          padding: '0.75rem',
                          backgroundColor: 'var(--bg-cream)',
                          marginTop: '0.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}
                      >
                        <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>
                          SELECCIONA LAS RECETAS A VINCULAR DE TU BASE DE DATOS:
                        </span>
                        
                        {recipes.length === 0 ? (
                          <p className="font-tech" style={{ fontSize: '0.65rem', color: 'var(--color-muted)' }}>
                            No hay recetas disponibles en el catálogo. Cárgalas en la pestaña "Cargar Receta".
                          </p>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', maxHeight: '150px', overflowY: 'auto' }}>
                            {recipes.map((recipe) => {
                              const rId = recipe._id || recipe.id;
                              const isAttached = currentSlotRecipes.some(r => {
                                const id = typeof r === 'string' ? r : (r._id || r.id);
                                return id === rId;
                              });

                              return (
                                <button
                                  key={rId}
                                  type="button"
                                  onClick={() => toggleRecipeInSlot(selectedDay, slot.id, recipe)}
                                  className="time-slot-btn"
                                  style={{
                                    textAlign: 'left',
                                    fontSize: '0.65rem',
                                    padding: '0.4rem 0.6rem',
                                    justifyContent: 'space-between',
                                    backgroundColor: isAttached ? 'var(--pastel-pink)' : '#ffffff',
                                    borderColor: isAttached ? 'var(--color-dark)' : 'rgba(17, 17, 17, 0.2)'
                                  }}
                                >
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 'bold' }}>{recipe.title}</span>
                                    <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>
                                      P: {recipe.protein}g | C: {recipe.carbs}g | G: {recipe.fats}g
                                    </span>
                                  </div>
                                  <span style={{ fontWeight: '900' }}>{isAttached ? '✓' : '+'}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Plan de Ejercicio / Rutina de Entrenamiento */}
            <div 
              style={{
                border: '3px solid var(--color-dark)',
                borderRadius: '1rem',
                padding: '1.25rem',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: '2px 2px 0px var(--color-dark)',
                marginBottom: '1rem'
              }}
            >
              <h4 className="font-display" style={{ fontWeight: '900', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                🏋️ Plan de Ejercicio / Rutina del {selectedDay}
              </h4>
              <textarea
                rows="3"
                value={plan.days?.[selectedDay]?.Entrenamiento || ''}
                onChange={(e) => handleExtraChange(selectedDay, 'Entrenamiento', e.target.value)}
                placeholder="Ej. Sentadilla trasera con barra: 4 x 6 reps RPE 8. Prensa de piernas: 3 x 12 reps. Zancadas caminando: 3 x 10 por pierna..."
                className="input-neo font-tech"
                style={{ fontSize: '0.75rem', padding: '0.5rem' }}
              />
            </div>

            {/* Suplementacion and Notas */}
            <div className="responsive-grid-half">
              
              <div 
                style={{
                  border: '3px solid var(--color-dark)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: '2px 2px 0px var(--color-dark)'
                }}
              >
                <h4 className="font-display" style={{ fontWeight: '900', fontSize: '0.95rem' }}>
                  💊 Suplementación Deportiva
                </h4>
                <textarea
                  rows="2"
                  value={plan.days?.[selectedDay]?.Suplementacion || ''}
                  onChange={(e) => handleExtraChange(selectedDay, 'Suplementacion', e.target.value)}
                  placeholder="Ej. 5g Creatina Monohidratada + 1 scoop Whey Protein en ayunas..."
                  className="input-neo font-tech"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                />
              </div>

              <div 
                style={{
                  border: '3px solid var(--color-dark)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: '2px 2px 0px var(--color-dark)'
                }}
              >
                <h4 className="font-display" style={{ fontWeight: '900', fontSize: '0.95rem' }}>
                  📝 Notas / Recomendación Carga
                </h4>
                <textarea
                  rows="2"
                  value={plan.days?.[selectedDay]?.Notas || ''}
                  onChange={(e) => handleExtraChange(selectedDay, 'Notas', e.target.value)}
                  placeholder="Ej. Día de piernas pesadas. Aumentar consumo de agua a 3.5 litros..."
                  className="input-neo font-tech"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                />
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
