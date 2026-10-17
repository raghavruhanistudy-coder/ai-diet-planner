import type { DietType, GroceryCategory, MealType, FoodItem } from '@/types';

export interface MealTemplate {
  name: string;
  description: string;
  baseCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: FoodItem[];
  dietTypes: DietType[];
  tags: string[];
}

const P: (n: string) => FoodItem = (n) => ({ name: n, category: 'Produce' });
const PD: (n: string) => FoodItem = (n) => ({ name: n, category: 'Protein & Dairy' });
const GP: (n: string) => FoodItem = (n) => ({ name: n, category: 'Grains & Pantry' });
const S: (n: string) => FoodItem = (n) => ({ name: n, category: 'Spices' });

export const MEAL_TEMPLATES: Record<MealType, MealTemplate[]> = {
  Breakfast: [
    {
      name: 'Avocado Toast on Whole Grain',
      description: 'Toasted whole grain bread topped with mashed avocado, cherry tomatoes, and a sprinkle of chia seeds.',
      baseCalories: 380,
      protein: 14,
      carbs: 42,
      fats: 18,
      ingredients: [P('Avocado'), P('Cherry Tomatoes'), GP('Whole Grain Bread'), S('Chia Seeds'), S('Black Pepper')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-fiber'],
    },
    {
      name: 'Greek Yogurt Power Bowl',
      description: 'Creamy Greek yogurt layered with mixed berries, oats, and a drizzle of honey.',
      baseCalories: 340,
      protein: 24,
      carbs: 45,
      fats: 8,
      ingredients: [PD('Greek Yogurt'), P('Mixed Berries'), GP('Rolled Oats'), GP('Honey'), S('Cinnamon')],
      dietTypes: ['Vegetarian', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein'],
    },
    {
      name: 'Veggie Scramble with Spinach',
      description: 'Fluffy eggs scrambled with fresh spinach, bell peppers, and feta cheese.',
      baseCalories: 360,
      protein: 26,
      carbs: 12,
      fats: 22,
      ingredients: [PD('Eggs'), P('Spinach'), P('Bell Peppers'), PD('Feta Cheese'), S('Black Pepper')],
      dietTypes: ['Vegetarian', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein', 'low-carb'],
    },
    {
      name: 'Oatmeal Banana Smoothie Bowl',
      description: 'Thick blended oatmeal and banana bowl topped with sliced almonds and flaxseed.',
      baseCalories: 320,
      protein: 12,
      carbs: 58,
      fats: 9,
      ingredients: [GP('Rolled Oats'), P('Banana'), P('Almond Milk'), GP('Flaxseed'), S('Cinnamon')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-fiber'],
    },
    {
      name: 'Smoked Salmon & Avocado Plate',
      description: 'Smoked salmon served with avocado slices, cucumber, and a lemon wedge.',
      baseCalories: 350,
      protein: 28,
      carbs: 8,
      fats: 22,
      ingredients: [PD('Smoked Salmon'), P('Avocado'), P('Cucumber'), P('Lemon'), S('Black Pepper')],
      dietTypes: ['Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein', 'low-carb', 'keto'],
    },
    {
      name: 'Tofu Veggie Scramble',
      description: 'Crumbled tofu sautéed with turmeric, onions, and bell peppers for a plant-based start.',
      baseCalories: 300,
      protein: 20,
      carbs: 14,
      fats: 16,
      ingredients: [PD('Tofu'), P('Onion'), P('Bell Peppers'), S('Turmeric'), S('Nutritional Yeast')],
      dietTypes: ['Vegan', 'Vegetarian'],
      tags: ['high-protein', 'plant-based'],
    },
  ],
  Lunch: [
    {
      name: 'Grilled Chicken Quinoa Bowl',
      description: 'Juicy grilled chicken over quinoa with roasted vegetables and tahini dressing.',
      baseCalories: 520,
      protein: 42,
      carbs: 55,
      fats: 16,
      ingredients: [PD('Chicken Breast'), GP('Quinoa'), P('Sweet Potato'), P('Zucchini'), S('Tahini'), S('Olive Oil')],
      dietTypes: ['Non-Vegetarian', 'Eggetarian', 'Pescatarian'],
      tags: ['high-protein'],
    },
    {
      name: 'Mediterranean Chickpea Salad',
      description: 'Chickpeas tossed with cucumber, tomatoes, olives, and a lemon-herb vinaigrette.',
      baseCalories: 440,
      protein: 18,
      carbs: 62,
      fats: 15,
      ingredients: [GP('Chickpeas'), P('Cucumber'), P('Cherry Tomatoes'), P('Kalamata Olives'), P('Red Onion'), S('Lemon Juice'), S('Oregano')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-fiber', 'plant-based'],
    },
    {
      name: 'Salmon & Brown Rice Plate',
      description: 'Baked salmon fillet with brown rice and steamed broccoli.',
      baseCalories: 540,
      protein: 40,
      carbs: 48,
      fats: 18,
      ingredients: [PD('Salmon Fillet'), GP('Brown Rice'), P('Broccoli'), S('Olive Oil'), S('Lemon Juice')],
      dietTypes: ['Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein', 'omega-3'],
    },
    {
      name: 'Black Bean & Sweet Potato Wrap',
      description: 'Hearty wrap filled with black beans, roasted sweet potato, and greens.',
      baseCalories: 480,
      protein: 18,
      carbs: 72,
      fats: 14,
      ingredients: [GP('Black Beans'), P('Sweet Potato'), GP('Whole Wheat Tortilla'), P('Mixed Greens'), S('Cumin'), S('Avocado')],
      dietTypes: ['Vegetarian', 'Vegan'],
      tags: ['high-fiber', 'plant-based'],
    },
    {
      name: 'Turkey & Avocado Club Salad',
      description: 'Sliced turkey breast with avocado, bacon bits, and mixed greens in a light ranch.',
      baseCalories: 500,
      protein: 38,
      carbs: 20,
      fats: 28,
      ingredients: [PD('Turkey Breast'), P('Avocado'), P('Mixed Greens'), PD('Bacon'), S('Ranch Dressing')],
      dietTypes: ['Non-Vegetarian'],
      tags: ['high-protein', 'low-carb'],
    },
    {
      name: 'Paneer Tikka Masala with Cauliflower Rice',
      description: 'Spiced paneer in tomato gravy served over fluffy cauliflower rice.',
      baseCalories: 460,
      protein: 26,
      carbs: 22,
      fats: 30,
      ingredients: [PD('Paneer'), P('Cauliflower'), P('Tomato'), P('Onion'), S('Garam Masala'), S('Turmeric'), S('Ginger')],
      dietTypes: ['Vegetarian', 'Eggetarian'],
      tags: ['low-carb', 'keto'],
    },
  ],
  Dinner: [
    {
      name: 'Herb-Crusted Chicken with Roasted Veggies',
      description: 'Oven-baked herb-crusted chicken with roasted carrots and Brussels sprouts.',
      baseCalories: 560,
      protein: 46,
      carbs: 32,
      fats: 24,
      ingredients: [PD('Chicken Thigh'), P('Carrots'), P('Brussels Sprouts'), S('Rosemary'), S('Olive Oil'), S('Garlic')],
      dietTypes: ['Non-Vegetarian', 'Eggetarian', 'Pescatarian'],
      tags: ['high-protein'],
    },
    {
      name: 'Lentil Dal with Basmati Rice',
      description: 'Comforting red lentil dal tempered with cumin and served with basmati rice.',
      baseCalories: 500,
      protein: 22,
      carbs: 78,
      fats: 10,
      ingredients: [GP('Red Lentils'), GP('Basmati Rice'), P('Tomato'), P('Onion'), S('Cumin'), S('Turmeric'), S('Garlic')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-fiber', 'plant-based'],
    },
    {
      name: 'Garlic Butter Shrimp with Zucchini Noodles',
      description: 'Sautéed shrimp in garlic butter over spiralized zucchini noodles.',
      baseCalories: 420,
      protein: 36,
      carbs: 14,
      fats: 24,
      ingredients: [PD('Shrimp'), P('Zucchini'), S('Garlic'), S('Butter'), S('Red Pepper Flakes'), P('Lemon')],
      dietTypes: ['Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein', 'low-carb', 'keto'],
    },
    {
      name: 'Stuffed Bell Peppers with Quinoa',
      description: 'Bell peppers stuffed with quinoa, black beans, and corn, baked with cheese.',
      baseCalories: 480,
      protein: 20,
      carbs: 64,
      fats: 16,
      ingredients: [P('Bell Peppers'), GP('Quinoa'), GP('Black Beans'), P('Corn'), PD('Cheddar Cheese'), S('Cumin')],
      dietTypes: ['Vegetarian', 'Eggetarian'],
      tags: ['high-fiber'],
    },
    {
      name: 'Vegan Buddha Bowl with Tahini',
      description: 'Roasted chickpeas, sweet potato, kale, and brown rice drizzled with tahini.',
      baseCalories: 520,
      protein: 20,
      carbs: 78,
      fats: 18,
      ingredients: [GP('Chickpeas'), P('Sweet Potato'), P('Kale'), GP('Brown Rice'), S('Tahini'), S('Olive Oil')],
      dietTypes: ['Vegan', 'Vegetarian'],
      tags: ['high-fiber', 'plant-based'],
    },
    {
      name: 'Beef Stir-Fry with Broccoli',
      description: 'Lean beef strips stir-fried with broccoli, ginger, and soy sauce over rice.',
      baseCalories: 580,
      protein: 44,
      carbs: 52,
      fats: 22,
      ingredients: [PD('Lean Beef'), P('Broccoli'), GP('Jasmine Rice'), S('Ginger'), S('Soy Sauce'), S('Garlic')],
      dietTypes: ['Non-Vegetarian'],
      tags: ['high-protein'],
    },
  ],
  Snacks: [
    {
      name: 'Mixed Nuts & Apple',
      description: 'A handful of mixed nuts paired with a fresh sliced apple.',
      baseCalories: 220,
      protein: 7,
      carbs: 24,
      fats: 13,
      ingredients: [PD('Mixed Nuts'), P('Apple')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-fiber'],
    },
    {
      name: 'Hummus & Veggie Sticks',
      description: 'Creamy hummus with carrot and cucumber sticks for dipping.',
      baseCalories: 180,
      protein: 8,
      carbs: 22,
      fats: 8,
      ingredients: [GP('Hummus'), P('Carrot'), P('Cucumber')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['plant-based'],
    },
    {
      name: 'Hard-Boiled Eggs & Berries',
      description: 'Two hard-boiled eggs with a side of fresh mixed berries.',
      baseCalories: 200,
      protein: 14,
      carbs: 14,
      fats: 10,
      ingredients: [PD('Eggs'), P('Mixed Berries')],
      dietTypes: ['Vegetarian', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein', 'low-carb'],
    },
    {
      name: 'Protein Smoothie',
      description: 'Blended protein shake with banana, almond milk, and a scoop of protein powder.',
      baseCalories: 240,
      protein: 28,
      carbs: 26,
      fats: 5,
      ingredients: [PD('Protein Powder'), P('Banana'), P('Almond Milk')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein'],
    },
    {
      name: 'Edamame & Green Tea',
      description: 'Steamed edamame pods lightly salted with a cup of green tea.',
      baseCalories: 150,
      protein: 12,
      carbs: 14,
      fats: 6,
      ingredients: [GP('Edamame'), S('Sea Salt')],
      dietTypes: ['Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['plant-based', 'low-cal'],
    },
    {
      name: 'Cottage Cheese with Pineapple',
      description: 'Low-fat cottage cheese topped with fresh pineapple chunks.',
      baseCalories: 180,
      protein: 18,
      carbs: 18,
      fats: 4,
      ingredients: [PD('Cottage Cheese'), P('Pineapple')],
      dietTypes: ['Vegetarian', 'Eggetarian', 'Pescatarian', 'Non-Vegetarian'],
      tags: ['high-protein'],
    },
  ],
};

export function isAllergenSafe(ingredients: FoodItem[], allergies: string[]): boolean {
  if (allergies.length === 0) return true;
  const lowered = allergies.map((a) => a.toLowerCase());
  return !ingredients.some((ing) =>
    lowered.some((a) => ing.name.toLowerCase().includes(a))
  );
}

export function filterTemplates(
  templates: MealTemplate[],
  dietType: DietType,
  allergies: string[]
): MealTemplate[] {
  return templates.filter(
    (t) => t.dietTypes.includes(dietType) && isAllergenSafe(t.ingredients, allergies)
  );
}
