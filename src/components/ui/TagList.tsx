import styles from './TagList.module.css'

interface TagListProps {
  items: readonly string[]
  label?: string
  compact?: boolean
}

export function TagList({ items, label, compact = false }: TagListProps) {
  if (items.length === 0) return null

  return (
    <ul className={compact ? `${styles.list} ${styles.compact}` : styles.list} role="list" aria-label={label}>
      {items.map((item) => <li key={item}><bdi lang="en">{item}</bdi></li>)}
    </ul>
  )
}
