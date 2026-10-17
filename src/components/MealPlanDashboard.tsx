import { useState } from 'react';
import {
  Sun,
  Soup,
  Moon,
  Apple,
  ChevronDown,
} from 'lucide-react';
import type { DayPlan, Meal, MealType } from '@/types';

interface MealPlanDashboardProps {
  days: DayPlan[];
}

const MEAL_ICONS: Record<MealType, React.ReactNode> = {
  Breakfast: <Sun className="h-4 w-4" />,
  Lunch: <Soup className="h-4 w-4" />,
  Dinner: <Moon className="h-4 w-4" />,
  Snacks: <Apple className="h-4 w-4" />,
};

const MEAL_COLORS: Record<MealType, string> = {
  Breakfast: 'bg-amber-100 text-amber-700',
  Lunch: 'bg-sky-100 text-sky-700',
  Dinner: 'bg-indigo-100 text-indigo-700',
  Snacks: 'bg-rose-100 text-rose-700',
};

export function MealPlanDashboard({ days }: MealPlanDashboardProps) {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];
  if (!day) return null;

  const dayCal = day.meals.reduce((s, m) => s + m.calories, 0);
  const dayP = day.meals.reduce((s, m) => s + m.protein, 0);
  const dayC = day.meals.reduce((s, m) => s + m.carbs, 0);
  const dayF = day.meals.reduce((s, m) => s + m.fats, 0);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Day Tabs */}
      <div className="mb-5 flex gap-1.5 overflow-x-auto pb-2">
        {days.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(i)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeDay === i
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            {d.day.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Day Summary */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-white shadow-lg shadow-emerald-100">
        <div>
          <h3 className="text-lg font-bold">{day.day}</h3>
          <p className="text-xs text-emerald-100">Daily nutritional summary</p>
        </div>
        <div className="flex gap-4 text-center">
          <Stat label="Calories" value={`${dayCal}`} />
          <Stat label="Protein" value={`${dayP}g`} />
          <Stat label="Carbs" value={`${dayC}g`} />
          <Stat label="Fats" value={`${dayF}g`} />
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-3">
        {day.meals.map((meal, idx) => (
          <MealCard key={idx} meal={meal} />
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-lg font-bold leading-none">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-emerald-100">
        {label}
      </div>
    </div>
  );
}

function MealCard({ meal }: { meal: Meal }) {
  const [open, setOpen] = useState(false);
  const macroTotal = meal.protein + meal.carbs + meal.fats || 1;
  const pPct = (meal.protein / macroTotal) * 100;
  const cPct = (meal.carbs / macroTotal) * 100;
  const fPct = (meal.fats / macroTotal) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${MEAL_COLORS[meal.type]}`}
        >
          {MEAL_ICONS[meal.type]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {meal.type}
          </p>
          <h4 className="truncate text-base font-bold text-gray-900">
            {meal.name}
          </h4>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <span className="text-lg font-bold text-emerald-600">
            {meal.calories}
          </span>
          <span className="ml-1 text-xs text-gray-400">kcal</span>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="border-t border-gray-50 px-5 py-4">
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            {meal.description}
          </p>

          {/* Macro Bar */}
          <div className="mb-2 flex h-2.5 w-full overflow-hidden rounded-full">
            <div className="bg-sky-500" style={{ width: `${pPct}%` }} />
            <div className="bg-amber-500" style={{ width: `${cPct}%` }} />
            <div className="bg-rose-400" style={{ width: `${fPct}%` }} />
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <MacroPill color="bg-sky-500" label="Protein" value={`${meal.protein}g`} />
            <MacroPill color="bg-amber-500" label="Carbs" value={`${meal.carbs}g`} />
            <MacroPill color="bg-rose-400" label="Fats" value={`${meal.fats}g`} />
          </div>

          {/* Ingredients */}
          <div className="mt-4">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Ingredients
            </p>
            <div className="flex flex-wrap gap-1.5">
              {meal.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-100"
                >
                  {ing.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MacroPill({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}
