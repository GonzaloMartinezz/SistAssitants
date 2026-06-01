import express from 'express';
import Patient from '../models/Patient.js';
import WeeklyPlan from '../models/WeeklyPlan.js';

const router = express.Router();

// GET all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find({}).sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error: error.message });
  }
});

// GET single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Paciente no encontrado' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el paciente', error: error.message });
  }
});

// POST create new patient
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, sport, level, trainingFrequency, target, macros, anthropometry } = req.body;
    
    // Check if email already registered
    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Ya existe un paciente registrado con este correo' });
    }

    const newPatient = new Patient({
      name,
      email,
      phone,
      sport,
      level,
      trainingFrequency: Number(trainingFrequency),
      target,
      macros: {
        cals: Number(macros?.cals || 2000),
        protein: Number(macros?.protein || 130),
        carbs: Number(macros?.carbs || 220),
        fats: Number(macros?.fats || 60)
      },
      anthropometry: anthropometry ? [anthropometry] : []
    });

    const savedPatient = await newPatient.save();

    // Crear plan semanal vacío por defecto para este paciente
    const defaultPlan = new WeeklyPlan({
      patientId: savedPatient._id,
      days: {
        Lunes: {},
        Martes: {},
        Miércoles: {},
        Jueves: {},
        Viernes: {},
        Sábado: {},
        Domingo: {}
      }
    });
    await defaultPlan.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el paciente', error: error.message });
  }
});

// POST add anthropometry log to patient
router.post('/:id/anthropometry', async (req, res) => {
  try {
    const { weight, height, bodyFat, muscleMass, date } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Paciente no encontrado' });

    patient.anthropometry.push({
      weight: Number(weight),
      height: Number(height),
      bodyFat: Number(bodyFat),
      muscleMass: Number(muscleMass),
      date: date ? new Date(date) : new Date()
    });

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar registro de antropometría', error: error.message });
  }
});

// PUT update patient details (including macros)
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, sport, level, trainingFrequency, target, macros } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Paciente no encontrado' });

    patient.name = name || patient.name;
    patient.email = email || patient.email;
    patient.phone = phone !== undefined ? phone : patient.phone;
    patient.sport = sport || patient.sport;
    patient.level = level || patient.level;
    patient.trainingFrequency = trainingFrequency !== undefined ? Number(trainingFrequency) : patient.trainingFrequency;
    patient.target = target || patient.target;

    if (macros) {
      patient.macros = {
        cals: Number(macros.cals || patient.macros.cals),
        protein: Number(macros.protein || patient.macros.protein),
        carbs: Number(macros.carbs || patient.macros.carbs),
        fats: Number(macros.fats || patient.macros.fats)
      };
    }

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el paciente', error: error.message });
  }
});

// DELETE patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Paciente no encontrado' });

    await Patient.findByIdAndDelete(req.params.id);
    
    // También borrar su plan semanal asociado
    await WeeklyPlan.findOneAndDelete({ patientId: req.params.id });

    res.json({ message: 'Paciente y su planificación semanal eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
});

export default router;
