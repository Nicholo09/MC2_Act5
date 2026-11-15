import React, { createContext, useContext, useState } from 'react';

const lightTheme = {
  mode: 'light',
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#1A1A2E',
  subtext: '#6B7280',
  primary: '#4F46E5',
  border: '#E5E7EB',
};

const darkTheme = {
  mode: 'dark',
  background: '#0F172A',
  card: '#1E293B',
  text: '#F1F5F9',
  subtext: '#94A3B8',
  primary: '#818CF8',
  border: '#334155',
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [userName, setUserName] = useState('Student');

  const theme = isDark ? darkTheme : lightTheme;
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <AppContext.Provider
      value={{ theme, isDark, toggleTheme, userName, setUserName }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
