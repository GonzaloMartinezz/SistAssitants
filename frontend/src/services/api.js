const API_BASE_URL = 'http://localhost:5000/api';

// Seed definitions for local fallback
const SEED_RECIPES = [
  {
    id: '1',
    _id: '1',
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
    id: '2',
    _id: '2',
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
    id: '3',
    _id: '3',
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
  }
];

const SEED_BOOKINGS = [
  { id: '101', _id: '101', clientName: 'Carlos Ortiz', sport: 'Powerlifting', day: 'Lunes', time: '15:00', date: '27 de mayo' },
  { id: '102', _id: '102', clientName: 'Sofía Benítez', sport: 'Crossfit', day: 'Miércoles', time: '11:00', date: '29 de mayo' },
  { id: '103', _id: '103', clientName: 'Valentina Torres', sport: 'Gimnasio', day: 'Martes', time: '09:00', date: '28 de mayo' }
];

const SEED_PATIENTS = [
  {
    id: 'p1',
    _id: 'p1',
    name: 'Carlos Ortiz',
    email: 'carlos@power.com',
    phone: '+5491133334444',
    sport: 'Powerlifting',
    level: 'Élite',
    trainingFrequency: 4,
    target: 'Fuerza Máxima',
    macros: { cals: 3200, protein: 180, carbs: 420, fats: 80 },
    anthropometry: [
      { weight: 88, height: 175, bodyFat: 16.5, muscleMass: 45.2, date: new Date('2026-04-15') },
      { weight: 89.5, height: 175, bodyFat: 15.2, muscleMass: 47.1, date: new Date('2026-05-15') }
    ]
  },
  {
    id: 'p2',
    _id: 'p2',
    name: 'Sofía Benítez',
    email: 'sofia@crossfit.com',
    phone: '+5491144445555',
    sport: 'Crossfit',
    level: 'Avanzado',
    trainingFrequency: 5,
    target: 'Potencia & Definición',
    macros: { cals: 2450, protein: 140, carbs: 290, fats: 65 },
    anthropometry: [
      { weight: 64, height: 165, bodyFat: 21.0, muscleMass: 33.5, date: new Date('2026-04-10') },
      { weight: 63, height: 165, bodyFat: 19.1, muscleMass: 34.8, date: new Date('2026-05-12') }
    ]
  }
];

// Helper wrapper to print beautiful logs
const logMessage = (msg, data) => {
  console.log(`%c[API SERVICE]: ${msg}`, 'color: #cd9355; font-weight: bold;', data || '');
};

