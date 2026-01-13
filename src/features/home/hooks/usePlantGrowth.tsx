import { useEffect, useState } from 'react';
import { PLANTS, PlantType } from '../../../data/plantConfig';

export function usePlantGrowth(plantType: PlantType) {
  const [stage, setStage] = useState(0);
  const currentPlant = PLANTS[plantType];

  useEffect(() => {
    if (stage === 0 || stage >= currentPlant.sprites.length) {return;}

    const timer = setTimeout(() => {
      setStage((prev) => prev + 1);
    }, currentPlant.growTime);

    return () => clearTimeout(timer);
  }, [stage, currentPlant]);

  const interact = () => {
    if (stage === 0) {
      setStage(1);
    } else if (stage === currentPlant.sprites.length) {
      console.log('Colheu');
      setStage(0);
    }
  };

  return {
    stage,
    currentSprite: stage > 0 ? currentPlant.sprites[stage - 1] : null,
    interact,
    isMature: stage === currentPlant.sprites.length,
  };
}