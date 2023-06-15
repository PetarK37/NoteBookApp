import React from 'react'
import './Button.css'

type IconPosition = 'L' | 'R'
type ButtonType = 'button' | 'submit' | 'reset' | undefined
interface ButtonProps {
  className?: string;
  onClick?: () => void;
  text: string,
  icon?: React.ReactNode,
  iconPosition?: IconPosition,
  style?: React.CSSProperties,
  btnType?: ButtonType,
}


function Button({ className, style, onClick, text, icon, iconPosition = 'L' ,btnType='button'}: ButtonProps) {
  return (
    <button type ={btnType} className={'btn ' + ` ${className === undefined ? "" : className}`} onClick={onClick} style={style}>
      {iconPosition === 'L' && icon}
      {text}
      {iconPosition === 'R' && icon}
    </button>
  )
}

export default Button