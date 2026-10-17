import type {
  DayPlan,
  Goal,
  Meal,
  MealType,
  UserProfile,
  WeeklyPlan,
  FoodItem,
} from '@/types';
import { DAYS_OF_WEEK } from '@/types';
import {
  MEAL_TEMPLATES,
  filterTemplates,
} from './foodDatabase';
import type { MealTemplate } from './foodDatabase';

const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const GOAL_MULTIPLIERS: Record<Goal, { cal: number; protein: number; carbs: number; fats: number }> = {
  'Weight Loss': { cal: 0.88, protein: 1.25, carbs: 0.8, fats: 0.85 },
  'Muscle Gain': { cal: 1.08, protein: 1.35, carbs: 1.15, fats: 1.0 },
  Maintenance: { cal: 1.0, protein: 1.0, carbs: 1.0, fats: 1.0 },
  Keto: { cal: 0.95, protein: 1.2, carbs: 0.25, fats: 1.6 },
  'Athletic Performance': { cal: 1.12, protein: 1.25, carbs: 1.25, fats: 0.95 },
};

function pickDistinct<T>(arr: T[], count: number, startIndex: number): T[] {
  const result: T[] = [];
  const pool = [...arr];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = (startIndex + i) % pool.length;
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

function templateToMeal(t: MealTemplate, goal: Goal): Meal {
  const m = GOAL_MULTIPLIERS[goal];
  const round = (n: number) => Math.max(1, Math.round(n));
  return {
    type: 'Breakfast' as MealType,
    name: t.name,
    description: t.description,
    calories: Math.round((t.baseCalories * m.cal) / 10) * 10,
    protein: round(t.protein * m.protein),
    carbs: round(t.carbs * m.carbs),
    fats: round(t.fats * m.fats),
    ingredients: t.ingredients,
  };
}

function buildMockPlan(profile: UserProfile): WeeklyPlan {
  const allergies = [
    ...profile.allergies,
    ...profile.customAllergies
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean),
  ];

  const days: DayPlan[] = DAYS_OF_WEEK.map((day, dayIdx) => {
    const meals: Meal[] = MEAL_TYPES.map((mealType, mealIdx) => {
      const pool = filterTemplates(
        MEAL_TEMPLATES[mealType],
        profile.dietType,
        allergies
      );
      const fallback = MEAL_TEMPLATES[mealType].filter(
        (t) => t.dietTypes.includes(profile.dietType)
      );
      const source = pool.length > 0 ? pool : fallback.length > 0 ? fallback : MEAL_TEMPLATES[mealType];
      const chosen = pickDistinct(source, 1, dayIdx * 2 + mealIdx)[0];
      const meal = templateToMeal(chosen, profile.goal);
      return { ...meal, type: mealType };
    });
    return { day, meals };
  });

  return { days };
}

export interface GenerateOptions {
  apiKey?: string;
  signal?: AbortSignal;
}

export async function generateWeeklyPlan(
  profile: UserProfile,
  opts: GenerateOptions = {}
): Promise<WeeklyPlan> {
  const mock = buildMockPlan(profile);

  if (!opts.apiKey || opts.apiKey.trim().length < 10) {
    await new Promise((r) => setTimeout(r, 1100));
    return mock;
  }

  try {
    const geminiPlan = await callGemini(profile, opts.apiKey!, opts.signal);
    if (geminiPlan) return geminiPlan;
    return mock;
  } catch {
    return mock;
  }
}

async function callGemini(
  profile: UserProfile,
  apiKey: string,
  signal?: AbortSignal
): Promise<WeeklyPlan | null> {
  const prompt = buildPrompt(profile);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
    }),
    signal,
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  return parseGeminiResponse(text, profile);
}

function buildPrompt(p: UserProfile): string {
  return `You are a nutrition AI. Create a 7-day meal plan as STRICT JSON.
Return ONLY a JSON object, no markdown, with this shape:
{"days":[{"day":"Monday","meals":[{"type":"Breakfast","name":"...","description":"...","calories":400,"protein":20,"carbs":45,"fats":12,"ingredients":[{"name":"Oats","category":"Produce"}]}]}]}
Each day must have 4 meals: Breakfast, Lunch, Dinner, Snacks.
Days: Monday through Sunday.
Diet: ${p.dietType}. Goal: ${p.goal}. Daily calorie target: ${p.calorieTarget}.
Allergies to avoid: ${[...p.allergies, p.customAllergies].filter(Boolean).join(', ') || 'none'}.
Ingredient categories must be one of: "Produce","Protein & Dairy","Grains & Pantry","Spices".
Keep descriptions to one sentence. Use realistic, simple ingredient names.`;
}

function parseGeminiResponse(text: string, profile: UserProfile): WeeklyPlan | null {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    if (!parsed.days || !Array.isArray(parsed.days)) return null;

    const validCats = ['Produce', 'Protein & Dairy', 'Grains & Pantry', 'Spices'];
    const days: DayPlan[] = parsed.days.slice(0, 7).map((d: any, i: number) => ({
      day: d.day || DAYS_OF_WEEK[i],
      meals: (d.meals || []).slice(0, 4).map((m: any): Meal => ({
        type: m.type || 'Breakfast',
        name: String(m.name || 'Meal'),
        description: String(m.description || ''),
        calories: Number(m.calories) || 300,
        protein: Number(m.protein) || 10,
        carbs: Number(m.carbs) || 30,
        fats: Number(m.fats) || 10,
        ingredients: (Array.isArray(m.ingredients) ? m.ingredients : [])
          .map((ing: any): FoodItem => ({
            name: String(ing.name || 'Ingredient'),
            category: validCats.includes(ing.category) ? ing.category : 'Produce',
          })),
      })),
    }));

    if (days.length === 0) return null;
    return { days };
  } catch {
    return null;
  }
}

export function aggregateGroceries(plan: WeeklyPlan): {
  category: string;
  items: { name: string; qty: number; checked: boolean }[];
}[] {
  const map = new Map<string, Map<string, number>>();
  const cats = ['Produce', 'Protein & Dairy', 'Grains & Pantry', 'Spices'];
  cats.forEach((c) => map.set(c, new Map()));

  for (const day of plan.days) {
    for (const meal of day.meals) {
      for (const ing of meal.ingredients) {
        const cat = map.has(ing.category) ? ing.category : 'Produce';
        const inner = map.get(cat)!;
        inner.set(ing.name, (inner.get(ing.name) || 0) + 1);
      }
    }
  }

  return cats.map((category) => ({
    category,
    items: Array.from(map.get(category)!.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, qty]) => ({ name, qty, checked: false })),
  }));
}
