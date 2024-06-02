// Not in use right now! 
"use client";
import { createContext, useContext, useState } from "react";

type themeContextTypes = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
  };

  const themeContextDefaultValues : themeContextTypes = {
    theme: 'dark',
    toggleTheme: () => {},
  };

  const ThemeContext = createContext<themeContextTypes>(themeContextDefaultValues);

export function useTheme(){
  return useContext(ThemeContext);
}

type Props = {
    children: React.ReactNode;
  }
  
  export function MyProvider({children}:Props){
    const [theme, setTheme] = useState<'light' | 'dark' >('dark');
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    const value = {
      theme,
      toggleTheme,
    };
    
    return (
      <>
        <ThemeContext.Provider value={value}>
          {children}
        </ThemeContext.Provider>
      </>
    );
  }