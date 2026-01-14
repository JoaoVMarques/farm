import { useGame } from '../context/GameContext';
import { SHOP_ITEMS, ShopItem } from '../data/shopConfig';

export function useShop() {
  const { money, buyItem, purchasedItems } = useGame();

  const availableItems = SHOP_ITEMS.filter((item) => {
    if (purchasedItems.includes(item.id)) {return false;}

    if (item.requires) {
      const hasRequirement = purchasedItems.includes(item.requires);

      if (!hasRequirement) {return false;}
    }

    return true;
  });

  const handlePurchase = (item: ShopItem) => {
    const sucess = buyItem(item.id, item.price, item.unlocksFeature);

    if (sucess) {
      console.log('Comprou! ', item.name);
    } else {
      console.log('Saldo indisponivel!');
    }
  };

  return {
    availableItems,
    money,
    handlePurchase,
  };
}