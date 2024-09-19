import React from 'react'
import { Link } from '../Link'
import styles from './index.module.scss'

interface ButtonProps {
  type?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt'
  text: string
  href?: string
  external?: boolean
  className?: string
}

export function Button({ type: propType, text, ...props }: ButtonProps) {
  const {
    theme = 'brand',
    size = 'big',
    href = '/',
    external = false,
    className = '',
  } = props
  let type: string | typeof Link | null = null

  if (propType === 'button') {
    type = 'button'
  }
  else if (propType === 'a') {
    type = external ? 'a' : Link
  }

  return React.createElement(
    type ?? 'a',
    {
      className: `${styles.button} ${styles[theme]} ${styles[size]} ${className}`,
      href,
    },
    text,
  )
}
