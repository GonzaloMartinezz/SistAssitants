import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Ticker from './components/layout/Ticker';
import SectionNav from './components/layout/SectionNav';
import Hero from './components/sections/Hero';
import Workflow from './components/sections/Workflow';
import FeaturedPlans from './components/sections/FeaturedPlans';
import Calculator from './components/sections/Calculator';
import Recipes from './components/sections/Recipes';
import Testimonials from './components/sections/Testimonials';
import CalendarScheduler from './components/sections/CalendarScheduler';
import AdminPanel from './components/sections/AdminPanel';
import AthletePortal from './components/sections/AthletePortal';
import { ShieldCheck, Mail, Heart, AtSign, Phone } from 'lucide-react';
import { api } from './services/api';

const SEED_RECIPES = [
  {
    id: 1,
    title: 'Panqueques Proteicos de Avena y Claras',
    category: 'pre',
    time: 10,
    cals: 360,
    protein: 24,
    carbs: 55,
    fats: 4,
    desc: 'La comida pre-entrenamiento definitiva. Aporta carbohidratos complejos de absorción lenta y proteínas de alto valor biológico para sostener la intensidad en el gimnasio.',
    ingredients: [
      '4 claras de huevo',
      '50g de avena molida',
      '1 banana madura',
      '1 cucharadita de miel orgánica',
      'Pizca de canela en polvo'
    ],
    steps: [
      'Licuar todos los ingredientes en una licuadora hasta lograr una mezcla homogénea y suave.',
      'Precalentar una sartén antiadherente a fuego medio y aplicar rocío vegetal.',
      'Volcar la mezcla en porciones redondas y cocinar durante 3 minutos por lado.',
      'Servir con la miel orgánica, frutas frescas o un puñado de arándanos.'
    ]
  },
  {
    id: 2,
    title: 'Batido Recuperador de Proteína y Frutos Rojos',
    category: 'post',
    time: 5,
    cals: 280,
    protein: 30,
    carbs: 28,
    fats: 5,
    desc: 'Optimizado para frenar el catabolismo post-entrenamiento. Aporta antioxidantes que reducen el estrés oxidativo provocado por las series pesadas y proteína aislada de rápida asimilación.',
    ingredients: [
      '1 scoop (30g) de proteína de suero de leche (Whey)',
      '100g de frutos rojos congelados (frutillas, arándanos)',
      '250ml de agua o leche descremada/almendras',
      '1 cucharada de semillas de chía'
    ],
    steps: [
      'Agregar el líquido en el vaso de la licuadora primero para evitar que la proteína se pegue al fondo.',
      'Incorporar el scoop de proteína, los frutos rojos congelados y las semillas de chía.',
      'Licuar a velocidad máxima durante 45 segundos hasta lograr consitencia de frappé.',
      'Consumir inmediatamente después de finalizar tu entrenamiento.'
    ]
  },
  {
    id: 3,
    title: 'Bowl de Pollo, Aguacate y Arroz Yamaní',
    category: 'almuerzo',
    time: 20,
    cals: 580,
    protein: 42,
    carbs: 48,
    fats: 22,
    desc: 'Comida sólida balanceada perfecta para deportistas híbridos. Aporta grasas saludables indispensables para la producción de testosterona, carbohidratos limpios y aminoácidos para la reconstrucción.',
    ingredients: [
      '150g de pechuga de pollo cortada en cubos',
      '100g de arroz yamaní cocido',
      '1/2 aguacate mediano en rodajas',
      '80g de tomates cherry cortados a la mitad',
      '1 cucharada de aceite de oliva virgen extra',
      'Especias a gusto (cúrcuma, orégano, sal marina)'
    ],
    steps: [
      'Cocinar el arroz yamaní a fuego lento por 30 minutos con una pizca de cúrcuma.',
      'Grillar el pollo en cubos con el aceite de oliva y especias hasta dorar uniformemente.',
      'En un plato hondo grande (bowl), disponer la cama de arroz yamaní a un lado y el pollo al otro.',
      'Acomodar los tomates cherry y las rodajas de aguacate maduro. Servir tibio.'
    ]
  },
  {
    id: 4,
    title: 'Mousse Saciante de Proteína y Cacao Amargo',
    category: 'snack',
    time: 5,
    cals: 210,
    protein: 25,
    carbs: 12,
    fats: 3,
    desc: 'Un snack de alta saciedad ideal para la tarde. Aporta caseína/proteína para mantener tus aminoácidos estables y saciar la ansiedad por lo dulce de manera saludable.',
    ingredients: [
      '200g de yogur griego natural descremado sin azúcar',
      '15g de proteína en polvo (sabor chocolate o vainilla)',
      '1 cucharada sopera de cacao amargo puro en polvo',
      'Edulcorante natural (Stevia) al gusto'
    ],
    steps: [
      'En un tazón, verter el yogur griego natural y añadir la proteína en polvo.',
      'Mezclar vigorosamente con una cuchara hasta homogeneizar los polvos.',
      'Incorporar el cacao amargo tamizado y el edulcorante, batiendo hasta lograr cremosidad.',
      'Llevar a enfriar al congelador durante 15 minutos para una consistencia de mousse firme.'
    ]
  },
  {
    id: 5,
    title: 'Wrap de Atún con Espinaca y Hummus',
    category: 'almuerzo',
    time: 8,
    cals: 420,
    protein: 36,
    carbs: 38,
    fats: 14,
    desc: 'Comida rápida de alta densidad nutricional. Ideal para deportistas que entrenan al mediodía y necesitan una comida liviana pero con macros completos.',
    ingredients: [
      '1 lata de atún al natural escurrido (170g)',
      '1 tortilla integral grande',
      '30g de hummus casero o comercial',
      '1 puñado de espinaca fresca',
      '1/4 pimiento rojo en tiras finas',
      'Jugo de medio limón y pimienta negra'
    ],
    steps: [
      'Escurrir bien el atún y mezclarlo con el jugo de limón y pimienta.',
      'Untar la tortilla integral con el hummus de manera uniforme.',
      'Colocar la espinaca fresca, las tiras de pimiento y el atún condimentado.',
      'Enrollar firmemente el wrap y cortar en diagonal para servir.'
    ]
  },
  {
    id: 6,
    title: 'Avena Nocturna con Proteína y Mantequilla de Maní',
    category: 'pre',
    time: 5,
    cals: 450,
    protein: 32,
    carbs: 52,
    fats: 14,
    desc: 'Preparada la noche anterior para un desayuno inmediato pre-gym. Carga de carbohidratos complejos con absorción sostenida para sesiones de fuerza matutinas.',
    ingredients: [
      '60g de avena en hojuelas',
      '1 scoop de proteína sabor vainilla',
      '200ml de leche de almendras',
      '1 cucharada de mantequilla de maní natural',
      '1 cucharadita de semillas de chía',
      'Banana en rodajas para servir'
    ],
    steps: [
      'En un frasco de vidrio, mezclar la avena, proteína, chía y leche de almendras.',
      'Agregar la mantequilla de maní por encima sin mezclar.',
      'Tapar y refrigerar toda la noche (mínimo 6 horas).',
      'Por la mañana, mezclar todo y agregar las rodajas de banana fresca.'
    ]
  },
  {
    id: 7,
    title: 'Barrita Energética Casera de Dátiles y Almendras',
    category: 'snack',
    time: 15,
    cals: 185,
    protein: 8,
    carbs: 24,
    fats: 9,
    desc: 'Snack natural perfecto para llevar al gym. Sin azúcar agregada, con energía de rápida absorción proveniente de los dátiles y grasas saludables de las almendras.',
    ingredients: [
      '10 dátiles medjool sin carozo',
      '80g de almendras crudas',
      '30g de coco rallado',
      '2 cucharadas de cacao amargo en polvo',
      'Pizca de sal marina',
      '1 cucharada de aceite de coco'
    ],
    steps: [
      'Procesar las almendras hasta obtener trozos gruesos (no harina).',
      'Agregar los dátiles, cacao, coco rallado, sal y aceite de coco al procesador.',
      'Pulsar hasta que se forme una masa pegajosa y uniforme.',
      'Formar barritas con las manos y refrigerar 2 horas antes de consumir.'
    ]
  },
  {
    id: 8,
    title: 'Tortilla Española Fit de Claras con Verduras',
    category: 'post',
    time: 12,
    cals: 310,
    protein: 28,
    carbs: 18,
    fats: 12,
    desc: 'Cena o post-entreno nocturno rico en proteínas de alto valor biológico. Las claras son la fuente más pura de proteína con aminoácidos esenciales para la síntesis muscular.',
    ingredients: [
      '6 claras de huevo + 1 huevo entero',
      '1 papa pequeña cocida y cortada en rodajas finas',
      '50g de espinaca fresca',
      '1/4 cebolla picada fina',
      'Sal, pimienta y orégano a gusto',
      'Rocío vegetal para la sartén'
    ],
    steps: [
      'Batir las claras con el huevo entero, sal, pimienta y orégano.',
      'En sartén con rocío vegetal, saltear la cebolla y la espinaca 2 minutos.',
      'Agregar las rodajas de papa cocida y verter la mezcla de huevos encima.',
      'Cocinar a fuego bajo con tapa 5 minutos, dar vuelta y cocinar 3 más.'
    ]
  }
];

