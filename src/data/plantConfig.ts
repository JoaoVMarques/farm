import wheatIcon from '../assets/plants/wheat/wheat_seedpack.png';
import wheat1 from '../assets/plants/wheat/wheat1.png';
import wheat2 from '../assets/plants/wheat/wheat2.png';
import wheat3 from '../assets/plants/wheat/wheat3.png';
import wheat4 from '../assets/plants/wheat/wheat4.png';
import wheat5 from '../assets/plants/wheat/wheat5.png';

import carrotIcon from '../assets/plants/carrot/carrot_seedpack.png';
import carrot1 from '../assets/plants/carrot/carrot1.png';
import carrot2 from '../assets/plants/carrot/carrot2.png';
import carrot3 from '../assets/plants/carrot/carrot3.png';
import carrot4 from '../assets/plants/carrot/carrot4.png';
import carrot5 from '../assets/plants/carrot/carrot5.png';

import { PlantCollection } from '../types/plantsTypes';

export const PLANTS: PlantCollection = {
  wheat: {
    name: 'Trigo',
    growTime: 5000,
    sprites: [wheat1, wheat2, wheat3, wheat4, wheat5],
    sellPrice: 0.30,
    unlockedBy: null,
    icon: wheatIcon,
  },

  carrot: {
    name: 'Cenoura',
    growTime: 8000,
    sprites: [carrot1, carrot2, carrot3, carrot4, carrot5],
    sellPrice: 0.65,
    unlockedBy: 'carrot_seed',
    icon: carrotIcon,
  },
};

export type PlantType = keyof typeof PLANTS