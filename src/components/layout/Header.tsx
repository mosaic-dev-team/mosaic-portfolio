import { Link } from '@tanstack/react-router'
import { useId, useRef, useState } from 'react'
import logo from '../../assets/brand/mosaic-logo.svg'
import { useLanguage } from '../../context/language'
import { useTheme } from '../../context/theme'
import styles from './Header.module.css'
import { navigation } from './navigation'

const copy = {
  en: {
    navigation: 'Main navigation',
    openMenu: 'Open navigation',
    closeMenu: 'Close navigation',
    light: 'Switch to light theme',
    dark: 'Switch to dark theme',
    language: 'Language',
    en: 'English',
    fa: 'Persian',
  },
  fa: {
    navigation: 'ناوبری اصلی',
    openMenu: 'باز کردن منو',
    closeMenu: 'بستن منو',
    light: 'تغییر به تم روشن',
    dark: 'تغییر به تم تیره',
    language: 'زبان',
    en: 'انگلیسی',
    fa: 'فارسی',
  },
}

export function Header() {
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const navId = useId()
  const text = copy[language]
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  function closeMenu() {
    if (menuOpen && menuButton.current?.getClientRects().length) {
      menuButton.current.focus()
    }
    setMenuOpen(false)
  }

  return (
    <header
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) closeMenu()
      }}
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <img className={styles.mark} src={logo} alt="" width="32" height="32" />
          <bdi lang="en">MOSAIC</bdi>
        </Link>

        <div className={styles.controls}>
          <button type="button" className={styles.iconButton} aria-label={text[nextTheme]} onClick={toggleTheme}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {nextTheme === 'dark' ? (
                <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
                </>
              )}
            </svg>
          </button>

          <div className={styles.languages} role="group" aria-label={text.language}>
            {(['en', 'fa'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-label={`${option.toUpperCase()} · ${text[option]}`}
                aria-pressed={language === option}
                onClick={() => setLanguage(option)}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          ref={menuButton}
          className={`${styles.iconButton} ${styles.menuButton}`}
          aria-label={menuOpen ? text.closeMenu : text.openMenu}
          aria-expanded={menuOpen}
          aria-controls={navId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={menuOpen ? 'm6 6 12 12M18 6 6 18' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        <nav id={navId} className={styles.nav} data-open={menuOpen} aria-label={text.navigation}>
          <ul className={styles.navList} role="list">
            {navigation.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={styles.navLink}
                  activeOptions={{ exact: to === '/', includeSearch: false }}
                  onClick={closeMenu}
                >
                  {label[language]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
