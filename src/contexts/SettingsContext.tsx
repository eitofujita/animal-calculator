import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Settings } from '../components/Settings';

interface SettingsContextType {
  openSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const openSettings = () => setVisible(true);
  const closeSettings = () => setVisible(false);

  return (
    <SettingsContext.Provider value={{ openSettings }}>
      {children}
      <Settings visible={visible} onClose={closeSettings} />
    </SettingsContext.Provider>
  );
};

export const useSettingsOpen = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsOpen must be used within SettingsProvider');
  }
  return context;
};
