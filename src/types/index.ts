import type { L } from '@/i18n/types';
export type { L };

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: number;
  category: L;
  status: L;
  description: L;
  fullDescription: L;
  image: string;
  gallery: string[];
  client: L;
  area: string;
  subcategory?: L;
  visualization?: string;
}

export interface TeamMember {
  name: string;
  role: L;
  image: string;
  bio: L;
}

export interface Service {
  icon: string;
  title: L;
  description: L;
  features: L<string[]>;
}

export interface ProcessStep {
  number: number;
  title: L;
  description: L;
}

export interface Testimonial {
  quote: L;
  author: string;
  role: L;
  company: L;
}

// Calculator types
export type MeasurementUnit = 'm²' | 'm (linear)' | 'pcs' | 'meter' | 'point';

export interface CalculatorWorkItem {
  id: string;
  name: L;
  unit: MeasurementUnit;
  defaultMaterialCost: number;
  defaultServiceCost: number;
  image: string;
}

export type ServiceType = 'architectural' | 'interior';

export interface CalculatorCategory {
  id: string;
  name: L;
  icon: string;
  serviceType: ServiceType;
  items: CalculatorWorkItem[];
}

export interface CalculatorItemState {
  quantity: number;
  materialCostOverride: number | null;
  serviceCostOverride: number | null;
}

// Apartment configurator types
export type PackageType = 'affordable' | 'luxury' | 'individual';

export interface ApartmentDetails {
  area: number;       // m²
  rooms: number;
  bathrooms: number;
}

export interface PackageItemCosts {
  materialCost: number;
  serviceCost: number;
}

export interface PackageDefinition {
  id: PackageType;
  name: L;
  description: L;
  icon: string;
  designCostPerSqm: number;
  itemCosts: Record<string, PackageItemCosts>;
}
