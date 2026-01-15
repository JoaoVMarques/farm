import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { FeatureId } from '../types/gameTypes';
import { UNLOCK_PATH } from '../data/unlocks';
import { GameSaveData } from '../types/saveTypes';

interface GameContextData {
  money: number
  addMoney: (amount: number) => void
  isUnlocked: (feature: FeatureId) => boolean
  unlockedFeatures: Set<FeatureId>
  notification: string | null
  closeNotification: () => void
  purchasedItems: string[]
  buyItem: (itemId: string,
    cost: number,
    featureToUnlock?: { id: FeatureId, description: string }) => boolean
  selectedSeed: string
  setSelectedSeed: (seed: string) => void
  saveGame: () => void
}

const SAVE_KEY = 'farm_save';

const GameContext = createContext({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const loadSave = (): GameSaveData | null => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) {return null;}
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Save corrompido, resetando...', e);
      return null;
    }
  };

  const saveData = loadSave();

  const [money, setMoney] = useState(() => saveData ? saveData.money : 0);
  const [selectedSeed, setSelectedSeed] = useState<string>(() =>
    saveData ? saveData.selectedSeed : 'wheat',
  );

  const [purchasedItems, setPurchasedItems] = useState<string[]>(() =>
    saveData ? saveData.purchasedItems : [],
  );

  const [unlockedFeatures, setUnlockedFeatures] = useState<Set<FeatureId>>(() =>
    saveData ? new Set(saveData.unlockedFeatures as FeatureId[]) : new Set(),
  );

  const [nextUnlockIndex, setNextUnlockIndex] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const closeNotification = () => setNotification(null);

  const addMoney = (amount: number) => {
    const newMoney = money + amount;
    setMoney(newMoney);

    checkUnlocks(newMoney);
  };

  const buyItem = (itemId: string,
    cost: number,
    featureToUnlock?: { id: FeatureId, description: string },
  ) => {
    if (money < cost) {return false;}

    if (purchasedItems.includes(itemId)) {return false;}

    setMoney((prev) => prev - cost);
    setPurchasedItems ((prev) => [...prev, itemId]);

    if (featureToUnlock) {
      setUnlockedFeatures((prev) => {
        const featureId = featureToUnlock.id;
        if (prev.has(featureId)) { return prev; }

        const newSet = new Set(prev);
        newSet.add(featureId);
        setNotification(featureToUnlock.description);

        return newSet;
      });
    }
    return true;
  };

  const saveGame = useCallback(() => {
    const dataToSave: GameSaveData = {
      money,
      purchasedItems,
      unlockedFeatures: Array.from(unlockedFeatures),
      selectedSeed,
      lastSaveTime: Date.now(),
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave));
    console.log('Jogo Salvo! 💾', new Date().toLocaleTimeString());

    // MOSTRAR ALGO VISUAL DEPOIS PARA MOSTRAR QUE SALVOU
  }, [money, purchasedItems, unlockedFeatures, selectedSeed]);

  useEffect(() => {
    const timer = setInterval(() => {
      saveGame();
    }, 60 * 1000);

    const handleBeforeUnload = () => saveGame();
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveGame]);

  useEffect(() => {
    if (nextUnlockIndex === 0 && money > 0) {
      let index = 0;
      while (index < UNLOCK_PATH.length && unlockedFeatures.has(UNLOCK_PATH[index].id)) {
        index++;
      }
      setNextUnlockIndex(index);
    }
  }, []);

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
      currentIndex++;
    }

    if (newUnlocks.length > 0) {
      setUnlockedFeatures((prev) => {
        const newSet = new Set(prev);
        newUnlocks.forEach((id) => newSet.add(id));
        const lastId = newUnlocks[newUnlocks.length - 1];
        const rule = UNLOCK_PATH.find((r) => r.id === lastId);

        if (rule) {
          setNotification(rule.description);
        }

        return newSet;
      });
      setNextUnlockIndex(currentIndex);
    }
  };

  const isUnlocked = (feature: FeatureId) => unlockedFeatures.has(feature);
  return (
    <GameContext.Provider value={ {
      money,
      purchasedItems,
      unlockedFeatures,
      notification,
      saveGame,

      selectedSeed,
      setSelectedSeed,

      buyItem,
      addMoney,
      isUnlocked,
      closeNotification,
    } }>
      { children }
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);