import express from 'express';
import WeeklyPlan from '../models/WeeklyPlan.js';

const router = express.Router();

// Helper to get all populate paths for 7 days x 7 meal slots
const getWeeklyPlanPopulatePaths = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const slots = ['Desayuno', 'PreEntreno', 'Almuerzo', 'Merienda', 'Cena', 'PostEntreno', 'Colacion'];
  const paths = [];
  
  days.forEach(day => {
    slots.forEach(slot => {
      paths.push({ path: `days.${day}.${slot}.recipes` });
    });
  });
  return paths;
};

// GET weekly plan for a patient (creates a default one if it doesn't exist)
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    
    let plan = await WeeklyPlan.findOne({ patientId }).populate(getWeeklyPlanPopulatePaths());
    
    if (!plan) {
      // Create new empty weekly plan
      plan = new WeeklyPlan({
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
      });
      await plan.save();
      // Refetch to get schema defaults
      plan = await WeeklyPlan.findOne({ patientId }).populate(getWeeklyPlanPopulatePaths());
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el plan semanal', error: error.message });
  }
});

// PUT update/save weekly plan for a patient
router.put('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const { days } = req.body;

    let plan = await WeeklyPlan.findOne({ patientId });
    if (!plan) {
      plan = new WeeklyPlan({ patientId, days });
    } else {
      plan.days = days;
    }

    await plan.save();
    
    // Return populated plan
    const populatedPlan = await WeeklyPlan.findOne({ patientId }).populate(getWeeklyPlanPopulatePaths());
    res.json(populatedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar el plan semanal', error: error.message });
  }
});

export default router;
