import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isReady, setIsReady] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const initTheme = async () => {
      try {
        const savedTheme = await loadTheme();
        const themeValue = savedTheme || 'light';
        setThemeState(themeValue);
        setIsReady(true);
      } catch (error) {
        console.error('Failed to load theme:', error);
        setThemeState('light');
        setIsReady(true);
      }
    };
    initTheme();
  }, []);

  const changeTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      await saveTheme(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
