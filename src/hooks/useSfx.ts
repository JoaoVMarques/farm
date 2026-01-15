import plantgrowing1 from '../assets/sounds/plantGrow1.wav';

export function useSfx() {
  const play = (src: string,  volume = 0.5) => {
    try {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.play();
    } catch (e) {
      console.error('Erro ao tocar som', e);
    }
  };

  return {
    plantGrowing: () => play(plantgrowing1),
  };
}