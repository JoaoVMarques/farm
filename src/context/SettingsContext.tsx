import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { PlayerSettings, DEFAULT_SETTINGS } from '../types/settingsTypes';

interface SettingsContextData {
  settings: PlayerSettings;
  updateSetting: <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext({} as SettingsContextData);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PlayerSettings>(() => {
    const saved = localStorage.getItem('player_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  useEffect(() => {
    localStorage.setItem('player_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  return (
    <SettingsContext.Provider value={ { settings, updateSetting, resetSettings } }>
      { children }
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);