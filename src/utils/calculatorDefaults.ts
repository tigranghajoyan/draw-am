import type { CalculatorItemState, ApartmentDetails } from '@/types';

export const DEFAULT_ITEM_STATE: CalculatorItemState = {
  quantity: 0,
  materialCostOverride: null,
  serviceCostOverride: null,
};

export const DEFAULT_APARTMENT: ApartmentDetails = {
  area: 0,
  rooms: 1,
  bathrooms: 1,
};
