import { UtensilsCrossed, Settings, Github } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  apiKeySet: boolean;
}

export function Header({ onOpenSettings, apiKeySet }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-200">
              <UtensilsCrossed className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                HungryHackers
              </h1>
              <p className="text-xs font-medium text-emerald-600">
                AI Personalized Diet Planner
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 ring-1 ring-amber-200 sm:flex">
              <Github className="h-3.5 w-3.5 text-amber-700" />
              <span className="text-xs font-semibold text-amber-800">
                Student Project: Raghav Ghai | Generative AI Track
              </span>
            </div>
            <button
              onClick={onOpenSettings}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
              {apiKeySet && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
