export type Goal =
  | 'Weight Loss'
  | 'Muscle Gain'
  | 'Maintenance'
  | 'Keto'
  | 'Athletic Performance';

export type DietType =
  | 'Vegetarian'
  | 'Vegan'
  | 'Non-Vegetarian'
  | 'Eggetarian'
  | 'Pescatarian';

export type ActivityLevel =
  | 'Sedentary'
  | 'Lightly Active'
  | 'Moderately Active'
  | 'Very Active'
  | 'Extra Active';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export type GroceryCategory =
  | 'Produce'
  | 'Protein & Dairy'
  | 'Grains & Pantry'
  | 'Spices';

export interface FoodItem {
  name: string;
  category: GroceryCategory;
}

export interface Meal {
  type: MealType;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: FoodItem[];
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface WeeklyPlan {
  days: DayPlan[];
}

export interface UserProfile {
  goal: Goal;
  dietType: DietType;
  allergies: string[];
  customAllergies: string;
  calorieTarget: number;
  activityLevel: ActivityLevel;
}

export const COMMON_ALLERGENS = [
  'Gluten',
  'Peanuts',
  'Dairy',
  'Shellfish',
  'Soy',
  'Tree Nuts',
  'Eggs',
  'Sesame',
] as const;

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const GOALS: Goal[] = [
  'Weight Loss',
  'Muscle Gain',
  'Maintenance',
  'Keto',
  'Athletic Performance',
];

export const DIET_TYPES: DietType[] = [
  'Vegetarian',
  'Vegan',
  'Non-Vegetarian',
  'Eggetarian',
  'Pescatarian',
];

export const ACTIVITY_LEVELS: ActivityLevel[] = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
  'Extra Active',
];
