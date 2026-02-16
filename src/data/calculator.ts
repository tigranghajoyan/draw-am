import type { CalculatorCategory, ApartmentDetails, PackageDefinition } from '@/types';
import data from './calculator.json';

export const calculatorCategories: CalculatorCategory[] = data.categories as CalculatorCategory[];
export const packageDefinitions: PackageDefinition[] = data.packages as PackageDefinition[];

// Quantity derivation rules: how each item's quantity is computed from apartment details
export const quantityRules: Record<string, (d: ApartmentDetails) => number> = {
  // Ceiling
  'ceiling-plasterboard': (d) => d.area,
  'ceiling-plastering-painting': (d) => d.area,
  'ceiling-molding': (d) => Math.round(Math.sqrt(d.area) * 4 * (d.rooms + d.bathrooms) / (d.rooms + d.bathrooms || 1)) || Math.round(Math.sqrt(d.area) * 4),
  'ceiling-stretch': (d) => d.area,

  // Walls — perimeter × height ≈ sqrt(area) × 4 × 2.7
  'walls-stone': (d) => Math.round(d.area * 0.15),
  'walls-gypsum-plastering': (d) => Math.round(d.area * 2.5),
  'walls-plastering-painting': (d) => Math.round(d.area * 2.5),

  // Floor
  'floor-heated': (d) => Math.round(d.area * 0.6),
  'floor-laminate': (d) => d.area,
  'floor-parquet': (d) => d.area,
  'floor-molding': (d) => Math.round(Math.sqrt(d.area) * 4),

  // Doors & Windows
  'doors-interior': (d) => d.rooms + d.bathrooms,
  'doors-hidden': () => 0,
  'windows': (d) => d.rooms,
  'window-sills': (d) => d.rooms,

  // HVAC
  'hvac-boiler': () => 1,
  'hvac-heating-system': (d) => d.rooms + d.bathrooms,
  'hvac-water-pipeline': (d) => d.bathrooms * 3 + d.rooms,

  // Bathroom
  'bathroom-sewage': (d) => d.bathrooms * 3,
  'bathroom-floor-tile': (d) => d.bathrooms * 6,
  'bathroom-wall-tile': (d) => d.bathrooms * 18,
  'bathroom-toilet': (d) => d.bathrooms,
  'bathroom-built-in-toilet': () => 0,
  'bathroom-shower': (d) => d.bathrooms,
  'bathroom-wash-stand': (d) => d.bathrooms,
  'bathroom-faucet': (d) => d.bathrooms * 2,
  'bathroom-shower-cubicle': () => 0,
  'bathroom-bathtub': () => 0,

  // Power
  'power-cables': (d) => Math.round(d.area * 3),
  'power-led-strips': (d) => Math.round(d.area * 0.5),
  'power-pointed-lights': (d) => d.rooms * 4 + d.bathrooms * 2,
  'power-fuse': () => 1,
  'power-sockets': (d) => d.rooms * 5 + d.bathrooms * 2,
  'power-switches': (d) => d.rooms * 2 + d.bathrooms,
  'power-chandelier': (d) => d.rooms,
};
