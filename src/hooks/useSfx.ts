import { PLANT_SFX, UI_SFX } from '../assets/sounds';

import { useSettings } from '../context/SettingsContext';

const soundCooldowns: Record<string, number> = {};

export function useSfx() {
  const { settings } = useSettings();

  const play = (src: string, baseVolume = 0.5, cooldownMs = 0) => {
    try {
      const now = Date.now();
      const lastPlayed = soundCooldowns[src] || 0;

      if (cooldownMs > 0 && (now - lastPlayed < cooldownMs)) {
        return;
      }

      const masterFactor = settings.masterVolume / 100;
      const finalVolume = baseVolume * masterFactor;

      if (finalVolume <= 0) {return;}

      const audio = new Audio(src);
      audio.volume = finalVolume;
      audio.play();

      soundCooldowns[src] = now;
    } catch (e) { console.error('Erro ao tocar som', e); }
  };

  const playRandom = (soundArray: string[], volume = 0.5, cooldownMs = 0) => {
    const randomIndex = Math.floor(Math.random() * soundArray.length);
    const selectedSound = soundArray[randomIndex];

    play(selectedSound, volume, cooldownMs);
  };

  const plantMature = (forceSound?: string, cooldownMs = 2000) => {
    const sound = forceSound ? forceSound : settings.plantSoundMode;

    if (sound === 'sound1') {
      play(PLANT_SFX.PLANT_MATURE.CLASSIC, 1, cooldownMs);
    } else if (sound === 'sound2') {
      play(PLANT_SFX.PLANT_MATURE.COIN, 1, cooldownMs);
    } else if ( sound === 'sound3' ) {
      play(PLANT_SFX.PLANT_MATURE.BEEP, 1, cooldownMs);
    }
  };

  return {
    plantMature,
    adClick: () => play(UI_SFX.CLICK_AD, 0.9, 0),
    adAppear: () => playRandom(UI_SFX.AD_APPEAR_VARIATIONS, 0.5, 0),
  };
}