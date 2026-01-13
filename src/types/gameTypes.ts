export type FeatureId =
  | 'SHOW_MONEY_UI'
  | 'UNLOCK_SHOP';

export interface UnlockRule {
  id: FeatureId
  threshold: number
  description: string
}