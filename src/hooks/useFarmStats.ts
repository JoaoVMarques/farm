import { useGame } from '../context/GameContext';
import { SHOP_ITEMS } from '../data/shopConfig';

export function useFarmStats() {
  const { purchasedItems } = useGame();

  const basePlots = 1;

  const plotBonus = purchasedItems.reduce((total, itemId) => {
    const itemConfig = SHOP_ITEMS.find((item) => item.id === itemId);

    return total + (itemConfig?.effects?.addPlot || 0);
  }, 0);

  return {
    totalPlots: basePlots + plotBonus,
  };
}