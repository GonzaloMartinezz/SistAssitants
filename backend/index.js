import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import weeklyPlanRoutes from './routes/weeklyPlanRoutes.js';
import Recipe from './models/Recipe.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/weekly-plans', weeklyPlanRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Guadalupe NutriSalud API is running... ⚡');
});

// Seed data function for Recipes
const seedRecipes = async () => {
  try {
    const count = await Recipe.countDocuments();
    if (count === 0) {
      console.log('Seeding initial recipes into MongoDB...');
      const SEED_RECIPES = [
        {
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
      await Recipe.insertMany(SEED_RECIPES);
      console.log('Seseeded 8 initial recipes successfully! 🥗');
    }
  } catch (error) {
    console.error('Error seeding recipes:', error.message);
  }
};

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} 🚀`);
  await seedRecipes();
});
