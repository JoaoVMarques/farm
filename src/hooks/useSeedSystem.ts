import { useGame } from '../context/GameContext';
import { PLANTS, PlantType } from '../data/plantConfig';

export function useSeedSystem() {
  const { purchasedItems, selectedSeed, setSelectedSeed } = useGame();

  const unlockedSeeds = Object.entries(PLANTS).filter(([_key, config]) => {
    if (config.unlockedBy === null) {return true;}

    return purchasedItems.includes(config.unlockedBy);
  }).map(([key, config]) => ({
    id: key as PlantType,
    ...config,
  }));

  const selectSeed = (seedId: PlantType) => {
    setSelectedSeed(seedId);
  };

  return {
    unlockedSeeds,
    selectedSeed,
    currentSeedData: PLANTS[selectedSeed as PlantType],
    selectSeed,
  };
}