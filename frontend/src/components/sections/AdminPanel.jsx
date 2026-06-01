import React, { useState } from 'react';
import { Plus, Calendar, Dumbbell, ClipboardCheck, Trash2, Users } from 'lucide-react';
import PatientManager from './PatientManager';
import WeeklyMealPlanner from './WeeklyMealPlanner';

export default function AdminPanel({ 
  recipes, 
  bookings, 
  onAddRecipe, 
  onDeleteBooking,
  patients,
  onAddPatient,
  onDeletePatient,
  onAddAnthropometry,
  selectedPatient,
  onSelectPatient
}) {
  const [activeTab, setActiveTab] = useState('patients'); // patients, weeklyPlanner, recipes, bookings

  // Add Recipe Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('pre');
  const [time, setTime] = useState(15);
  const [cals, setCals] = useState(300);
  const [protein, setProtein] = useState(25);
  const [carbs, setCarbs] = useState(40);
  const [fats, setFats] = useState(8);
  const [desc, setDesc] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');

  const handleAddRecipeSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc) return;

    const newRecipe = {
      title,
      category,
      time: Number(time),
      cals: Number(cals),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      desc,
      ingredients: ingredientsText.split(',').map(i => i.trim()).filter(Boolean),
      steps: stepsText.split('\n').map(s => s.trim()).filter(Boolean)
    };

    onAddRecipe(newRecipe);
    
    // Clear inputs
    setTitle('');
    setDesc('');
    setIngredientsText('');
    setStepsText('');
    alert('¡Receta agregada con éxito a la base de datos! ⚡');
  };

  return (
    <section id="admin" className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title */}
      <div className="flex flex-col text-left select-none">
        <span className="section-label">Consola de la Licenciada</span>
        <h2 className="section-title">
          panel de control
        </h2>
      </div>

      {/* Admin console columns layout */}
      <div className="admin-grid">
        
        {/* Navigation tabs left column */}
        <div className="admin-tabs-col select-none">
          {[
            { id: 'patients', label: 'Pacientes', icon: Users, color: 'var(--pastel-blue)', badge: patients.length },
            { id: 'weeklyPlanner', label: 'Plan Semanal', icon: Calendar, color: 'var(--pastel-green)' },
            { id: 'recipes', label: 'Cargar Receta', icon: Plus, color: 'var(--pastel-pink)' },
            { id: 'bookings', label: 'Citas Pacientes', icon: ClipboardCheck, color: 'var(--pastel-yellow)', badge: bookings.length }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="admin-tab-btn"
                style={{
                  backgroundColor: active ? tab.color : '#ffffff',
                  transform: active ? 'translate(-2px, -2px)' : 'none',
                  boxShadow: active ? '4px 4px 0px var(--color-dark)' : '2px 2px 0px var(--color-dark)'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="admin-tab-badge">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Console Box Card */}
        <div className="console-box-card" style={{ minHeight: '500px' }}>
          
          {/* Tab: Patients Management */}
          {activeTab === 'patients' && (
            <PatientManager 
              patients={patients}
              onAddPatient={onAddPatient}
              onDeletePatient={onDeletePatient}
              onAddAnthropometry={onAddAnthropometry}
              selectedPatient={selectedPatient}
              onSelectPatient={onSelectPatient}
            />
          )}

          {/* Tab: Weekly Nutrition & Training Planner */}
          {activeTab === 'weeklyPlanner' && (
            <WeeklyMealPlanner 
              patient={selectedPatient}
              recipes={recipes}
            />
          )}
          
          {/* Tab: Add Recipe Form */}
          {activeTab === 'recipes' && (
            <form onSubmit={handleAddRecipeSubmit} className="console-form">
              <div className="console-box-header">
                <div className="sidebar-icon-pad" style={{ backgroundColor: 'var(--pastel-pink)', padding: '0.5rem' }}>
                  <Plus size={20} />
                </div>
                <h3>Cargar Nueva Receta Deportiva</h3>
              </div>

              <div className="input-row-double">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>TÍTULO DE LA RECETA</label>
                  <input 
                    type="text" required placeholder="Ej. Budín Proteico de Banana"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    className="input-neo"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>CATEGORÍA NUTRICIONAL</label>
                  <select 
                    value={category} onChange={(e) => setCategory(e.target.value)}
                    className="input-neo font-tech"
                    style={{ fontWeight: 'bold' }}
                  >
                    <option value="pre">⚡ Pre-Entreno (Carbos Rápidos)</option>
                    <option value="post">🔥 Post-Entreno (Recuperación)</option>
                    <option value="snack">🍿 Snack Proteico (Saciante)</option>
                    <option value="almuerzo">🥗 Comida Élite (Fuerza)</option>
                  </select>
                </div>
              </div>

              {/* Multi inputs line for macros */}
              <div className="input-row-five">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="font-tech text-center" style={{ fontSize: '0.55rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>TIEMPO (MIN)</span>
                  <input type="number" required min="5" value={time} onChange={(e) => setTime(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="font-tech text-center" style={{ fontSize: '0.55rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>CALORÍAS</span>
                  <input type="number" required min="50" value={cals} onChange={(e) => setCals(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="font-tech text-center" style={{ fontSize: '0.55rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>PROT (G)</span>
                  <input type="number" required min="0" value={protein} onChange={(e) => setProtein(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="font-tech text-center" style={{ fontSize: '0.55rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>CARBOS (G)</span>
                  <input type="number" required min="0" value={carbs} onChange={(e) => setCarbs(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="font-tech text-center" style={{ fontSize: '0.55rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>GRASAS (G)</span>
                  <input type="number" required min="0" value={fats} onChange={(e) => setFats(e.target.value)} className="input-neo font-tech" style={{ textAlign: 'center' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>BREVE DESCRIPCIÓN DEL OBJETIVO</label>
                <textarea 
                  required rows="2" placeholder="Ej. Excelente fuente de potasio y energía de rápida asimilación..."
                  value={desc} onChange={(e) => setDesc(e.target.value)}
                  className="input-neo"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>INGREDIENTES (SEPARADOS POR COMAS)</label>
                <input 
                  type="text" required placeholder="Ej. 1 banana madura, 3 claras de huevo, 40g avena..."
                  value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)}
                  className="input-neo"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>PASOS DE PREPARACIÓN (UNO POR LÍNEA)</label>
                <textarea 
                  required rows="3" placeholder="Licuar los ingredientes.&#10;Volcar en sartén precalentada.&#10;Cocinar 3 min por lado."
                  value={stepsText} onChange={(e) => setStepsText(e.target.value)}
                  className="input-neo console-form-textarea"
                />
              </div>

              <button type="submit" className="btn-neo btn-accent" style={{ width: '100%', marginTop: '0.5rem' }}>
                Añadir Receta al Catálogo ⚡
              </button>

            </form>
          )}

          {/* Tab View Patient Bookings */}
          {activeTab === 'bookings' && (
            <div className="console-form">
              <div className="console-box-header">
                <div className="sidebar-icon-pad" style={{ backgroundColor: 'var(--pastel-yellow)', padding: '0.5rem' }}>
                  <ClipboardCheck size={20} />
                </div>
                <h3>Turnos Solicitados de Pacientes</h3>
              </div>

              {bookings.length === 0 ? (
                <div className="step-card" style={{ padding: '2.5rem', width: '100%', borderStyle: 'dashed', backgroundColor: '#ffffff' }}>
                  <ClipboardCheck size={40} style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }} />
                  <p className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                    No hay turnos reservados actualmente.
                  </p>
                </div>
              ) : (
                <div className="admin-bookings-list">
                  {bookings.map((b) => (
                    <div 
                      key={b._id || b.id}
                      className="admin-booking-item"
                    >
                      <div className="admin-booking-meta">
                        <span className="badge-neo" style={{ backgroundColor: 'var(--pastel-green)', fontSize: '0.6rem', border: 'none', alignSelf: 'flex-start' }}>{b.sport}</span>
                        <h4>{b.clientName}</h4>
                        <span className="font-tech text-xs font-bold text-amber-700" style={{ marginTop: '0.1rem' }}>
                          {b.day} ({b.date}) a las {b.time} hs
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onDeleteBooking(b._id || b.id)}
                        className="btn-neo"
                        style={{ padding: '0.6rem', backgroundColor: 'var(--pastel-pink)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
