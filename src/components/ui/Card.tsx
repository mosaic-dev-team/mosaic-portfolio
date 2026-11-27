import type { ReactNode } from 'react'
import styles from './Card.module.css'

export type CardVariant =
  | 'neutral'
  | 'midnight'
  | 'blush'
  | 'team-forest'
  | 'team-burgundy'
  | 'deep-green'
  | 'burgundy'
  | 'forest'
  | 'velvet'

export interface CardProps {
  children: ReactNode
  variant?: CardVariant
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
