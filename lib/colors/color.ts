export type Color = {
  name: string;
  startRgb: string;
  stopRgb: string;
}

export const allColors: Color[] = [
  {
    name: 'white',
    startRgb: '#ffffff',
    stopRgb: '#d7e1ec',
  },
  {
    name: 'sambucus',
    startRgb: '#111827',
    stopRgb: '#4b5563',
  },
  {
    name: 'megaman',
    startRgb: '#d0fdd5',
    stopRgb: '#b6e7bb',
  },
  {
    name: 'daffodil',
    startRgb: '#c4bebb',
    stopRgb: '#aaa4a0',
  },
  {
    name: 'fuchsia',
    startRgb: '#9ab3d7',
    stopRgb: '#7c97be',
  },
  {
    name: 'popGum',
    startRgb: '#d8beb0',
    stopRgb: '#c7ab98',
  },
  {
    name: 'vanilla',
    startRgb: '#ffe4e6',
    stopRgb: '#ccfbf1',
  },
  {
    name: 'orange',
    startRgb: '#ec896b',
    stopRgb: '#da613e',
  },
  {
    name: 'green',
    startRgb: '#5cbbc1',
    stopRgb: '#469ca1',
  }
]

export function getColorByName(name: string): Color {
  const color = allColors.find(color => color.name === name);
  return color ? color : allColors[0];
}


export function hexToRgb(hex: string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return 'rgb(255, 255, 255)';
  }

  return `rgb(${ parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
}