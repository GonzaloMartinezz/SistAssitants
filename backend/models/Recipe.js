import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['pre', 'post', 'snack', 'almuerzo']
  },
  time: {
    type: Number,
    required: true,
    default: 15
  },
  cals: {
    type: Number,
    required: true,
    default: 0
  },
  protein: {
    type: Number,
    required: true,
    default: 0
  },
  carbs: {
    type: Number,
    required: true,
    default: 0
  },
  fats: {
    type: Number,
    required: true,
    default: 0
  },
  desc: {
    type: String,
    required: true
  },
  ingredients: [String],
  steps: [String]
}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
