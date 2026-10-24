'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSavedTheme = (): Theme | null => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return null;
};

const themeListeners = new Set<() => void>();

const notifyThemeListeners = () => {
  themeListeners.forEach((listener) => listener());
};

const getThemeSnapshot = (): Theme => {
  const savedTheme = getSavedTheme();
  return (
    savedTheme ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
};

const subscribeToTheme = (listener: () => void) => {
  themeListeners.add(listener);
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = () => {
    if (getSavedTheme() === null) notifyThemeListeners();
  };
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'theme') notifyThemeListeners();
  };

  mediaQuery.addEventListener('change', handleSystemThemeChange);
  window.addEventListener('storage', handleStorageChange);

  return () => {
    themeListeners.delete(listener);
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
    window.removeEventListener('storage', handleStorageChange);
  };
};

const getServerThemeSnapshot = (): Theme => 'light';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    notifyThemeListeners();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