const SEED_BOOKINGS = [
  { id: 101, clientName: 'Carlos Ortiz', sport: 'Powerlifting', day: 'Lunes', time: '15:00', date: '27 de mayo' },
  { id: 102, clientName: 'Sofía Benítez', sport: 'Crossfit', day: 'Miércoles', time: '11:00', date: '29 de mayo' },
  { id: 103, clientName: 'Valentina Torres', sport: 'Gimnasio', day: 'Martes', time: '09:00', date: '28 de mayo' },
  { id: 104, clientName: 'Martín Ruiz', sport: 'Culturismo', day: 'Jueves', time: '17:00', date: '30 de mayo' },
  { id: 105, clientName: 'Federico Álvarez', sport: 'Running', day: 'Viernes', time: '09:00', date: '31 de mayo' }
];

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const [recipes, setRecipes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeRecipeFilter, setActiveRecipeFilter] = useState('all');

  const horizontalRef = React.useRef(null);

  useEffect(() => {
    const panels = ['workflow', 'plans', 'recipes', 'calculator'];
    if (panels.includes(activeSection) && horizontalRef.current) {
      const index = panels.indexOf(activeSection);
      const container = horizontalRef.current;
      setTimeout(() => {
        const panelWidth = container.offsetWidth;
        container.scrollTo({
          left: index * panelWidth,
          behavior: 'smooth'
        });
      }, 50);
    }
  }, [activeSection]);

  // Simple state routing system using location hash
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load all initial data from backend (with transparent localStorage fallback)
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedRecipes = await api.getRecipes();
        setRecipes(fetchedRecipes);

        const fetchedBookings = await api.getBookings();
        setBookings(fetchedBookings);

        const fetchedPatients = await api.getPatients();
        setPatients(fetchedPatients);
        
        if (fetchedPatients.length > 0) {
          setSelectedPatient(fetchedPatients[0]);
        }
      } catch (error) {
        console.error('Error loading initial data from API service', error);
      }
    };
    loadData();
  }, []);

  const handleAddRecipe = async (newRecipe) => {
    try {
      const saved = await api.addRecipe(newRecipe);
      setRecipes([saved, ...recipes]);
      setActiveRecipeFilter('all');
    } catch (error) {
      console.error('Error adding recipe', error);
    }
  };

  const handleAddBooking = async (newBooking) => {
    // This can throw an error if the slot is taken
    const saved = await api.addBooking(newBooking);
    setBookings([saved, ...bookings]);
    return saved;
  };

  const handleDeleteBooking = async (id) => {
    try {
      await api.deleteBooking(id);
      setBookings(bookings.filter((b) => b._id !== id && b.id !== id));
    } catch (error) {
      console.error('Error deleting booking', error);
    }
  };

  const handleAddPatient = async (patientData) => {
    try {
      const saved = await api.addPatient(patientData);
      setPatients([saved, ...patients]);
      setSelectedPatient(saved);
    } catch (error) {
      console.error('Error adding patient', error);
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      await api.deletePatient(patientId);
      const filtered = patients.filter((p) => p._id !== patientId && p.id !== patientId);
      setPatients(filtered);
      setSelectedPatient(filtered.length > 0 ? filtered[0] : null);
    } catch (error) {
      console.error('Error deleting patient', error);
    }
  };

  const handleAddAnthropometry = async (patientId, record) => {
    try {
      const updated = await api.addAnthropometry(patientId, record);
      setPatients(patients.map((p) => (p._id === patientId || p.id === patientId) ? updated : p));
      setSelectedPatient(updated);
    } catch (error) {
      console.error('Error adding anthropometry record', error);
    }
  };

  // Helper to handle smooth navigation shortcuts in top nav
  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (window.location.hash !== '#/') {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Fixed Neobrutalist Navigation Bar
  const GlobalNavBar = () => (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.75rem',
        backgroundColor: 'var(--bg-cream)',
        borderBottom: '3px solid var(--color-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 9999,
        boxShadow: '0px 2px 0px rgba(17,17,17,0.08)'
      }}
      className="select-none"
    >
      <div 
        onClick={() => { window.location.hash = '#/'; }} 
        style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', textAlign: 'left' }}
      >
        <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: '900', lineHeight: 1 }}>Guadalupe Martínez</span>
        <span className="font-tech" style={{ fontSize: '0.55rem', fontWeight: 'bold', color: 'var(--kraft-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>
          Nutrición Deportiva & Salud
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button 
          onClick={() => { window.location.hash = '#/'; }}
          className="btn-neo"
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.75rem',
            backgroundColor: currentRoute === '#/' ? 'var(--pastel-yellow)' : '#ffffff',
            transform: currentRoute === '#/' ? 'translate(-1px, -1px)' : 'none',
            boxShadow: currentRoute === '#/' ? '2px 2px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)'
          }}
        >
          🏠 Inicio Atleta
        </button>
        
        <button 
          onClick={() => navigateToSection('workflow')}
          className="btn-neo"
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.75rem',
            backgroundColor: '#ffffff'
          }}
        >
          📋 Método
        </button>

        <button 
          onClick={() => { window.location.hash = '#/admin'; }}
          className="btn-neo"
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.75rem',
            backgroundColor: currentRoute === '#/admin' ? 'var(--pastel-peach)' : '#ffffff',
            transform: currentRoute === '#/admin' ? 'translate(-1px, -1px)' : 'none',
            boxShadow: currentRoute === '#/admin' ? '2px 2px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)'
          }}
        >
          🛡️ Consola Nutri (Admin)
        </button>
      </div>
    </div>
  );

  // Layout 1: Leticia's Admin Dashboard Console Portal (Route: #/admin)
  if (currentRoute === '#/admin') {
    return (
      <div style={{ paddingTop: '3.75rem', minHeight: '100vh', backgroundColor: 'var(--bg-cream)' }}>
        <GlobalNavBar />
        
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <AdminPanel 
            recipes={recipes} 
            bookings={bookings} 
            onAddRecipe={handleAddRecipe} 
            onDeleteBooking={handleDeleteBooking}
            patients={patients}
            onAddPatient={handleAddPatient}
            onDeletePatient={handleDeletePatient}
            onAddAnthropometry={handleAddAnthropometry}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </div>
      </div>
    );
  }

  // Layout 2: Athlete Landing Portal Page (Route: #/ or default public)
  return (
    <div style={{ paddingTop: '3.75rem' }}>
      <GlobalNavBar />

      <div className="app-wrapper">
        {/* Sidebar fixed menu / Mobile toggle */}
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />

        {/* Conditionally Render Active Section next to the menu as a tab */}
        <div className="content-wrapper">
          
          {/* Infinite scrolling Ticker */}
          <Ticker />

          {['workflow', 'plans', 'recipes', 'calculator'].includes(activeSection) ? (
            <div 
              ref={horizontalRef}
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                width: '100%',
                flex: 1
              }}
            >
              <div id="workflow" style={{ minWidth: '100%', width: '100%', height: '100%', overflowY: 'auto' }}>
                <Workflow onNavigate={setActiveSection} />
              </div>
              <div id="plans" style={{ minWidth: '100%', width: '100%', height: '100%', overflowY: 'auto' }}>
                <FeaturedPlans onNavigate={setActiveSection} />
              </div>
              <div id="recipes" style={{ minWidth: '100%', width: '100%', height: '100%', overflowY: 'auto' }}>
                <Recipes 
                  recipes={recipes} 
                  activeFilter={activeRecipeFilter}
                  setActiveFilter={setActiveRecipeFilter}
                />
              </div>
              <div id="calculator" style={{ minWidth: '100%', width: '100%', height: '100%', overflowY: 'auto' }}>
                <Calculator />
              </div>
            </div>
          ) : (
            <>
              {activeSection === 'hero' && <Hero onNavigate={setActiveSection} />}
              {activeSection === 'athlete-portal' && <AthletePortal recipes={recipes} />}
              {activeSection === 'testimonials' && <Testimonials />}
              {activeSection === 'calendar' && (
                <CalendarScheduler 
                  bookings={bookings} 
                  onAddBooking={handleAddBooking} 
                />
              )}
            </>
          )}

          {/* Footer */}
          <footer className="footer-neo select-none">
            <div className="footer-top-row">
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span className="font-display" style={{ fontSize: '1.75rem', fontWeight: '900', lineHeight: 1 }}>Guadalupe.</span>
                <span className="font-tech text-xs uppercase tracking-wider" style={{ fontWeight: 'bold', color: 'var(--kraft-brown)' }}>
                  Licenciatura en Nutrición & Comunidad Saludable
                </span>
              </div>

              <div className="footer-links-col">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <AtSign size={14} /> @guada_nutrisalud
                </a>
                <a href="mailto:guada@nutri.com">
                  <Mail size={14} /> guada@nutri.com
                </a>
                <a href="tel:+5491155556789" style={{ color: 'var(--color-dark)' }}>
                  <Phone size={14} /> +54 9 11 5555-6789
                </a>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
                  <ShieldCheck size={14} /> Futura Licenciada en Nutrición
                </span>
              </div>

            </div>

            {/* Footer Quick Info Row */}
            <div className="footer-services-row">
              <div className="footer-service-chip">
                💪 Planificación de Cargas
              </div>
              <div className="footer-service-chip">
                🌱 Alimentación Paso a Paso
              </div>
              <div className="footer-service-chip">
                🔥 Recomposición Corporal
              </div>
              <div className="footer-service-chip">
                🏃 Salud y Rendimiento
              </div>
              <div className="footer-service-chip">
                🤝 Red de Apoyo Mutuo
              </div>
              <div className="footer-service-chip">
                📊 Antropometría & Control
              </div>
            </div>

            <div className="sidebar-divider" style={{ margin: '1.5rem auto', maxWidth: '1200px' }}></div>

            <div className="footer-meta-row">
              <span>© {new Date().getFullYear()} Guadalupe Martínez. Todos los derechos reservados.</span>
              <div className="footer-meta-right">
                Desarrollado con <Heart size={10} style={{ color: '#ef4444', fill: '#ef4444' }} /> para potenciar tu salud.
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default App;
