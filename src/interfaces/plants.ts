export interface IPlantData {
  name: string;
  growTime: number;
  sprites: string[];
  sellPrice: number
}

export type PlantCollection = Record<string, IPlantData>;