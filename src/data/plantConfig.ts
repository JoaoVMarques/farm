import wheat1 from '../assets/plants/wheat/wheat1.png';
import wheat2 from '../assets/plants/wheat/wheat2.png';
import wheat3 from '../assets/plants/wheat/wheat3.png';
import wheat4 from '../assets/plants/wheat/wheat4.png';
import wheat5 from '../assets/plants/wheat/wheat5.png';

import { PlantCollection } from '../types/plantsTypes';

export const PLANTS: PlantCollection = {
  wheat: {
    name: 'Trigo',
    growTime: 100,
    sprites: [wheat1, wheat2, wheat3, wheat4, wheat5],
    sellPrice: 10.5,
  },
};

export type PlantType = keyof typeof PLANTS