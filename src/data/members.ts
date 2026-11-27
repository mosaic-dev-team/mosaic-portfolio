import alirezaPortrait from '../assets/portraits/alireza.webp'
import baranPortrait from '../assets/portraits/baran.webp'
import type { Member } from './types'

export const members: readonly Member[] = [
  {
    slug: 'baran',
    name: { en: 'Baran Sheikhestani', fa: 'باران شیخ ستانی' },
    role: {
      en: 'Frontend Developer & Applied Mathematics Student',
      fa: 'توسعه‌دهنده فرانت‌اند و دانشجوی ریاضیات کاربردی',
    },
    bio: {
      en: "I'm an Applied Mathematics student at Sharif University of Technology, a frontend developer, and an aspiring software engineer with a passion for creative design. I enjoy exploring the intersection of mathematics and computer science while building thoughtful digital experiences.",
      fa: 'دانشجوی ریاضیات کاربردی دانشگاه صنعتی شریف و توسعه‌دهنده فرانت‌اند هستم و به دنبال پیشرفت در مسیر مهندسی نرم‌افزار و طراحی خلاقانه‌ام. از کشف ارتباط میان ریاضیات و علوم کامپیوتر و خلق تجربه‌های دیجیتال هدفمند لذت می‌برم.',
    },
    skills: [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Java', 'Python', 'Responsive Web Design',
      'Git', 'Java Swing', 'Docker', 'Data Analysis', 'Object-Oriented Programming', 'Problem Solving',
    ],
    education: [
      {
        title: { en: 'B.Sc. in Mathematics and Applications', fa: 'کارشناسی ریاضیات و کاربردها' },
        institution: { en: 'Sharif University of Technology', fa: 'دانشگاه صنعتی شریف' },
        period: { en: '2024–2028 (Expected)', fa: '۱۴۰۳ تا ۱۴۰۷ (پیش‌بینی‌شده)' },
      },
      {
        title: {
          en: 'Short-term Computer Science Study Program',
          fa: 'دوره آموزشی کوتاه‌مدت علوم کامپیوتر',
        },
        institution: { en: 'Capilano University', fa: 'دانشگاه کاپیلانو' },
        period: { en: 'April–May 2025', fa: 'اردیبهشت ۱۴۰۴' },
      },
    ],
    experience: [
      {
        title: {
          en: 'Teaching Assistant — Basic Programming (Java)',
          fa: 'دستیار آموزشی درس مبانی برنامه‌نویسی (Java)',
        },
        organization: { en: 'Sharif University of Technology', fa: 'دانشگاه صنعتی شریف' },
        period: { en: 'Present', fa: 'تاکنون' },
        responsibilities: [
          { en: 'Designing Java programming exercises.', fa: 'طراحی و تألیف تمرین‌های برنامه‌نویسی جاوا.' },
          { en: 'Grading programming assignments.', fa: 'تصحیح تکالیف دانشجویان.' },
        ],
      },
      {
        title: { en: 'Frontend Development Bootcamp', fa: 'بوت‌کمپ توسعه فرانت‌اند' },
        organization: { en: 'Hamrah Academy', fa: 'آکادمی همراه اول' },
        period: { en: 'Autumn 2026', fa: 'شهریور تا آذر ۱۴۰۵' },
      },
      {
        title: {
          en: 'Frontend Developer — Team Capstone Project',
          fa: 'توسعه‌دهنده فرانت‌اند — پروژه پایانی تیمی',
        },
        organization: { en: 'MOSAIC', fa: 'موزاییک' },
        period: { en: '2026', fa: '۱۴۰۵' },
      },
    ],
    languages: [
      { name: { en: 'Persian', fa: 'فارسی' }, level: { en: 'Native', fa: 'زبان مادری' } },
      { name: { en: 'English', fa: 'انگلیسی' }, level: { en: 'Advanced', fa: 'پیشرفته' } },
    ],
    ielts: { overallBand: 7.0, date: '2023-12-25' },
    resumePdfUrl: 'resumes/BaranSheikhestaniResume.pdf',
    contact: {
      email: 'baran.sheikhestani@gmail.com',
      githubUrl: 'https://github.com/Baran-06',
      linkedinUrl: 'https://www.linkedin.com/in/baran-sheikhestani-774369365/',
    },
    portrait: {
      src: baranPortrait,
      alt: { en: 'Pencil portrait of Baran Sheikhestani', fa: 'پرتره مدادی باران شیخ ستانی' },
    },
  },
  {
    slug: 'alireza',
    name: { en: 'Alireza Arabshahi', fa: 'علیرضا عربشاهی' },
    role: { en: 'Software Developer', fa: 'توسعه‌دهنده نرم‌افزار' },
    bio: {
      en: "I'm a software developer and a generalist with over five years of experience building web applications. I'm passionate about product development, where logic and creativity come together. Beyond software, I'm interested in cinema, filmmaking, and storytelling. I believe what matters most is the impact we make through what we build and how we connect with others.",
      fa: 'توسعه‌دهنده نرم‌افزار و علاقه‌مند به حوزه‌های مختلف هستم و بیش از پنج سال تجربه توسعه برنامه‌های وب دارم. توسعه محصول برایم نقطه تلاقی منطق و خلاقیت است. در کنار برنامه‌نویسی، به سینما، ساخت ویدیو و داستان‌گویی علاقه دارم. معتقدم آنچه بیش از همه اهمیت دارد، تأثیری است که از طریق ساخته‌ها و ارتباطاتمان بر زندگی دیگران می‌گذاریم.',
    },
    skills: [
      'JavaScript', 'TypeScript', 'Vue.js', 'React', 'HTML', 'CSS', 'C#', 'ASP.NET Core',
      'Bootstrap', 'Tailwind CSS', 'REST APIs', 'Entity Framework Core', 'Git', 'Docker',
    ],
    education: [
      {
        title: { en: "Bachelor's Degree in Information Technology", fa: 'کارشناسی فناوری اطلاعات' },
        institution: {
          en: 'Islamic Azad University, North Tehran Branch',
          fa: 'دانشگاه آزاد اسلامی، واحد تهران شمال',
        },
        period: { en: 'September 2015 – June 2019', fa: 'سپتامبر ۲۰۱۵ تا ژوئن ۲۰۱۹' },
      },
    ],
    experience: [
      {
        title: { en: 'Frontend Developer', fa: 'توسعه‌دهنده فرانت‌اند' },
        organization: { en: 'Department of Environment', fa: 'سازمان حفاظت محیط زیست' },
        period: { en: 'July 2020 – July 2025', fa: 'جولای ۲۰۲۰ تا جولای ۲۰۲۵' },
      },
      {
        title: { en: 'Frontend Developer', fa: 'توسعه‌دهنده فرانت‌اند' },
        organization: {
          en: 'Kish Airport Resource Management System',
          fa: 'سیستم مدیریت منابع فرودگاه کیش',
        },
        period: { en: 'November 2023 – December 2023', fa: 'نوامبر ۲۰۲۳ تا دسامبر ۲۰۲۳' },
      },
      {
        title: { en: 'Volunteer Frontend Developer', fa: 'توسعه‌دهنده داوطلب فرانت‌اند' },
        organization: { en: 'UX Shiraz', fa: 'UX شیراز' },
        period: { en: 'January 2024 – January 2025', fa: 'ژانویه ۲۰۲۴ تا ژانویه ۲۰۲۵' },
      },
    ],
    languages: [
      { name: { en: 'Persian', fa: 'فارسی' }, level: { en: 'Native', fa: 'زبان مادری' } },
      { name: { en: 'English', fa: 'انگلیسی' }, level: { en: 'Intermediate', fa: 'متوسط' } },
    ],
    resumePdfUrl: 'resumes/AlirezaArabshahiResume.pdf',
    contact: {
      email: 'arabshahii.alireza@gmail.com',
      githubUrl: 'https://github.com/AlirezaArabshahi',
      linkedinUrl: 'https://linkedin.com/in/AlirezaArabshahi',
    },
    portrait: {
      src: alirezaPortrait,
      alt: { en: 'Pencil portrait of Alireza Arabshahi', fa: 'پرتره مدادی علیرضا عربشاهی' },
    },
  },
  {
    slug: 'demo',
    name: { en: 'Sara Demo', fa: 'سارا نمونه' },
    role: { en: 'Frontend developer', fa: 'توسعه‌دهندهٔ فرانت‌اند' },
    bio: {
      en: 'A sample profile for building the shared Mosaic résumé page.',
      fa: 'پروفایل نمونه برای ساخت صفحهٔ رزومهٔ مشترک موزاییک.',
    },
    skills: ['React', 'TypeScript', 'CSS'],
    education: [
      {
        title: { en: 'Web development fundamentals', fa: 'مبانی توسعهٔ وب' },
        institution: { en: 'Self-directed study', fa: 'مطالعهٔ خودآموز' },
        period: { en: '2026', fa: '۱۴۰۵' },
      },
    ],
    experience: [
      {
        title: { en: 'Frontend bootcamp participant', fa: 'هنرجوی بوت‌کمپ فرانت‌اند' },
        organization: { en: 'Hamrah Academy', fa: 'آکادمی همراه' },
        period: { en: 'Autumn 2026', fa: 'پاییز ۱۴۰۵' },
      },
    ],
    contact: { email: 'sara@example.com' },
  },
]
