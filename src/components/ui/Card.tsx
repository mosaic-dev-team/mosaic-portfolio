import type { ReactNode } from 'react'
import type { CardColor } from '../../data/types'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  color?: CardColor
  className?: string
}

export function Card({ children, color = 'neutral', className }: CardProps) {
  return (
    <div
      className={className ? `${styles.card} ${className}` : styles.card}
      data-color={color}
    >
      {children}
    </div>
  )
}
