import React, { useState } from 'react';
import { UserPlus, Dumbbell, Scale, Plus, Trash2, Calendar, TrendingUp, ChevronRight } from 'lucide-react';

export default function PatientManager({ 
  patients, 
  onAddPatient, 
  onDeletePatient, 
  onAddAnthropometry,
  selectedPatient,
  onSelectPatient 
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sport, setSport] = useState('Gimnasio');
  const [level, setLevel] = useState('Intermedio');
  const [trainingFrequency, setTrainingFrequency] = useState(4);
  const [target, setTarget] = useState('Hipertrofia');
  
  // Macros state
  const [cals, setCals] = useState(2400);
  const [protein, setProtein] = useState(150);
  const [carbs, setCarbs] = useState(250);
  const [fats, setFats] = useState(70);

  // New Anthropometry state
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');

  // Auto calculate recommended macros based on target & sport
  const handleAutoCalculate = () => {
    let baseCals = 2000;
    let pRatio = 2.0; // g/kg
    let fRatio = 1.0; // g/kg
    let estimatedWeight = 75; // weight default

    if (target === 'Hipertrofia') {
      baseCals = sport === 'Crossfit' ? 2800 : sport === 'Powerlifting' ? 3200 : 2700;
      pRatio = 2.2;
      fRatio = 1.1;
    } else if (target === 'Definición' || target === 'Cutting') {
      baseCals = sport === 'Crossfit' ? 2200 : 2000;
      pRatio = 2.4;
      fRatio = 0.8;
    } else if (target === 'Fuerza Máxima' || target === 'Powerlifting') {
      baseCals = 3300;
      pRatio = 2.0;
      fRatio = 1.2;
    } else if (target === 'Resistencia') {
      baseCals = 3000;
      pRatio = 1.6;
      fRatio = 1.0;
    }

    const calculatedProtein = Math.round(estimatedWeight * pRatio);
    const calculatedFats = Math.round(estimatedWeight * fRatio);
    const remainingCals = baseCals - (calculatedProtein * 4 + calculatedFats * 9);
    const calculatedCarbs = Math.max(50, Math.round(remainingCals / 4));

    setCals(baseCals);
    setProtein(calculatedProtein);
    setCarbs(calculatedCarbs);
    setFats(calculatedFats);
    alert('¡Macros sugeridos calculados en base a la disciplina y objetivo! ⚡');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const patientData = {
      name,
      email,
      phone,
      sport,
      level,
      trainingFrequency: Number(trainingFrequency),
      target,
      macros: {
        cals: Number(cals),
        protein: Number(protein),
        carbs: Number(carbs),
        fats: Number(fats)
      }
    };

    onAddPatient(patientData);
    
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setShowAddForm(false);
  };

  const handleAnthroSubmit = (e) => {
    e.preventDefault();
    if (!weight || !height || !bodyFat || !muscleMass || !selectedPatient) return;

    const record = {
      weight: Number(weight),
      height: Number(height),
      bodyFat: Number(bodyFat),
      muscleMass: Number(muscleMass)
    };

    onAddAnthropometry(selectedPatient._id || selectedPatient.id, record);
    
    // Reset
    setWeight('');
    setHeight('');
    setBodyFat('');
    setMuscleMass('');
    alert('¡Registro antropométrico añadido con éxito! 📊');
  };

  // Helper to calculate diff in progress
  const getProgressDiff = (patient) => {
    if (!patient.anthropometry || patient.anthropometry.length < 2) return null;
    const sorted = [...patient.anthropometry].sort((a, b) => new Date(a.date) - new Date(b.date));
    const first = sorted[0];
    const latest = sorted[sorted.length - 1];
    return {
      weightDiff: (latest.weight - first.weight).toFixed(1),
      fatDiff: (latest.bodyFat - first.bodyFat).toFixed(1),
      muscleDiff: (latest.muscleMass - first.muscleMass).toFixed(1)
    };
  };

  const diff = selectedPatient ? getProgressDiff(selectedPatient) : null;

  return (
    <div className="console-form" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header with button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="sidebar-icon-pad" style={{ backgroundColor: 'var(--pastel-blue)', padding: '0.5rem' }}>
            <UserPlus size={20} />
          </div>
          <h3 className="font-display" style={{ fontWeight: '900', fontSize: '1.25rem' }}>Gestión Integral de Atletas</h3>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-neo"
          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: showAddForm ? 'var(--pastel-pink)' : '#ffffff' }}
        >
          {showAddForm ? 'Cancelar Registro' : 'Registrar Nuevo Paciente 👤'}
        </button>
      </div>

      {/* Add Patient Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="admin-routine-item" style={{ borderStyle: 'dashed', padding: '2rem' }}>
          <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '1rem' }}>Crear Expediente de Deportista</h4>
          
          <div className="input-row-double">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>NOMBRE COMPLETO</label>
              <input type="text" required placeholder="Ej. Carlos Ortiz" value={name} onChange={(e) => setName(e.target.value)} className="input-neo" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>CORREO ELECTRÓNICO</label>
              <input type="email" required placeholder="carlos@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-neo" />
            </div>
          </div>

          <div className="input-row-double">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>TELÉFONO DE CONTACTO</label>
              <input type="tel" placeholder="+54 9 11 3333-4444" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-neo" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>DISCIPLINA DEPORTIVA</label>
              <select value={sport} onChange={(e) => setSport(e.target.value)} className="input-neo font-tech">
                <option value="Gimnasio">Gimnasio / Estética</option>
                <option value="Culturismo">Culturismo Natural</option>
                <option value="Powerlifting">Powerlifting / Fuerza</option>
                <option value="Crossfit">Crossfit / Funcional</option>
                <option value="Running">Running / Trail</option>
                <option value="Ciclismo">Ciclismo / Triatlón</option>
              </select>
            </div>
          </div>

          <div className="input-row-three" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>NIVEL ATLETA</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="input-neo font-tech">
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Élite">Élite / Profesional</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>SESIONES / SEMANA</label>
              <input type="number" required min="1" max="14" value={trainingFrequency} onChange={(e) => setTrainingFrequency(e.target.value)} className="input-neo font-tech" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>OBJETIVO CLÍNICO</label>
              <select value={target} onChange={(e) => setTarget(e.target.value)} className="input-neo font-tech">
                <option value="Hipertrofia">Ganancia Muscular</option>
                <option value="Definición">Definición & Pérdida Grasa</option>
                <option value="Fuerza Máxima">Fuerza Máxima (RPE Foco)</option>
                <option value="Resistencia">Mejora de Resistencia</option>
                <option value="Salud">Recomposición Saludable</option>
              </select>
            </div>
          </div>

          <div className="sidebar-divider" style={{ margin: '1rem 0', opacity: 0.2 }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h5 className="font-display" style={{ fontWeight: 'bold', fontSize: '1rem' }}>Planificación de Macronutrientes Diarios</h5>
            <button 
              type="button" 
              onClick={handleAutoCalculate}
              className="btn-neo"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.7rem', backgroundColor: 'var(--pastel-yellow)' }}
            >
              Calcular Macros de Élite ⚡
            </button>
          </div>

          <div className="input-row-five" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>CALORÍAS (KCAL)</span>
              <input type="number" required value={cals} onChange={(e) => setCals(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'red' }}>PROT (G)</span>
              <input type="number" required value={protein} onChange={(e) => setProtein(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'blue' }}>CARBOS (G)</span>
              <input type="number" required value={carbs} onChange={(e) => setCarbs(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'orange' }}>GRASAS (G)</span>
              <input type="number" required value={fats} onChange={(e) => setFats(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
            </div>
          </div>

          <button type="submit" className="btn-neo btn-accent" style={{ marginTop: '1.5rem', width: '100%' }}>
            Confirmar Registro & Inicializar Plan Semanal 👤⚡
          </button>
        </form>
      )}

      {/* Main List & Details Columns Grid */}
      <div style={{ minHeight: '350px' }} className="responsive-grid-split">
        
        {/* Left Column: Patients List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span className="font-tech" style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>SELECCIONA UN ATLETA:</span>
          {patients.length === 0 ? (
            <div style={{ border: '3px solid var(--color-dark)', padding: '2rem', borderRadius: '1rem', backgroundColor: '#ffffff', textAlign: 'center' }}>
              <p className="font-tech" style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>No hay pacientes registrados.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.25rem' }}>
              {patients.map((p) => {
                const isSelected = selectedPatient && (selectedPatient._id === p._id || selectedPatient.id === p.id);
                return (
                  <div
                    key={p._id || p.id}
                    onClick={() => onSelectPatient(p)}
                    className="admin-routine-item"
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--color-dark)' : 'rgba(17, 17, 17, 0.4)',
                      backgroundColor: isSelected ? 'var(--pastel-peach)' : '#ffffff',
                      transform: isSelected ? 'translate(-2px, -2px)' : 'none',
                      boxShadow: isSelected ? '4px 4px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem'
                    }}
                  >
                    <div>
                      <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1rem', lineHeight: 1.2 }}>{p.name}</h4>
                      <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>
                        {p.sport} • {p.target}
                      </span>
                    </div>
                    <ChevronRight size={16} style={{ opacity: isSelected ? 1 : 0.4 }} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Selected Patient Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {selectedPatient ? (
            <div className="console-form" style={{ padding: '1.5rem', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge-neo font-tech" style={{ backgroundColor: 'var(--pastel-blue)', fontSize: '0.6rem', border: 'none' }}>
                    {selectedPatient.level}
                  </span>
                  <h3 className="font-display" style={{ fontWeight: '900', fontSize: '1.5rem', marginTop: '0.25rem' }}>
                    {selectedPatient.name}
                  </h3>
                  <p className="font-tech" style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                    ✉️ {selectedPatient.email} {selectedPatient.phone && `• 📞 ${selectedPatient.phone}`}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    if (confirm(`¿Seguro que deseas eliminar el expediente de ${selectedPatient.name}? Esto borrará también su plan semanal.`)) {
                      onDeletePatient(selectedPatient._id || selectedPatient.id);
                    }
                  }}
                  className="btn-neo"
                  style={{ backgroundColor: 'var(--pastel-pink)', padding: '0.4rem' }}
                  title="Eliminar paciente"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Target Macros card */}
              <div style={{ border: '3px solid var(--color-dark)', borderRadius: '1rem', padding: '1rem', backgroundColor: 'var(--bg-cream)' }}>
                <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>METAS DIARIAS DE NUTRICIÓN</span>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '0.5rem', textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem' }}>
                    <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', fontWeight: 'bold' }}>ENERGÍA</span>
                    <span className="font-display" style={{ fontWeight: '900', fontSize: '1rem' }}>{selectedPatient.macros?.cals}</span>
                    <span className="font-tech" style={{ fontSize: '0.45rem', display: 'block', opacity: 0.6 }}>kcal</span>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem' }}>
                    <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', color: 'red', fontWeight: 'bold' }}>PROT</span>
                    <span className="font-display" style={{ fontWeight: '900', fontSize: '1rem' }}>{selectedPatient.macros?.protein}g</span>
                    <span className="font-tech" style={{ fontSize: '0.45rem', display: 'block', opacity: 0.6 }}>{Math.round(selectedPatient.macros?.protein * 4)} kcal</span>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem' }}>
                    <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', color: 'blue', fontWeight: 'bold' }}>CARBOS</span>
                    <span className="font-display" style={{ fontWeight: '900', fontSize: '1rem' }}>{selectedPatient.macros?.carbs}g</span>
                    <span className="font-tech" style={{ fontSize: '0.45rem', display: 'block', opacity: 0.6 }}>{Math.round(selectedPatient.macros?.carbs * 4)} kcal</span>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-dark)', borderRadius: '0.5rem', padding: '0.35rem' }}>
                    <span className="font-tech" style={{ fontSize: '0.55rem', display: 'block', color: 'orange', fontWeight: 'bold' }}>GRASAS</span>
                    <span className="font-display" style={{ fontWeight: '900', fontSize: '1rem' }}>{selectedPatient.macros?.fats}g</span>
                    <span className="font-tech" style={{ fontSize: '0.45rem', display: 'block', opacity: 0.6 }}>{Math.round(selectedPatient.macros?.fats * 9)} kcal</span>
                  </div>
                </div>
              </div>

              {/* Progress and Add Anthropometry */}
              <div className="responsive-grid-split">
                
                {/* Form to log anthro */}
                <form onSubmit={handleAnthroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>REGISTRAR ANTROPOMETRÍA</span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                    <input type="number" required step="0.1" placeholder="Peso (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-neo font-tech" style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem' }} />
                    <input type="number" required placeholder="Talla (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="input-neo font-tech" style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                    <input type="number" required step="0.1" placeholder="Grasa %" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} className="input-neo font-tech" style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem' }} />
                    <input type="number" required step="0.1" placeholder="Músculo %" value={muscleMass} onChange={(e) => setMuscleMass(e.target.value)} className="input-neo font-tech" style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem' }} />
                  </div>

                  <button type="submit" className="btn-neo btn-accent" style={{ padding: '0.4rem', fontSize: '0.7rem' }}>
                    Añadir Medición 📊
                  </button>
                </form>

                {/* History list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>HISTÓRICO Y PROGRESO</span>
                  
                  {(!selectedPatient.anthropometry || selectedPatient.anthropometry.length === 0) ? (
                    <div style={{ flex: 1, border: '2px dashed rgba(17, 17, 17, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#fdfdfd' }}>
                      <p className="font-tech" style={{ fontSize: '0.65rem', color: 'var(--color-muted)', textAlign: 'center' }}>No hay mediciones antropométricas aún.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto', paddingRight: '0.2rem' }}>
                      {[...selectedPatient.anthropometry].reverse().map((record, index) => (
                        <div 
                          key={record._id || index}
                          style={{
                            border: '2px solid var(--color-dark)',
                            borderRadius: '0.5rem',
                            padding: '0.4rem 0.6rem',
                            fontSize: '0.7rem',
                            backgroundColor: index === 0 ? 'var(--pastel-green)' : 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span className="font-tech" style={{ fontWeight: 'bold' }}>
                            {new Date(record.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="font-tech">
                            ⚖️ <strong>{record.weight}kg</strong>
                          </span>
                          <span className="font-tech">
                            🔥 {record.bodyFat}%
                          </span>
                          <span className="font-tech">
                            💪 {record.muscleMass}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Differential Progress Badges */}
                  {diff && (
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                      <span className="font-tech" style={{ fontSize: '0.55rem', fontWeight: 'bold', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid var(--color-dark)', backgroundColor: Number(diff.weightDiff) < 0 ? '#d1fae5' : '#fee2e2' }}>
                        Peso: {Number(diff.weightDiff) > 0 ? `+${diff.weightDiff}` : diff.weightDiff}kg
                      </span>
                      <span className="font-tech" style={{ fontSize: '0.55rem', fontWeight: 'bold', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid var(--color-dark)', backgroundColor: Number(diff.fatDiff) < 0 ? '#d1fae5' : '#fee2e2' }}>
                        Grasa: {Number(diff.fatDiff) > 0 ? `+${diff.fatDiff}` : diff.fatDiff}%
                      </span>
                      <span className="font-tech" style={{ fontSize: '0.55rem', fontWeight: 'bold', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid var(--color-dark)', backgroundColor: Number(diff.muscleDiff) > 0 ? '#d1fae5' : '#fee2e2' }}>
                        Músculo: {Number(diff.muscleDiff) > 0 ? `+${diff.muscleDiff}` : diff.muscleDiff}%
                      </span>
                    </div>
                  )}
                </div>

              </div>

            </div>
          ) : (
            <div style={{ flex: 1, border: '3px dashed rgba(17, 17, 17, 0.3)', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', backgroundColor: '#ffffff', textAlign: 'center' }}>
              <Scale size={48} style={{ color: 'var(--color-muted)', marginBottom: '1rem' }} />
              <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1.25rem' }}>Expediente del Atleta</h4>
              <p className="font-tech" style={{ fontSize: '0.8rem', color: 'var(--color-muted)', maxWidth: '300px', marginTop: '0.5rem' }}>
                Selecciona un deportista del panel izquierdo para ver su historial antropométrico completo, sus objetivos, sus metas de macronutrientes o registrar nuevas mediciones de control.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
