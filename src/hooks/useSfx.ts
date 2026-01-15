import { PLANT_SFX, UI_SFX } from '../assets/sounds';

const soundCooldowns: Record<string, number> = {};

export function useSfx() {
  const play = (src: string,  volume = 0.5, cooldownMs = 0) => {
    try {
      const now = Date.now();
      const lastPlayed = soundCooldowns[src] || 0;

      if (cooldownMs > 0 && (now - lastPlayed < cooldownMs)) {
        return;
      }

      const audio = new Audio(src);
      audio.volume = volume;
      audio.play();

      soundCooldowns[src] = now;
    } catch (e) {
      console.error('Erro ao tocar som', e);
    }
  };

  const playRandom = (soundArray: string[], volume = 0.5, cooldownMs = 0) => {
    const randomIndex = Math.floor(Math.random() * soundArray.length);
    const selectedSound = soundArray[randomIndex];

    play(selectedSound, volume, cooldownMs);
  };

  return {
    plantGrowing: () => play(PLANT_SFX.Mature, 0.5, 2000),
    adClick: () => play(UI_SFX.CLICK_AD, 0.9, 0),
    adAppear: () => playRandom(UI_SFX.AD_APPEAR_VARIATIONS, 0.5, 0),
  };
}