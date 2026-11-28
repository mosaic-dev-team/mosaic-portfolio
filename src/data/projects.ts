import civilizationCover from '../assets/projects/civilization.webp'
import idempotencyImage from '../assets/projects/idempotency.webp'
import mosaicImage from '../assets/projects/mosaic.webp'
import shardMarketImage from '../assets/projects/sharding.webp'
import type { Project, ProjectFilters } from './types'

export const projects: readonly Project[] = [
  {
    slug: 'idempotency',
    color: 'cream',
    title: { en: 'Idempotency', fa: 'ایدمپوتنسی — تازه‌خانه' },
    summary: {
      en: 'A responsive e-commerce application featuring product browsing, category filtering, product search, persistent shopping cart management, and light and dark themes.',
      fa: 'یک فروشگاه اینترنتی واکنش‌گرا با امکانات مرور محصولات، فیلتر دسته‌بندی، جست‌وجوی محصولات، مدیریت پایدار سبد خرید و حالت روشن و تاریک.',
    },
    problem: {
      en: 'Develop a modern e-commerce storefront from scratch with a maintainable architecture, reliable data integration, and a user-friendly shopping experience.',
      fa: 'توسعه یک فروشگاه اینترنتی مدرن از ابتدا با معماری قابل نگهداری، ارتباط مطمئن با داده‌ها و تجربه خرید کاربرپسند.',
    },
    solution: {
      en: 'Built a responsive application using React and TypeScript, reusable components, layered architecture, persistent state management, product search, and Docker-based containerization.',
      fa: 'توسعه یک برنامه واکنش‌گرا با React و TypeScript، کامپوننت‌های قابل استفاده مجدد، معماری لایه‌ای، مدیریت پایدار وضعیت، جست‌وجوی محصولات و کانتینرسازی با Docker.',
    },
    lessons: {
      en: 'Gained practical experience in frontend architecture, state management, API integration, clean code, deployment, and collaborative development.',
      fa: 'کسب تجربه عملی در معماری فرانت‌اند، مدیریت وضعیت، ارتباط با API، کدنویسی تمیز، استقرار و توسعه مشارکتی.',
    },
    achievements: [
      {
        en: 'Implemented responsive product browsing and category filtering.',
        fa: 'مرور واکنش‌گرای محصولات و فیلتر دسته‌بندی پیاده‌سازی شد.',
      },
      {
        en: 'Developed product search and persistent shopping cart management.',
        fa: 'جست‌وجوی محصولات و مدیریت پایدار سبد خرید توسعه یافت.',
      },
      {
        en: 'Added switching between light and dark themes.',
        fa: 'امکان جابه‌جایی بین تم‌های روشن و تاریک اضافه شد.',
      },
      {
        en: 'Containerized the application using Docker.',
        fa: 'برنامه با Docker کانتینرسازی شد.',
      },
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Docker'],
    tags: ['react', 'typescript', 'ecommerce'],
    memberSlugs: ['baran'],
    image: {
      src: idempotencyImage,
      alt: { en: 'Illustration for the Idempotency (Tazeh Khaneh) online store', fa: 'تصویرسازی فروشگاه آنلاین ایدمپوتنسی (تازه‌خانه)' },
    },
    liveUrl: 'https://shop.baranbuilds.com/',
    repositoryUrl: 'https://github.com/Baran-06/idempotency-shop',
  },
  {
    slug: 'shard-market',
    color: 'magenta',
    title: { en: 'Shard Market', fa: 'شارد مارکت' },
    summary: {
      en: 'A modern online storefront offering responsive product exploration, category-based navigation, search functionality, persistent cart state, and customizable themes.',
      fa: 'یک فروشگاه آنلاین مدرن با قابلیت مرور واکنش‌گرای محصولات، مسیریابی بر اساس دسته‌بندی، جست‌وجو، ماندگاری سبد خرید و تغییر تم.',
    },
    problem: {
      en: 'Create a fully functional online storefront with a clean architecture, consistent user experience, automated deployment, and maintainable code.',
      fa: 'ساخت یک فروشگاه آنلاین کاربردی با معماری تمیز، تجربه کاربری یکپارچه، استقرار خودکار و کد قابل نگهداری.',
    },
    solution: {
      en: 'Developed a feature-based e-commerce application using React and TypeScript, reusable UI components, structured product data, persistent state management, and an automated development and deployment workflow.',
      fa: 'توسعه یک فروشگاه اینترنتی با معماری مبتنی بر Feature، استفاده از React و TypeScript، کامپوننت‌های قابل استفاده مجدد، داده‌های ساختاریافته محصولات، مدیریت پایدار وضعیت و فرایند خودکار توسعه و استقرار.',
    },
    lessons: {
      en: 'Developed practical skills in scalable frontend architecture, responsive design, code quality, continuous integration, deployment, and effective use of AI-assisted development.',
      fa: 'کسب تجربه عملی در معماری توسعه‌پذیر فرانت‌اند، طراحی واکنش‌گرا، کیفیت کد، یکپارچه‌سازی مستمر، استقرار و استفاده مؤثر از ابزارهای هوش مصنوعی در توسعه.',
    },
    achievements: [
      {
        en: 'Developed a responsive online shopping experience.',
        fa: 'تجربهٔ خرید آنلاین واکنش‌گرا توسعه یافت.',
      },
      {
        en: 'Implemented product filtering, search, and persistent cart state.',
        fa: 'فیلتر و جست‌وجوی محصولات و ماندگاری وضعیت سبد خرید پیاده‌سازی شد.',
      },
      {
        en: 'Established reusable components and a feature-based architecture.',
        fa: 'کامپوننت‌های قابل استفادهٔ مجدد و معماری مبتنی بر قابلیت ایجاد شدند.',
      },
      {
        en: 'Configured Docker containerization and an automated CI/CD workflow.',
        fa: 'کانتینرسازی با Docker و فرایند خودکار CI/CD پیکربندی شد.',
      },
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Docker'],
    tags: ['react', 'typescript', 'ecommerce'],
    memberSlugs: ['alireza'],
    image: {
      src: shardMarketImage,
      alt: { en: 'Illustration for the Shard Market online store', fa: 'تصویرسازی فروشگاه آنلاین شارد مارکت' },
    },
    liveUrl: 'https://shardmarket.ir/',
    repositoryUrl: 'https://github.com/AlirezaArabshahi/sharding-shop',
  },
  {
    slug: 'mosaic-portfolio',
    color: 'orange',
    title: { en: 'MOSAIC', fa: 'موزاییک' },
    summary: {
      en: 'A bilingual team portfolio showcasing member profiles, interactive résumés, projects, and technical articles through a colorful and unified design system.',
      fa: 'یک پورتفولیوی تیمی دوزبانه برای نمایش پروفایل اعضا، رزومه‌ها، پروژه‌ها و مقاله‌های فنی با یک سیستم طراحی رنگارنگ و یکپارچه.',
    },
    problem: {
      en: 'The team needed a shared platform for presenting individual skills, professional experiences, collaborative projects, and technical knowledge.',
      fa: 'تیم به یک پلتفرم مشترک برای معرفی مهارت‌های فردی، تجربه‌های حرفه‌ای، پروژه‌های مشترک و دانش فنی نیاز داشت.',
    },
    solution: {
      en: 'Build a data-driven portfolio using reusable React components, shared page templates, type-safe routing, bilingual content, and a responsive Bento Grid design.',
      fa: 'توسعه یک پورتفولیوی داده‌محور با کامپوننت‌های قابل استفاده مجدد React، قالب‌های مشترک صفحات، مسیریابی type-safe، محتوای دوزبانه و چیدمان واکنش‌گرای Bento Grid.',
    },
    lessons: {
      en: 'Combining clear responsibilities, shared design conventions, reusable components, and collaborative Git workflows improves consistency and maintainability.',
      fa: 'ترکیب تقسیم مسئولیت‌های مشخص، اصول طراحی مشترک، کامپوننت‌های قابل استفاده مجدد و فرایندهای مشارکتی Git باعث افزایش یکپارچگی و قابلیت نگهداری پروژه می‌شود.',
    },
    achievements: [
      {
        en: 'Created a shared bilingual design system.',
        fa: 'یک سیستم طراحی مشترک دوزبانه ایجاد شد.',
      },
      {
        en: 'Implemented responsive member profiles and reusable résumé templates.',
        fa: 'پروفایل‌های واکنش‌گرای اعضا و قالب‌های قابل استفادهٔ مجدد رزومه پیاده‌سازی شدند.',
      },
      {
        en: 'Established shared data models and relationships between members and projects.',
        fa: 'مدل‌های دادهٔ مشترک و ارتباط میان اعضا و پروژه‌ها تعریف شدند.',
      },
      {
        en: 'Implemented URL-based project filtering and automated CI checks.',
        fa: 'فیلتر پروژه‌ها بر پایهٔ URL و بررسی‌های خودکار CI پیاده‌سازی شدند.',
      },
    ],
    tools: ['React', 'TypeScript', 'Vite', 'TanStack Router', 'CSS Modules', 'Vitest', 'Docker', 'GitHub Actions'],
    tags: ['react', 'typescript', 'portfolio'],
    memberSlugs: ['baran', 'alireza'],
    image: {
      src: mosaicImage,
      alt: { en: 'MOSAIC team portfolio illustration', fa: 'تصویرسازی پورتفولیوی تیم موزاییک' },
    },
    repositoryUrl: 'https://github.com/mosaic-dev-team/mosaic-portfolio',
  },
  {
    slug: 'civilization-vi',
    color: 'forest',
    title: {
      en: 'Civilization VI — Multiplayer Strategy Game',
      fa: 'Civilization VI — بازی استراتژیک چندنفره',
    },
    summary: {
      en: 'A Civilization VI–inspired turn-based strategy game built with Java, featuring an interactive hex-based map, resource management, combat, diplomacy, and multiplayer client-server communication.',
      fa: 'یک بازی استراتژیک نوبتی الهام‌گرفته از Civilization VI که با Java توسعه یافته و شامل نقشه تعاملی شش‌ضلعی، مدیریت منابع، مبارزه، دیپلماسی و ارتباط چندنفره مبتنی بر معماری کلاینت‌ـ‌سرور است.',
    },
    problem: {
      en: 'Develop a Civilization VI–inspired strategy game as an academic project at Sharif University of Technology, combining complex gameplay mechanics, an interactive graphical interface, persistent game states, and multiplayer functionality.',
      fa: 'توسعه یک بازی استراتژیک الهام‌گرفته از Civilization VI به‌عنوان پروژه دانشگاه صنعتی شریف، با ترکیب مکانیزم‌های پیچیده بازی، رابط گرافیکی تعاملی، ذخیره وضعیت بازی و قابلیت چندنفره.',
    },
    solution: {
      en: 'Developed the game across multiple phases, evolving from a single-player application into a multiplayer client-server system. Built a custom graphical interface using Java Swing and implemented network communication using sockets and JSON. Applied object-oriented design, MVC architecture, and SOLID principles to improve maintainability and code organization.',
      fa: 'بازی در چند مرحله توسعه یافت و از یک برنامه تک‌نفره به یک سیستم چندنفره مبتنی بر معماری کلاینت‌ـ‌سرور تبدیل شد. رابط گرافیکی اختصاصی با Java Swing و ارتباط شبکه با Socket Programming و JSON پیاده‌سازی شد. برای بهبود ساختار و قابلیت نگهداری کد از طراحی شیءگرا، معماری MVC و اصول SOLID استفاده شد.',
    },
    lessons: {
      en: 'Gained practical experience in object-oriented software development, MVC architecture, SOLID principles, graphical interface design, socket programming, multiplayer communication, and collaborative version control.',
      fa: 'کسب تجربه عملی در توسعه نرم‌افزار شیءگرا، معماری MVC، اصول SOLID، طراحی رابط گرافیکی، برنامه‌نویسی سوکت، ارتباط چندنفره و کنترل نسخه مشارکتی.',
    },
    achievements: [
      {
        en: 'Developed an interactive hex-based game map.',
        fa: 'نقشهٔ تعاملی بازی با خانه‌های شش‌ضلعی توسعه یافت.',
      },
      {
        en: 'Implemented turn-based gameplay, unit management, and resource management.',
        fa: 'گیم‌پلی نوبتی و مدیریت واحدها و منابع پیاده‌سازی شدند.',
      },
      {
        en: 'Implemented combat, diplomacy, trading, and building systems.',
        fa: 'سیستم‌های مبارزه، دیپلماسی، تجارت و ساخت‌وساز پیاده‌سازی شدند.',
      },
      {
        en: 'Developed persistent game states.',
        fa: 'امکان ذخیرهٔ پایدار وضعیت بازی توسعه یافت.',
      },
      {
        en: 'Built a custom graphical interface using Java Swing.',
        fa: 'رابط گرافیکی اختصاصی با Java Swing ساخته شد.',
      },
      {
        en: 'Extended the single-player game into a multiplayer client-server application using sockets and JSON.',
        fa: 'بازی تک‌نفره با استفاده از سوکت‌ها و JSON به برنامه‌ای چندنفره با معماری کلاینت‌ـ‌سرور گسترش یافت.',
      },
    ],
    tools: ['Java', 'Java Swing', 'Socket Programming', 'JSON', 'OOP', 'MVC', 'SOLID', 'Git', 'GitHub'],
    tags: ['java', 'swing', 'game-development', 'multiplayer', 'socket-programming', 'oop', 'mvc', 'solid', 'json', 'academic'],
    memberSlugs: ['baran'],
    image: {
      src: civilizationCover,
      alt: {
        en: 'Illustration of a hex-tile landscape with a winding river, a castle, and a soldier in a helmet.',
        fa: 'تصویرسازی چشم‌اندازی با خانه‌های شش‌ضلعی، رودخانه‌ای پرپیچ‌وخم، قلعه و سربازی با کلاه‌خود.',
      },
    },
    repositoryUrl: 'https://github.com/Baran-06/civilization-vi-simulation',
  },
]

export function validateProjectFilters(search: Record<string, unknown>): ProjectFilters {
  const { q, member, tag } = search

  return {
    // The router parses an unquoted numeric or boolean query as a scalar.
    q: typeof q === 'number' || typeof q === 'boolean' ? String(q) : nonBlank(q),
    member: nonBlank(member),
    tag: nonBlank(tag),
  }
}

function nonBlank(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

export function filterProjects(
  list: readonly Project[],
  { q, member, tag }: ProjectFilters,
): Project[] {
  const query = q?.trim().toLowerCase()

  return list.filter((project) =>
    (!member || project.memberSlugs.includes(member)) &&
    (!tag || project.tags.includes(tag)) &&
    (!query ||
      [project.title.fa, project.title.en, ...project.tags].some((text) =>
        text.toLowerCase().includes(query),
      )),
  )
}
