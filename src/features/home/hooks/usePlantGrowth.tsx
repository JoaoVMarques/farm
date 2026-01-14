import { useEffect, useState } from 'react';
import { useGame } from '../../../context/GameContext';
import { PLANTS, PlantType } from '../../../data/plantConfig';
import tilledDirtSprite from '../../../assets/plotPlanted.png';

export function usePlantGrowth(plantType: PlantType) {
  const [stage, setStage] = useState(0);
  const currentPlant = PLANTS[plantType];

  const { addMoney } = useGame();

  const totalStages = currentPlant.sprites.length + 1;
  const isMature = stage === totalStages;

  useEffect(() => {
    if (stage === 0 || stage === 1 || isMature) {return;}

    const timer = setTimeout(() => {
      setStage((prev) => prev + 1);
    }, currentPlant.growTime);

    return () => clearTimeout(timer);
  }, [stage, currentPlant, isMature]);

  const interact = () => {
    if (stage === 0) {
      setStage(1);

    }  else if (stage === 1) {
      setStage(2);
    } else if (isMature) {
      addMoney(currentPlant.sellPrice);
      setStage(0);
    }
  };

  let currentSprite: string | null = null;

  if (stage === 0) {
    currentSprite = null;
  } else if (stage === 1) {
    currentSprite = tilledDirtSprite;
  } else {
    currentSprite = currentPlant.sprites[stage - 2];
  }

  return {
    stage,
    currentSprite,
    interact,
    isMature,
  };
}