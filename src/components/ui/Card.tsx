import type { ReactNode } from 'react'
import type { CardColor } from '../../styles/cardColors'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  variant?: CardColor
  className?: string
}

export function Card({ children, variant = 'neutral', className }: CardProps) {
  return (
    <div
      className={className ? `${styles.card} ${className}` : styles.card}
      data-variant={variant}
    >
      {children}
    </div>
  )
}
