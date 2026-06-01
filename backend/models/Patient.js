import mongoose from 'mongoose';

const anthropometrySchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bodyFat: { type: Number, required: true }, // % de grasa
  muscleMass: { type: Number, required: true }, // % de músculo
  date: { type: Date, default: Date.now }
});

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  sport: {
    type: String,
    required: true,
    default: 'Gimnasio'
  },
  level: {
    type: String,
    required: true,
    enum: ['Principiante', 'Intermedio', 'Avanzado', 'Élite'],
    default: 'Intermedio'
  },
  trainingFrequency: {
    type: Number,
    required: true,
    default: 4
  },
  target: {
    type: String,
    required: true,
    default: 'Hipertrofia'
  },
  macros: {
    cals: { type: Number, default: 2000 },
    protein: { type: Number, default: 130 },
    carbs: { type: Number, default: 220 },
    fats: { type: Number, default: 60 }
  },
  anthropometry: [anthropometrySchema]
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
