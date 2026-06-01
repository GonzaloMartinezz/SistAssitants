import mongoose from 'mongoose';

const mealSlotSchema = new mongoose.Schema({
  text: { type: String, default: '' },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
}, { _id: false });

const dayPlanSchema = new mongoose.Schema({
  Desayuno: { type: mealSlotSchema, default: () => ({}) },
  PreEntreno: { type: mealSlotSchema, default: () => ({}) },
  Almuerzo: { type: mealSlotSchema, default: () => ({}) },
  Merienda: { type: mealSlotSchema, default: () => ({}) },
  Cena: { type: mealSlotSchema, default: () => ({}) },
  PostEntreno: { type: mealSlotSchema, default: () => ({}) },
  Colacion: { type: mealSlotSchema, default: () => ({}) },
  Entrenamiento: { type: String, default: '' },
  Suplementacion: { type: String, default: '' },
  Notas: { type: String, default: '' }
}, { _id: false });

const weeklyPlanSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    unique: true // un solo plan semanal activo por paciente
  },
  days: {
    Lunes: { type: dayPlanSchema, default: () => ({}) },
    Martes: { type: dayPlanSchema, default: () => ({}) },
    Miércoles: { type: dayPlanSchema, default: () => ({}) },
    Jueves: { type: dayPlanSchema, default: () => ({}) },
    Viernes: { type: dayPlanSchema, default: () => ({}) },
    Sábado: { type: dayPlanSchema, default: () => ({}) },
    Domingo: { type: dayPlanSchema, default: () => ({}) }
  }
}, {
  timestamps: true
});

const WeeklyPlan = mongoose.model('WeeklyPlan', weeklyPlanSchema);
export default WeeklyPlan;
