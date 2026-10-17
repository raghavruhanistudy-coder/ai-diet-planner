import { useState } from 'react';
import {
  Sparkles,
  Target,
  Leaf,
  AlertCircle,
  Flame,
  Activity,
  Loader2,
  Check,
} from 'lucide-react';
import type {
  UserProfile,
  Goal,
  DietType,
  ActivityLevel,
} from '@/types';
import {
  GOALS,
  DIET_TYPES,
  ACTIVITY_LEVELS,
  COMMON_ALLERGENS,
} from '@/types';

interface ProfileFormProps {
  onGenerate: (profile: UserProfile) => void;
  loading: boolean;
}

const DIET_ICONS: Record<DietType, string> = {
  Vegetarian: '🥗',
  Vegan: '🌱',
  'Non-Vegetarian': '🍗',
  Eggetarian: '🥚',
  Pescatarian: '🐟',
};

const DEFAULT_CAL = 2000;

export function ProfileForm({ onGenerate, loading }: ProfileFormProps) {
  const [goal, setGoal] = useState<Goal>('Weight Loss');
  const [dietType, setDietType] = useState<DietType>('Vegetarian');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergies, setCustomAllergies] = useState('');
  const [calorieTarget, setCalorieTarget] = useState(DEFAULT_CAL);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('Moderately Active');

  const toggleAllergy = (a: string) => {
    setAllergies((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      goal,
      dietType,
      allergies,
      customAllergies,
      calorieTarget,
      activityLevel,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-50/50 sm:p-8"
    >
      {/* Goal */}
      <Section icon={<Target className="h-4 w-4" />} label="Primary Goal">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {GOALS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                goal === g
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/40'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </Section>

      {/* Diet Type */}
      <Section icon={<Leaf className="h-4 w-4" />} label="Diet Type">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {DIET_TYPES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDietType(d)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                dietType === d
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/40'
              }`}
            >
              <span>{DIET_ICONS[d]}</span>
              {d}
            </button>
          ))}
        </div>
      </Section>

      {/* Allergies */}
      <Section icon={<AlertCircle className="h-4 w-4" />} label="Allergies / Restrictions">
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGENS.map((a) => {
            const active = allergies.includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => toggleAllergy(a)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {active && <Check className="h-3.5 w-3.5" />}
                {a}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={customAllergies}
          onChange={(e) => setCustomAllergies(e.target.value)}
          placeholder="Other (comma-separated, e.g. Corn, MSG)"
          className="mt-3 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
      </Section>

      {/* Calorie + Activity */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Section icon={<Flame className="h-4 w-4" />} label="Calorie Target">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1200}
              max={4000}
              step={50}
              value={calorieTarget}
              onChange={(e) => setCalorieTarget(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-emerald-600"
            />
            <div className="flex w-20 shrink-0 items-center justify-center rounded-lg bg-emerald-50 py-1.5 text-sm font-bold text-emerald-700">
              {calorieTarget}
        </div>
          </div>
          <p className="mt-1.5 text-xs text-gray-400">kcal / day</p>
        </Section>

        <Section icon={<Activity className="h-4 w-4" />} label="Activity Level">
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          >
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Section>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-200 transition hover:from-emerald-700 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating your weekly plan...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Generate Weekly Meal Plan
          </>
        )}
      </button>
    </form>
  );
}

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          {icon}
        </span>
        <label className="text-sm font-bold text-gray-800">{label}</label>
      </div>
      {children}
    </div>
  );
}
