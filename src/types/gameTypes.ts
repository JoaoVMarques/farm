export type FeatureId =
  | 'SHOW_MONEY_UI'
  | 'UNLOCK_SHOP'
  | 'UNLOCK_SEED_BAG'
  | 'GAME_SETTINGS'

export interface UnlockRule {
  id: FeatureId
  threshold: number
  description: string
}