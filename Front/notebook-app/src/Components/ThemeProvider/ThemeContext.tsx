import React, { createContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import '../../App.css'

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => { },
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
            <div className={theme === 'light' ? 'App-light' : 'App-dark'}>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    limit={1}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme= {theme}
                />
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

