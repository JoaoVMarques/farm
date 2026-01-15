import plantgrowing1 from '../assets/sounds/plantGrow1.wav';

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

  return {
    plantGrowing: () => play(plantgrowing1, 0.5, 2000),
  };
}