import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../../context/GameContext';
import { PLANTS, PlantType } from '../../../data/plantConfig';
import tilledDirtSprite from '../../../assets/imgs/plotPlanted.png';
import { useSfx } from '../../../hooks';

export function usePlantGrowth(seedInHand: PlantType) {
  const [stage, setStage] = useState(0);
  const [plantedSeed, setPlantedSeed] = useState<PlantType>(seedInHand);

  const { plantMature } = useSfx();
  const { addMoney } = useGame();

  const activeSeedType = stage === 0 ? seedInHand : plantedSeed;
  const currentPlant = PLANTS[activeSeedType];

  const totalStages = currentPlant.sprites.length + 1;
  const isMature = stage === totalStages;

  const playedMatureSfxRef = useRef(false);

  useEffect(() => {
    if (isMature && !playedMatureSfxRef.current) {
      plantMature();
      playedMatureSfxRef.current = true;
    }
    if (!isMature) {
      playedMatureSfxRef.current = false;
    }
  }, [isMature]);

  useEffect(() => {
    if (stage === 0 || stage === 1 || isMature) { return; }

    const timer = setTimeout(() => {
      setStage((prev) => prev + 1);
    }, currentPlant.growTime);

    return () => clearTimeout(timer);
  }, [stage, currentPlant, isMature]);

  const interact = () => {
    if (stage === 0) {
      setStage(1);
    } else if (stage === 1) {
      setPlantedSeed(seedInHand);
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