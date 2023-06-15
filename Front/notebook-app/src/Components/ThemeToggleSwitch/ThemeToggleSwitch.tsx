import React, { useContext } from 'react'
import './ThemeToggleSwitch.css'
import '../../App.css'
import { ThemeContext } from '../ThemeProvider/ThemeContext'



function ThemeToggleSwitch() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const toggled = theme === 'dark'

    return (
        <>
        <p className={'margin-l-auto ' + ` toggle${toggled ? "-label-night" : "-label"}`}>Theme</p>
        <div  className={`toggle${toggled ? " night" : ""}`} onClick={toggleTheme}>
            <div className="notch">
            </div>
        </div>
        </>
    )
}

export default ThemeToggleSwitch