export interface PlayerSettings {
  masterVolume: number;
  plantSoundMode: string;
}

export const DEFAULT_SETTINGS: PlayerSettings = {
  masterVolume: 50,
  plantSoundMode: 'none',
};