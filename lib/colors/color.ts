export type Color = {
  name: string;
  startRgb: string;
  stopRgb: string;
}

export const allColors: Color[] = [
  {
    name: 'megaman',
    startRgb: '#38bdf8',
    stopRgb: '#3b82f6',
  },
  {
    name: 'sambucus',
    startRgb: '#111827',
    stopRgb: '#4b5563',
  },
  {
    name: 'daffodil',
    startRgb: '#fef08a',
    stopRgb: '#facc15',
  },
  {
    name: 'fuchsia',
    startRgb: '#6b21a8',
    stopRgb: '#c084fc',
  },
  {
    name: 'popGum',
    startRgb: '#f472b6',
    stopRgb: '#db2777',
  },
  {
    name: 'vanilla',
    startRgb: '#ffe4e6',
    stopRgb: '#ccfbf1',
  },
  {
    name: 'green',
    startRgb: '#10b981',
    stopRgb: '#65a30d',
  },
  {
    name: 'orange',
    startRgb: '#ea580c',
    stopRgb: '#f97316',
  }
]

export function getColorByName(name: string): Color {
  const color = allColors.find(color => color.name === name);
  return color ? color : allColors[0];
}