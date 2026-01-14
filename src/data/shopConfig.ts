export type ShopItemId = 'plot_expansion_1' | 'plot_expansion_2'

export interface ShopItem {
  id: ShopItemId
  name: string
  description: string
  price: number
  requires?: ShopItemId
  unlocksFeature?: string
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'plot_expansion_1',
    name: 'Expansao de terra I',
    description: 'Libera mais um slot para plantar',
    price: 2,
  },
  {
    id: 'plot_expansion_2',
    name: 'Expansao de terra II',
    description: 'Libera mais um slot para plantar, (AGORA 3!)',
    price: 14.9,
    requires: 'plot_expansion_1',
  },
];