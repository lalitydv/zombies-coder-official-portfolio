export const colors = {
  main: {
    primary: '#22c55e', // green
    secondary: '#3b82f6', // blue
  },
  categories: [
    '#f87171', // red
    '#fbbf24', // amber
    '#34d399', // emerald
    '#60a5fa', // blue
    '#a78bfa', // violet
    '#f472b6', // pink
    '#facc15', // yellow
    '#22d3ee', // cyan
    '#f97316', // orange
    '#818cf8', // indigo
    '#fb7185', // rose
    '#84cc16', // lime
    '#14b8a6', // teal
    '#8b5cf6', // purple
    '#ec4899', // fuchsia
    '#06b6d4', // sky
    '#f59e0b', // amber-dark
    '#10b981', // green-dark
    '#6366f1', // indigo-dark
    '#ef4444', // red-dark
    '#3b82f6', // blue-dark
    '#8b5cf6', // purple-dark
    '#ec4899', // pink-dark
    '#14b8a6', // teal-dark
    '#f59e0b', // orange-dark
    '#84cc16', // lime-dark
    '#06b6d4', // cyan-dark
    '#a855f7', // purple-light
    '#e879f9', // fuchsia-light
    '#38bdf8', // sky-light
    '#4ade80', // green-light
    '#fbbf24', // yellow-light
    '#fb923c', // orange-light
    '#f87171', // red-light
    '#60a5fa', // blue-light
    '#a78bfa', // violet-light
    '#c084fc', // purple-light
    '#f472b6', // pink-light
    '#2dd4bf', // teal-light
    '#34d399', // emerald-light
    '#86efac', // green-lighter
    '#fde047', // yellow-lighter
    '#fdba74', // orange-lighter
    '#fca5a5', // red-lighter
    '#93c5fd', // blue-lighter
    '#c4b5fd', // violet-lighter
    '#d8b4fe', // purple-lighter
    '#f9a8d4', // pink-lighter
    '#5eead4', // teal-lighter
    '#6ee7b7', // emerald-lighter
  ],
};

export function getCategoryColor(index) {
  return colors.categories[index % colors.categories.length];
}

