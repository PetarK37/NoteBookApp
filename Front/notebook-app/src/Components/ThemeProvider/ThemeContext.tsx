import React, { createContext,useState,useEffect } from "react";
import '../../App.css'

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
});

interface ComponentChildrenProps {
    children: React.ReactNode
}

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}
  

type Theme = 'light' | 'dark';

export function ThemeProvider({ children }: ComponentChildrenProps) {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(mediaQuery.matches ? 'dark' : 'light');

        const handleChange = (event: MediaQueryListEvent) => {
            setTheme(event.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
             <div className={theme === 'light' ? 'App-light'  : 'App-dark'}>
                {children}
             </div>
        </ThemeContext.Provider>
    )
}

