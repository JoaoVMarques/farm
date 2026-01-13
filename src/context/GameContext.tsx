import { createContext, ReactNode, useContext, useState } from 'react';
import { FeatureId } from '../types/gameTypes';
import { UNLOCK_PATH } from '../data/unlocks';

interface GameContextData {
  money: number
  addMoney: (amount: number) => void
  isUnlocked: (feature: FeatureId) => boolean
  unlockedFeatures: Set<FeatureId>
}

const GameContext = createContext({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const [ money, setMoney ] = useState(0);
  const [nextUnlockIndex, setNextUnlockIndex] = useState(0);
  const [ unlockedFeatures, setUnlockedFeatures] = useState<Set<FeatureId>>(new Set());

  const addMoney = (amount: number) => {
    const newMoney = money + amount;
    setMoney(newMoney);

    checkUnlocks(newMoney);
  };

  const checkUnlocks = (currentMoney: number) => {
    if (nextUnlockIndex >= UNLOCK_PATH.length) {return;}

    let currentIndex = nextUnlockIndex;
    const newUnlocks: FeatureId[] = [];

    while (
      currentIndex < UNLOCK_PATH.length
      && currentMoney >= UNLOCK_PATH[currentIndex].threshold
    ) {
      const rule = UNLOCK_PATH[currentIndex];

      newUnlocks.push(rule.id);
      console.log(`🎉 DESBLOQUEADO: ${rule.description}`);
      currentIndex++;
    }

    if (newUnlocks.length > 0) {
      setUnlockedFeatures((prev) => {
        const newSet = new Set(prev);
        newUnlocks.forEach((id) => newSet.add(id));
        return newSet;
      });
      setNextUnlockIndex(currentIndex);
    }
  };

  const isUnlocked = (feature: FeatureId) => unlockedFeatures.has(feature);
  return (
    <GameContext.Provider value={ { money, addMoney, isUnlocked, unlockedFeatures } }>
      { children }
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);