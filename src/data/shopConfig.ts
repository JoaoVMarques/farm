export type ShopItemId = 'plot_expansion_1'
  | 'plot_expansion_2'
  | 'internet_speed_1'
  | 'internet_speed_2'
  | 'carrot_seed'
  | 'plot_expansion_3'
  | 'internet_speed_3'
  | 'ad-block_1'
  | 'settings_menu'

export interface ShopItem {
  id: ShopItemId
  name: string
  description: string
  price: number
  requires?: ShopItemId
  unlocksFeature?: string
  effects?: {
    addPlot?: number
    internetSpeed?: number
    trapAdBlock?: boolean
  }
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'plot_expansion_1',
    name: 'Expansao de terra I',
    description: 'Libera mais um slot para plantar',
    price: 2,
    effects: { addPlot: 1 },
  },
  {
    id: 'plot_expansion_2',
    name: 'Expansao de terra II',
    description: 'Libera mais um slot para plantar, (AGORA 3!)',
    price: 14.9,
    requires: 'plot_expansion_1',
    effects: { addPlot: 1 },
  },
  {
    id: 'plot_expansion_3',
    name: 'Expansao de terra III',
    description: '+1 slot de plantar quem diria..',
    price: 25,
    requires: 'plot_expansion_2',
    effects: { addPlot: 1 },
  },
  {
    id: 'internet_speed_1',
    name: '+5kb de internet',
    description: 'Cansado da sua internet lenta? venha para Tchau',
    price: 5,
    requires: 'plot_expansion_1',
    effects: { internetSpeed: 5 },
  },
  {
    id: 'internet_speed_2',
    name: '+5kb de internet (Novamente)',
    description: 'Internet Travando? aqui na (Escuro) temos a solução!',
    price: 20,
    requires: 'internet_speed_1',
    effects: { internetSpeed: 5 },
  },
  {
    id: 'internet_speed_3',
    name: '+4kb de internet',
    description: 'fazendo download da descrição..',
    price: 25,
    requires: 'internet_speed_2',
    effects: { internetSpeed: 4 },
  },
  {
    id: 'carrot_seed',
    name: 'Semente de cenoura',
    description: 'São um pouco mais lentas, porém vale cada segundo de espera',
    price: 7.50,
    requires: 'plot_expansion_1',
  },
  {
    id: 'ad-block_1',
    name: 'AdBlock🛡️ (Free Edition)',
    description: 'Bloqueia anúncios chatos! (Versão gratuita)',
    price: 0,
    requires: 'internet_speed_2',
    effects: { trapAdBlock: true },
  },
  {
    id: 'settings_menu',
    name: 'Janela de configurações?',
    description: 'Que devzinho mais mercenario hein..',
    price: 10,
    requires: 'carrot_seed',
  },
];