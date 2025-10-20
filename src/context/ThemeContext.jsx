import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
}

// Definir los temas
export const themes = {
  default: {
    name: 'default',
    colors: {
      primary: '#000000',
      primaryHover: '#374151',
      background: '#ffffff',
      accent: '#f3f4f6',
      text: '#111827',
      textSecondary: '#6b7280',
      badgeText: '#ffffff',
      counterText: '#6b7280',
      buttonPrimary: '#000000',
      buttonPrimaryHover: '#374151',
      buttonText: '#ffffff'
    }
  },
  mujer: {
    name: 'mujer',
    colors: {
      primary: '#EECBC8',
      primaryHover: '#E5B3AF',
      background: '#ffffff',
      accent: '#FDF2F1',
      text: '#8B5A5A',
      textSecondary: '#A67B7B',
      badgeText: '#ffffff',
      counterText: '#8B5A5A',
      buttonPrimary: '#EECBC8',
      buttonPrimaryHover: '#E5B3AF',
      buttonText: '#ffffff'
    }
  },
  hombre: {
    name: 'hombre',
    colors: {
      primary: '#EDEDED',
      primaryHover: '#D1D1D1',
      background: '#ffffff',
      accent: '#F8F8F8',
      text: '#4A4A4A',
      textSecondary: '#6B6B6B',
      badgeText: '#2D2D2D',
      counterText: '#2D2D2D',
      buttonPrimary: '#4A4A4A',
      buttonPrimaryHover: '#2D2D2D',
      buttonText: '#ffffff'
    }
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(themes.default);
  const location = useLocation();

  useEffect(() => {
    // Detectar tema basado en la URL
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section');
    
    if (section === 'mujer') {
      setCurrentTheme(themes.mujer);
    } else if (section === 'hombre') {
      setCurrentTheme(themes.hombre);
    } else {
      setCurrentTheme(themes.default);
    }
  }, [location]);

  const value = {
    currentTheme,
    themes,
    setTheme: setCurrentTheme,
    isDefaultTheme: currentTheme.name === 'default',
    isMujerTheme: currentTheme.name === 'mujer',
    isHombreTheme: currentTheme.name === 'hombre'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}