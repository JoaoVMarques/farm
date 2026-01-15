import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { FeatureId } from '../types/gameTypes';
import { GameSaveData } from '../types/saveTypes';
import { loadGameFromStorage, saveGameToStorage } from '../utils/saveSystem';
import { useUnlockSystem } from '../hooks';

interface UnlockInfo { id: FeatureId; description: string }

interface GameContextData {
  money: number
  addMoney: (amount: number) => void
  isUnlocked: (feature: FeatureId) => boolean
  unlockedFeatures: Set<FeatureId>
  notification: string | null
  closeNotification: () => void
  purchasedItems: string[]
  buyItem: (itemId: string, cost: number, featureToUnlock?: UnlockInfo) => boolean
  selectedSeed: string
  setSelectedSeed: (seed: string) => void
  saveGame: () => void
}

const GameContext = createContext({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const saveData = loadGameFromStorage();

  const [money, setMoney] = useState(saveData?.money ?? 0);
  const [selectedSeed, setSelectedSeed] = useState(saveData?.selectedSeed ?? 'wheat');
  const [purchasedItems, setPurchasedItems] = useState<string[]>(saveData?.purchasedItems ?? []);
  const [notification, setNotification] = useState<string | null>(null);

  const { unlockedFeatures, checkProgress, unlockFeature } = useUnlockSystem(
    (saveData?.unlockedFeatures as FeatureId[]) || [],
    (desc) => setNotification(desc),
  );

  const closeNotification = () => setNotification(null);

  const addMoney = (amount: number) => {
    const newMoney = money + amount;
    setMoney(newMoney);
    checkProgress(newMoney);
  };

  const buyItem = (itemId: string, cost: number, featureToUnlock?: UnlockInfo) => {
    if (money < cost || purchasedItems.includes(itemId)) {return false;}

    setMoney(prev => prev - cost);
    setPurchasedItems(prev => [...prev, itemId]);

    if (featureToUnlock) {
      unlockFeature(featureToUnlock.id, featureToUnlock.description);
    }
    return true;
  };

  const saveGame = useCallback(() => {
    const data: GameSaveData = {
      money,
      purchasedItems,
      unlockedFeatures: Array.from(unlockedFeatures),
      selectedSeed,
      lastSaveTime: Date.now(),
    };
    saveGameToStorage(data);
  }, [money, purchasedItems, unlockedFeatures, selectedSeed]);

  useEffect(() => {
    const timer = setInterval(saveGame, 60 * 1000);
    const handleBeforeUnload = () => saveGame();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveGame]);

  return (
    <GameContext.Provider value={ {
      money, purchasedItems, unlockedFeatures, notification, selectedSeed,
      addMoney, buyItem, isUnlocked: (id) => unlockedFeatures.has(id),
      closeNotification, setSelectedSeed, saveGame,
    } }>
      { children }
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);