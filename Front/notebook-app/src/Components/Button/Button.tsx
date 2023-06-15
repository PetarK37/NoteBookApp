import React from 'react'
import './Button.css'

type IconPosition = 'L' | 'R'

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  text: string;
  icon?: React.ReactNode
  iconPosition?: IconPosition
  style?: React.CSSProperties
}


function Button({ className, style, onClick, text, icon, iconPosition = 'L' }: ButtonProps) {
  return (
    <button className={'btn ' + ` ${className === undefined ? "" : className}`} onClick={onClick} style={style}>
      {iconPosition === 'L' && icon}
      {text}
      {iconPosition === 'R' && icon}
    </button>
  )
}

export default Button