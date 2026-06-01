import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ day: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los turnos', error: error.message });
  }
});

// POST new booking
router.post('/', async (req, res) => {
  try {
    const { clientName, sport, day, time, date, email } = req.body;
    
    // Check if slot already taken
    const taken = await Booking.findOne({ day, time });
    if (taken) {
      return res.status(400).json({ message: 'Este horario ya está ocupado para ese día' });
    }

    const newBooking = new Booking({
      clientName,
      sport,
      day,
      time,
      date,
      email
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el turno', error: error.message });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Turno no encontrado' });

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el turno', error: error.message });
  }
});

export default router;
