import { useState } from 'react';
import { X, Key, Info, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  apiKey: string;
  onSave: (key: string) => void;
  onClear: () => void;
}

export function SettingsModal({ open, onClose, apiKey, onSave, onClear }: SettingsModalProps) {
  const [value, setValue] = useState(apiKey);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-bold text-gray-900">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Paste your API key (optional)"
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-sky-50 p-3 ring-1 ring-sky-100">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <p className="text-xs leading-relaxed text-sky-800">
                The app works without a key using a built-in mock generator.
                Add a Gemini key for AI-powered meal plans. Your key stays in
                your browser and is never sent anywhere except Google's API.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-6 py-4">
          {apiKey && (
            <button
              onClick={() => {
                setValue('');
                onClear();
              }}
              className="mr-auto flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Remove key
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(value.trim())}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
