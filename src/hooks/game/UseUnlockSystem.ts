// src/hooks/game/useUnlockSystem.ts
import { useState, useEffect } from 'react';
import { FeatureId } from '../../types/gameTypes';
import { UNLOCK_PATH } from '../../data/unlocks';

export function useUnlockSystem(initialUnlocks: FeatureId[], onUnlock: (desc: string) => void) {
  const [unlockedFeatures, setUnlockedFeatures] = useState<Set<FeatureId>>(new Set(initialUnlocks));
  const [nextUnlockIndex, setNextUnlockIndex] = useState(0);

  useEffect(() => {
    if (nextUnlockIndex === 0 && unlockedFeatures.size > 0) {
      const lastUnlockedIndex = UNLOCK_PATH.findIndex(u => !unlockedFeatures.has(u.id));
      setNextUnlockIndex(lastUnlockedIndex === -1 ? UNLOCK_PATH.length : lastUnlockedIndex);
    }
  }, []);

  const checkProgress = (currentMoney: number) => {
    if (nextUnlockIndex >= UNLOCK_PATH.length) {return;}

    let currentIndex = nextUnlockIndex;
    const newUnlocks: FeatureId[] = [];

    while (
      currentIndex < UNLOCK_PATH.length
      && currentMoney >= UNLOCK_PATH[currentIndex].threshold
    ) {
      newUnlocks.push(UNLOCK_PATH[currentIndex].id);
      currentIndex++;
    }

    if (newUnlocks.length > 0) {
      setUnlockedFeatures(prev => {
        const newSet = new Set(prev);
        newUnlocks.forEach(id => newSet.add(id));
        return newSet;
      });

      const lastRule = UNLOCK_PATH[currentIndex - 1];
      if (lastRule) {onUnlock(lastRule.description);}

      setNextUnlockIndex(currentIndex);
    }
  };

  const unlockFeature = (id: FeatureId, description: string) => {
    if (unlockedFeatures.has(id)) {return;}

    setUnlockedFeatures(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    onUnlock(description);
  };

  return {
    unlockedFeatures,
    checkProgress,
    unlockFeature,
  };
}