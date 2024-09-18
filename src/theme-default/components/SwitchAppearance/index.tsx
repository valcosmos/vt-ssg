import type { ReactNode } from 'react'
import React from 'react'
import { toggle } from '../../logic/toggleApperance'
import styles from './index.module.scss'

interface SwitchProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function Switch(props: SwitchProps) {
  return (
    <button className={`${styles.switch} ${props.className}`} type="button" role="switch" {...(props.onClick ? { onClick: props.onClick } : {})}>
      <span className={styles.check}>
        <span className={styles.icon}>{ props.children }</span>
      </span>
    </button>
  )
}

export function SwitchAppearance() {
  return (
    <Switch onClick={toggle}>
      <div className={styles.sun}>
        <div className="i-carbon-sun h-full w-full"></div>
      </div>
      <div className={styles.moon}>
        <div className="i-carbon-moon h-full w-full"></div>
      </div>
    </Switch>
  )
}
