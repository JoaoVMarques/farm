import { useGame } from '../context/GameContext';
import { SHOP_ITEMS } from '../data/shopConfig';

export function useFarmStats() {
  const { purchasedItems } = useGame();

  const basePlots = 1;
  const baseInternetSpeed = 0;

  const stats = purchasedItems.reduce((acc, itemId) => {
    const itemConfig = SHOP_ITEMS.find((item) => item.id === itemId);

    if (itemConfig?.effects?.addPlot)  {
      acc.plots += itemConfig.effects.addPlot;
    }

    if (itemConfig?.effects?.internetSpeed) {
      acc.internet += itemConfig.effects.internetSpeed;
    }

    if (itemConfig?.effects?.trapAdBlock) {
      acc.hasFreeAdBlock = true;
    }

    return acc;
  }, { plots: 0, internet: 0, hasFreeAdBlock: false });

  return {
    totalPlots: basePlots + stats.plots,
    bonusInternetSpeed: baseInternetSpeed + stats.internet,
    hasFreeAdBlock: stats.hasFreeAdBlock,
  };
}