import { Link } from '@tanstack/react-router'
import darkIllustration from '../../assets/illustrations/dark-404.webp'
import lightIllustration from '../../assets/illustrations/light-404.webp'
import { useLanguage } from '../../context/language'
import { useTheme } from '../../context/theme'
import styles from './NotFoundPage.module.css'

const copy = {
  en: {
    error: '404: Page not found.',
    heading: 'A missing piece.',
    description: "Looks like this piece of the mosaic is missing. Let's get you back on track.",
    actions: 'Find your way back',
    home: 'Back to Home',
    projects: 'Explore Projects',
  },
  fa: {
    error: '۴۰۴: صفحه پیدا نشد.',
    heading: 'یک قطعه گمشده.',
    description: 'به نظر می‌رسد این قطعه از موزاییک گم شده است. بیا دوباره مسیرمان را پیدا کنیم.',
    actions: 'پیوندهای بازگشت',
    home: 'بازگشت به خانه',
    projects: 'مشاهده پروژه‌ها',
  },
}

export function NotFoundPage() {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const text = copy[language]
  const dark = theme === 'dark'

  return (
    <div className={styles.page}>
      <img
        className={styles.illustration}
        src={dark ? darkIllustration : lightIllustration}
        alt=""
        width={1400}
        height={dark ? 596 : 595}
        dir="ltr"
      />
      <h1><span className={styles.visuallyHidden}>{text.error} </span>{text.heading}</h1>
      <p>{text.description}</p>
      <nav aria-label={text.actions} className={styles.actions}>
        <Link to="/" className={styles.primary}>{text.home}</Link>
        <Link to="/projects" search={{}}>{text.projects}</Link>
      </nav>
    </div>
  )
}
