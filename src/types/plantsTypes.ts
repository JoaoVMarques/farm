export interface PlantData {
  name: string;
  growTime: number;
  sprites: string[];
  sellPrice: number
}

export type PlantCollection = Record<string, PlantData>;