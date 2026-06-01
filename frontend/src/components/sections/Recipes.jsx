import React, { useState } from 'react';
import { BookOpen, Clock, X, ChevronRight, CheckSquare } from 'lucide-react';

export default function Recipes({ recipes, activeFilter, setActiveFilter }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filters = [
    { id: 'all', label: 'Ver Todo' },
    { id: 'pre', label: '⚡ Pre-Entreno' },
    { id: 'post', label: '🔥 Post-Entreno' },
    { id: 'snack', label: '🍿 Snacks' },
    { id: 'almuerzo', label: '🥗 Comidas' }
  ];

  const filteredRecipes = activeFilter === 'all' 
    ? recipes 
    : recipes.filter(r => r.category === activeFilter);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'pre': return 'var(--pastel-pink)';
      case 'post': return 'var(--pastel-blue)';
      case 'snack': return 'var(--pastel-yellow)';
      case 'almuerzo': return 'var(--pastel-green)';
      default: return 'var(--bg-cream)';
    }
  };

  return (
    <section id="recipes" className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* Title */}
      <div className="flex flex-col text-left select-none">
        <span className="section-label">Combustible Saludable</span>
        <h2 className="section-title">
          Recetas de Rendimiento
        </h2>
      </div>

      {/* Dynamic Filters */}
      <div className="filter-row">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className="btn-neo"
            style={{
              fontSize: '0.85rem',
              padding: '0.6rem 1.1rem',
              backgroundColor: activeFilter === f.id ? 'var(--pastel-peach)' : 'white',
              transform: activeFilter === f.id ? 'translate(-2px, -2px)' : 'none',
              boxShadow: activeFilter === f.id ? '4px 4px 0px var(--color-dark)' : '2px 2px 0px var(--color-dark)'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="step-card" style={{ padding: '3rem', width: '100%' }}>
          <BookOpen size={48} style={{ color: 'var(--color-muted)', marginBottom: '1rem' }} />
          <h3>No hay recetas cargadas</h3>
          <p>
            ¡Puedes añadir tus propias recetas en la sección "Panel Nutri" del menú!
          </p>
        </div>
      )}

      {/* Recipes Grid */}
      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
          >
            {/* Card Header area */}
            <div 
              className="recipe-card-header"
              style={{ backgroundColor: getCategoryColor(recipe.category) }}
            >
              <div className="recipe-header-top">
                <span className="badge-neo font-tech" style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-dark)' }}>
                  {recipe.category === 'pre' && '⚡ Pre-Entreno'}
                  {recipe.category === 'post' && '🔥 Post-Entreno'}
                  {recipe.category === 'snack' && '🍿 Snack Prot.'}
                  {recipe.category === 'almuerzo' && '🥗 Comida Élite'}
                </span>
                
                <div className="font-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', fontWeight: 'bold', opacity: 0.8 }}>
                  <Clock size={12} /> {recipe.time} min
                </div>
              </div>

              <h3 className="recipe-card-title">
                {recipe.title}
              </h3>
            </div>

            {/* Card Description & Info */}
            <div className="recipe-card-body">
              <p className="recipe-card-desc">
                {recipe.desc}
              </p>

              <div className="sidebar-divider"></div>

              {/* Simple row of mini macros */}
              <div className="recipe-mini-macros">
                <div className="recipe-mini-macro-item">
                  <span style={{ opacity: 0.6, fontSize: '0.55rem' }}>ENERGÍA</span>
                  <span>{recipe.cals} kcal</span>
                </div>
                <div className="recipe-mini-divider"></div>
                <div className="recipe-mini-macro-item">
                  <span style={{ color: 'var(--kraft-brown)', fontSize: '0.55rem' }}>PROTEÍNA</span>
                  <span>{recipe.protein}g</span>
                </div>
                <div className="recipe-mini-divider"></div>
                <div className="recipe-mini-macro-item">
                  <span style={{ color: '#b45309', fontSize: '0.55rem' }}>CARBOS</span>
                  <span>{recipe.carbs}g</span>
                </div>
              </div>
            </div>

            {/* Preparation Button trigger */}
            <div className="recipe-btn-pad">
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="btn-neo"
                style={{ width: '100%', backgroundColor: 'var(--bg-cream)' }}
              >
                Ver Preparación <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe details modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-card modal-card-wide" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div
              className="modal-header"
              style={{ backgroundColor: getCategoryColor(selectedRecipe.category) }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
                <span className="badge-neo font-tech" style={{ backgroundColor: '#ffffff', alignSelf: 'flex-start' }}>
                  {selectedRecipe.category === 'pre' && '⚡ Pre-Entreno'}
                  {selectedRecipe.category === 'post' && '🔥 Post-Entreno'}
                  {selectedRecipe.category === 'snack' && '🍿 Snack Proteico'}
                  {selectedRecipe.category === 'almuerzo' && '🥗 Comida Élite'}
                </span>
                
                <h3 className="font-display text-2xl font-black mt-1 leading-tight">
                  {selectedRecipe.title}
                </h3>
              </div>
              
              <button
                onClick={() => setSelectedRecipe(null)}
                className="modal-close-btn"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable details body */}
            <div className="modal-body">
              
              {/* Macro stats block */}
              <div className="calc-calories-block" style={{ padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 'bold', opacity: 0.6 }}>CALORÍAS</span>
                  <span className="font-tech" style={{ fontWeight: '900', fontSize: '1.1rem' }}>{selectedRecipe.cals}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid rgba(17,17,17,0.1)' }}>
                  <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 'bold', color: 'var(--kraft-brown)' }}>PROT</span>
                  <span className="font-tech" style={{ fontWeight: '900', fontSize: '1.1rem' }}>{selectedRecipe.protein}g</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid rgba(17,17,17,0.1)' }}>
                  <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#b45309' }}>CARBS</span>
                  <span className="font-tech" style={{ fontWeight: '900', fontSize: '1.1rem' }}>{selectedRecipe.carbs}g</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid rgba(17,17,17,0.1)' }}>
                  <span className="font-tech" style={{ fontSize: '0.6rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>GRASAS</span>
                  <span className="font-tech" style={{ fontWeight: '900', fontSize: '1.1rem' }}>{selectedRecipe.fats}g</span>
                </div>
              </div>

              {/* Grid content columns */}
              <div className="recipe-modal-grid">
                
                {/* Ingredients column */}
                <div className="recipe-modal-ingredients">
                  <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '2px solid var(--color-dark)', paddingBottom: '0.25rem' }}>
                    <CheckSquare size={16} /> Ingredientes:
                  </h4>
                  
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="recipe-ingredient-item">
                        <span className="recipe-ingredient-dot"></span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation steps column */}
                <div className="recipe-modal-steps">
                  <h4 className="font-display" style={{ fontWeight: '900', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '2px solid var(--color-dark)', paddingBottom: '0.25rem' }}>
                    <Clock size={16} /> Preparación:
                  </h4>

                  <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
                    {selectedRecipe.steps.map((step, i) => (
                      <li key={i} className="recipe-step-item">
                        <span className="recipe-step-num font-tech">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>

            </div>

            {/* Bottom Actions footer */}
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="btn-neo btn-accent"
                style={{ width: '100%', maxWidth: '20rem' }}
              >
                ¡Buen Provecho Deportista! 💪
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
