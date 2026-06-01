import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las recetas', error: error.message });
  }
});

// GET single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la receta', error: error.message });
  }
});

// POST new recipe
router.post('/', async (req, res) => {
  try {
    const { title, category, time, cals, protein, carbs, fats, desc, ingredients, steps } = req.body;
    
    const newRecipe = new Recipe({
      title,
      category,
      time: Number(time),
      cals: Number(cals),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      desc,
      ingredients,
      steps
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la receta', error: error.message });
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la receta', error: error.message });
  }
});

export default router;
