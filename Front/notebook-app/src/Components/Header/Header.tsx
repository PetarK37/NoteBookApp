import React from 'react'
import './Header.css'
import '../../App.css'
import ThemeToggleSwitch from '../ThemeToggleSwitch/ThemeToggleSwitch'

function Header() {
  return (
    <nav className='flex justify-content-center align-items-center'>
        <h1 className='navTitle margin-l-auto'>Petar's NoteBook</h1>
        <ThemeToggleSwitch></ThemeToggleSwitch>
    </nav>
  )
}

export default Header