export const api = {
  // --- RECIPES ---
  async getRecipes() {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Recetas obtenidas desde MongoDB ⚡', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Usando fallback de localStorage.', error);
      const saved = localStorage.getItem('leticia_recipes');
      if (!saved) {
        localStorage.setItem('leticia_recipes', JSON.stringify(SEED_RECIPES));
        return SEED_RECIPES;
      }
      return JSON.parse(saved);
    }
  },

  async addRecipe(recipe) {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });
      if (!response.ok) throw new Error('API server error');
      const data = await response.ok ? await response.json() : null;
      logMessage('Receta guardada en MongoDB 🍃', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Guardando receta en localStorage.', error);
      const saved = localStorage.getItem('leticia_recipes') ? JSON.parse(localStorage.getItem('leticia_recipes')) : SEED_RECIPES;
      const newRecipe = { ...recipe, _id: Date.now().toString(), id: Date.now().toString() };
      const updated = [newRecipe, ...saved];
      localStorage.setItem('leticia_recipes', JSON.stringify(updated));
      return newRecipe;
    }
  },

  // --- PATIENTS ---
  async getPatients() {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`);
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Pacientes obtenidos desde MongoDB ⚡', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Usando fallback de localStorage para pacientes.', error);
      const saved = localStorage.getItem('leticia_patients');
      if (!saved) {
        localStorage.setItem('leticia_patients', JSON.stringify(SEED_PATIENTS));
        return SEED_PATIENTS;
      }
      return JSON.parse(saved);
    }
  },

  async addPatient(patient) {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
      });
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Paciente registrado en MongoDB 🍃', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Registrando paciente en localStorage.', error);
      const saved = localStorage.getItem('leticia_patients') ? JSON.parse(localStorage.getItem('leticia_patients')) : SEED_PATIENTS;
      const newId = Date.now().toString();
      const newPatient = {
        ...patient,
        _id: newId,
        id: newId,
        macros: patient.macros || { cals: 2000, protein: 130, carbs: 220, fats: 60 },
        anthropometry: patient.anthropometry ? [patient.anthropometry] : []
      };
      const updated = [newPatient, ...saved];
      localStorage.setItem('leticia_patients', JSON.stringify(updated));
      return newPatient;
    }
  },

  async updatePatient(patientId, updateData) {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Paciente actualizado en MongoDB ⚡', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Actualizando paciente en localStorage.', error);
      const saved = localStorage.getItem('leticia_patients') ? JSON.parse(localStorage.getItem('leticia_patients')) : SEED_PATIENTS;
      const updated = saved.map(p => (p._id === patientId || p.id === patientId) ? { ...p, ...updateData } : p);
      localStorage.setItem('leticia_patients', JSON.stringify(updated));
      return updated.find(p => p._id === patientId || p.id === patientId);
    }
  },

  async addAnthropometry(patientId, record) {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patientId}/anthropometry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      });
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Antropometría agregada en MongoDB 📊', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Guardando antropometría en localStorage.', error);
      const saved = localStorage.getItem('leticia_patients') ? JSON.parse(localStorage.getItem('leticia_patients')) : SEED_PATIENTS;
      const updated = saved.map(p => {
        if (p._id === patientId || p.id === patientId) {
          const anthropometry = p.anthropometry ? [...p.anthropometry] : [];
          anthropometry.push({ ...record, date: new Date().toISOString() });
          return { ...p, anthropometry };
        }
        return p;
      });
      localStorage.setItem('leticia_patients', JSON.stringify(updated));
      return updated.find(p => p._id === patientId || p.id === patientId);
    }
  },

  async deletePatient(patientId) {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('API server error');
      logMessage('Paciente eliminado de MongoDB ❌');
      return true;
    } catch (error) {
      logMessage('Servidor no disponible. Eliminando paciente de localStorage.', error);
      const saved = localStorage.getItem('leticia_patients') ? JSON.parse(localStorage.getItem('leticia_patients')) : SEED_PATIENTS;
      const filtered = saved.filter(p => p._id !== patientId && p.id !== patientId);
      localStorage.setItem('leticia_patients', JSON.stringify(filtered));
      
      // Borrar plan local
      localStorage.removeItem(`leticia_weekly_plan_${patientId}`);
      return true;
    }
  },

  // --- BOOKINGS ---
  async getBookings() {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`);
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Turnos obtenidos desde MongoDB ⚡', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Usando fallback de localStorage para turnos.', error);
      const saved = localStorage.getItem('leticia_bookings');
      if (!saved) {
        localStorage.setItem('leticia_bookings', JSON.stringify(SEED_BOOKINGS));
        return SEED_BOOKINGS;
      }
      return JSON.parse(saved);
    }
  },

  async addBooking(booking) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'API server error');
      }
      const data = await response.json();
      logMessage('Turno reservado en MongoDB 📅', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible/Error. Guardando turno en localStorage.', error);
      
      const saved = localStorage.getItem('leticia_bookings') ? JSON.parse(localStorage.getItem('leticia_bookings')) : SEED_BOOKINGS;
      
      // Controlar si ya está tomado localmente
      const taken = saved.some(b => b.day === booking.day && b.time === booking.time);
      if (taken) {
        throw new Error('Este horario ya está ocupado para ese día');
      }

      const newBooking = { ...booking, _id: Date.now().toString(), id: Date.now().toString() };
      const updated = [newBooking, ...saved];
      localStorage.setItem('leticia_bookings', JSON.stringify(updated));
      return newBooking;
    }
  },

  async deleteBooking(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('API server error');
      logMessage('Turno eliminado de MongoDB ❌');
      return true;
    } catch (error) {
      logMessage('Servidor no disponible. Eliminando turno de localStorage.', error);
      const saved = localStorage.getItem('leticia_bookings') ? JSON.parse(localStorage.getItem('leticia_bookings')) : SEED_BOOKINGS;
      const filtered = saved.filter(b => b._id !== id && b.id !== id);
      localStorage.setItem('leticia_bookings', JSON.stringify(filtered));
      return true;
    }
  },

  // --- WEEKLY PLANS ---
  async getWeeklyPlan(patientId) {
    try {
      const response = await fetch(`${API_BASE_URL}/weekly-plans/patient/${patientId}`);
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Plan semanal obtenido desde MongoDB ⚡', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Cargando plan semanal de localStorage.', error);
      const key = `leticia_weekly_plan_${patientId}`;
      const saved = localStorage.getItem(key);
      if (!saved) {
        const defaultPlan = {
          patientId,
          days: {
            Lunes: {},
            Martes: {},
            Miércoles: {},
            Jueves: {},
            Viernes: {},
            Sábado: {},
            Domingo: {}
          }
        };
        localStorage.setItem(key, JSON.stringify(defaultPlan));
        return defaultPlan;
      }
      return JSON.parse(saved);
    }
  },

  async saveWeeklyPlan(patientId, days) {
    try {
      const response = await fetch(`${API_BASE_URL}/weekly-plans/patient/${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days })
      });
      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      logMessage('Plan semanal guardado en MongoDB 🍃', data);
      return data;
    } catch (error) {
      logMessage('Servidor no disponible. Guardando plan semanal en localStorage.', error);
      const key = `leticia_weekly_plan_${patientId}`;
      const fullPlan = { patientId, days };
      localStorage.setItem(key, JSON.stringify(fullPlan));
      return fullPlan;
    }
  }
};
