export interface IPlantData {
  name: string;
  growTime: number;
  sprites: string[];
}

export type PlantCollection = Record<string, IPlantData>;