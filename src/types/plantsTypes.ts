import { ShopItemId } from '../data/shopConfig';

export interface PlantData {
  name: string;
  growTime: number
  sprites: string[]
  icon: string
  sellPrice: number
  unlockedBy: ShopItemId | null
}

export type PlantCollection = Record<string, PlantData>;