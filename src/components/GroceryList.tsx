import { useMemo, useState } from 'react';
import {
  ShoppingCart,
  Download,
  Copy,
  Check,
  Carrot,
  Beef,
  Wheat,
  FlaskConical,
} from 'lucide-react';
import type { GroceryCategory } from '@/types';

interface GroceryItem {
  name: string;
  qty: number;
  checked: boolean;
}

interface GroceryGroup {
  category: string;
  items: GroceryItem[];
}

interface GroceryListProps {
  groups: GroceryGroup[];
}

const CAT_ICONS: Record<string, React.ReactNode> = {
  Produce: <Carrot className="h-4 w-4" />,
  'Protein & Dairy': <Beef className="h-4 w-4" />,
  'Grains & Pantry': <Wheat className="h-4 w-4" />,
  Spices: <FlaskConical className="h-4 w-4" />,
};

const CAT_COLORS: Record<string, string> = {
  Produce: 'bg-green-100 text-green-700',
  'Protein & Dairy': 'bg-rose-100 text-rose-700',
  'Grains & Pantry': 'bg-amber-100 text-amber-700',
  Spices: 'bg-violet-100 text-violet-700',
};

export function GroceryList({ groups }: GroceryListProps) {
  const [items, setItems] = useState<GroceryGroup[]>(() =>
    groups.map((g) => ({ ...g, items: [...g.items] }))
  );
  const [copied, setCopied] = useState(false);

  const totalItems = useMemo(
    () => items.reduce((s, g) => s + g.items.length, 0),
    [items]
  );
  const checkedCount = useMemo(
    () => items.reduce((s, g) => s + g.items.filter((i) => i.checked).length, 0),
    [items]
  );

  const toggle = (cat: string, name: string) => {
    setItems((prev) =>
      prev.map((g) =>
        g.category === cat
          ? {
              ...g,
              items: g.items.map((i) =>
                i.name === name ? { ...i, checked: !i.checked } : i
              ),
            }
          : g
      )
    );
  };

  const buildText = () => {
    let text = 'HungryHackers - Grocery List\n';
    text += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    for (const g of items) {
      const list = g.items
        .map((i) => `  [${i.checked ? 'x' : ' '}] ${i.name}${i.qty > 1 ? ` (${i.qty})` : ''}`)
        .join('\n');
      text += `${g.category}\n${list}\n\n`;
    }
    return text;
  };

  const handleDownload = () => {
    const blob = new Blob([buildText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hungryhackers-grocery-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-50/50 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <ShoppingCart className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-gray-900">Grocery List</h3>
            <p className="text-xs text-gray-500">
              {checkedCount} of {totalItems} items checked off
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
          >
            <Download className="h-4 w-4" />
            Export .txt
          </button>
        </div>
      </div>

      {/* Progress */}
      {totalItems > 0 && (
        <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
            style={{ width: `${(checkedCount / totalItems) * 100}%` }}
          />
        </div>
      )}

      <div className="space-y-5">
        {items.map((g) => (
          <div key={g.category}>
            <div className="mb-2.5 flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${CAT_COLORS[g.category] || 'bg-gray-100 text-gray-600'}`}
              >
                {CAT_ICONS[g.category] || <FlaskConical className="h-4 w-4" />}
              </span>
              <h4 className="text-sm font-bold text-gray-800">{g.category}</h4>
              <span className="text-xs text-gray-400">({g.items.length})</span>
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {g.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => toggle(g.category, item.name)}
                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
                    item.checked
                      ? 'border-gray-100 bg-gray-50'
                      : 'border-gray-200 bg-white hover:border-emerald-200'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                      item.checked
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {item.checked && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span
                    className={`text-sm font-medium transition ${
                      item.checked
                        ? 'text-gray-400 line-through'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.qty > 1 && (
                    <span className="ml-auto text-xs font-semibold text-emerald-600">
                      ×{item.qty}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
