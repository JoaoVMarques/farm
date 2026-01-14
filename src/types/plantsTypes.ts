export interface PlantData {
  name: string;
  growTime: number;
  sprites: string[];
  sellPrice: number
  unlockedBy: string | null
}

export type PlantCollection = Record<string, PlantData>;