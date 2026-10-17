import { useState, useMemo } from 'react';
import { Salad, ListChecks, RotateCcw, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { SettingsModal } from '@/components/SettingsModal';
import { ProfileForm } from '@/components/ProfileForm';
import { MealPlanDashboard } from '@/components/MealPlanDashboard';
import { GroceryList } from '@/components/GroceryList';
import type { UserProfile, WeeklyPlan } from '@/types';
import { generateWeeklyPlan, aggregateGroceries } from '@/lib/mealGenerator';

const API_KEY_STORE = 'hh_gemini_key';

type View = 'form' | 'plan';

function App() {
  const [view, setView] = useState<View>('form');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(
    () => localStorage.getItem(API_KEY_STORE) || ''
  );
  const [activeTab, setActiveTab] = useState<'meals' | 'groceries'>('meals');

  const groceryGroups = useMemo(
    () => (plan ? aggregateGroceries(plan) : []),
    [plan]
  );

  const handleGenerate = async (p: UserProfile) => {
    setLoading(true);
    setProfile(p);
    try {
      const result = await generateWeeklyPlan(p, { apiKey });
      setPlan(result);
      setView('plan');
      setActiveTab('meals');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    if (key) localStorage.setItem(API_KEY_STORE, key);
    else localStorage.removeItem(API_KEY_STORE);
    setSettingsOpen(false);
  };

  const handleClearKey = () => {
    setApiKey('');
    localStorage.removeItem(API_KEY_STORE);
  };

  const handleReset = () => {
    setView('form');
    setPlan(null);
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Header onOpenSettings={() => setSettingsOpen(true)} apiKeySet={!!apiKey} />

      <main className="px-4 py-8 sm:px-6 sm:py-10">
        {view === 'form' && (
          <div>
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Nutrition
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your personalized weekly meal plan,
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {' '}in seconds
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-gray-500">
                Tell us your goals and dietary preferences. We'll generate a
                full 7-day meal plan with macros and a ready-to-shop grocery
                list.
              </p>
            </div>
            <ProfileForm onGenerate={handleGenerate} loading={loading} />
          </div>
        )}

        {view === 'plan' && plan && (
          <div>
            <div className="mx-auto mb-6 flex max-w-4xl items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Your Weekly Meal Plan
                </h2>
                {profile && (
                  <p className="text-sm text-gray-500">
                    {profile.goal} · {profile.dietType} · {profile.calorieTarget} kcal/day
                  </p>
                )}
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">New Plan</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="mx-auto mb-6 flex max-w-4xl gap-2">
              <TabButton
                active={activeTab === 'meals'}
                onClick={() => setActiveTab('meals')}
                icon={<Salad className="h-4 w-4" />}
                label="Meal Plan"
              />
              <TabButton
                active={activeTab === 'groceries'}
                onClick={() => setActiveTab('groceries')}
                icon={<ListChecks className="h-4 w-4" />}
                label="Grocery List"
              />
            </div>

            {activeTab === 'meals' ? (
              <MealPlanDashboard days={plan.days} />
            ) : (
              <GroceryList groups={groceryGroups} />
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-emerald-50 px-4 py-6 text-center">
        <p className="text-xs font-medium text-gray-400">
          Student Project: Raghav Ghai | Generative AI Track
        </p>
      </footer>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKey={apiKey}
        onSave={handleSaveKey}
        onClear={handleClearKey}
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
          : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default App;
