import { UnlockRule } from '../types/gameTypes';

export const UNLOCK_PATH: UnlockRule[] = [
  {
    id: 'SHOW_MONEY_UI',
    threshold: 0.50,
    description: 'Agora você pode ver seu saldo bancário!',
  },
  {
    id: 'UNLOCK_SHOP',
    threshold: 2.00,
    description: 'E-Market liberado!',
  },
  {
    id: 'UNLOCK_SEED_BAG',
    threshold: 7.50,
    description: 'Bolsa de sementes liberado!',
  },
];