import { GameSaveData } from '../types/saveTypes';

const SAVE_KEY = 'farm_save';

export const loadGameFromStorage = (): GameSaveData | null => {
  const saved = localStorage.getItem(SAVE_KEY);
  if (!saved) {return null;}

  try {
    const parsed = JSON.parse(saved);
    return parsed;
  } catch (e) {
    console.error('Save corrompido, iniciando novo jogo...', e);
    return null;
  }
};

export const saveGameToStorage = (data: GameSaveData) => {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    console.log('Jogo Salvo! 💾', new Date().toLocaleTimeString());
    return true;
  } catch (e) {
    console.error('Erro ao salvar', e);
    return false;
  }
};