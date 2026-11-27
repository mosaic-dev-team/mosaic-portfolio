# AI Usage

برای هر کار ثبت می‌کنیم از چه دستیاری کمک گرفتیم، کدام خروجی وارد پروژه شد و چه کسی آن را انجام داد.

## راه‌اندازی اولیه

ستاپ اولیه پروژه کاملاً توسط انسان انجام شد.

## ساخت روت‌های سمپل

- **ابزار:** Codex
- **انجام‌دهنده:** Alireza
- **توضیح:** ستاپ اولیه روتر و یک نمونه روت دستی بود؛ بقیه روت‌های سمپل و کارهای تکراری با کمک AI انجام شد.

## Issue #4 — Base Styles & Shared UI Components

- **مسئول:** Baran
- **ابزار:** Codex

**بخش‌های توسعه‌یافته:**

- `src/styles/` — Design Tokens، پالت رنگی، Light/Dark
- `src/index.css` — استایل سراسری، Reset، Typography
- `src/context/` — مدیریت تم، زبان و تنظیمات کاربر
- `src/components/layout/` — Header و Footer
- `src/components/ui/` — کامپوننت Card
- `src/components/home/` — اسکلت صفحه اصلی (Bento Grid)
- `src/routes/` و `src/main.tsx` — اتصال به Routing و Providerها

**نحوه استفاده از AI:** کمک در پیاده‌سازی، سازمان‌دهی فایل‌ها، بررسی ساختار و بهبود استایل‌ها.

**چطور چک کردیم:**  
کد با ESLint و Vitest بررسی شد، بیلد پروداکشن گرفته شد، و در مرورگر Chromium هم حالت‌های ریسپانسیو، تم روشن/تاریک و جهت RTL/LTR تست شد.

### اصلاحات ریویوی PR #11

- **ابزار:** Codex
- **چیزی که از AI گرفتیم و اعمال کردیم:**  
  نام صفحه خانه درست شد، داده‌های دوزبانه کارت‌ها اضافه شد، ناوبری مشترک یکدست شد، تم ساده‌تر شد و چند مورد CSS اصلاح شد.
- **بررسی:** خودمان دستی ریویو کردیم (فقط diff را دیدیم؛ lint و تست و build دوباره اجرا نشد).

## Issue #7 — Visual Identity, Shared Components & Homepage

**مسئول توسعه:** Person B

**ابزارهای کمکی:** ChatGPT و Codex

### بخش‌های توسعه‌یافته

- `src/assets/fonts/`: افزودن فونت‌های محلی Fraunces، Inter و Vazirmatn.
- `src/assets/brand/`: طراحی و آماده‌سازی لوگوی اختصاصی MOSAIC.
- `src/assets/illustrations/`: آماده‌سازی تصویر اصلی صفحه Home.
- `src/assets/portraits/`: طراحی پرتره‌های اختصاصی اعضای تیم.
- `src/assets/projects/`: طراحی و بهینه‌سازی تصاویر پروژه‌ها.
- `src/styles/` و `src/index.css`: بهبود Design Tokens و Typography.
- `src/components/layout/`: بهبود طراحی Header و Footer.
- `src/components/ui/`: توسعه کامپوننت‌های قابل استفاده مجدد MemberCard، ProjectCard و ArticleCard.
- `src/components/home/`: توسعه صفحه اصلی با چیدمان Editorial Bento Grid.
- `index.html`: تنظیم عنوان سایت و Favicon اختصاصی.

### نحوه استفاده از AI

استفاده از ChatGPT برای ایده‌پردازی، انتخاب سبک بصری و تولید تصاویر اختصاصی و استفاده از Codex به‌عنوان ابزار کمکی در فرایند توسعه، بهبود استایل‌ها، بررسی ساختار و خوانایی کد و شناسایی مشکلات احتمالی.

### بررسی خروجی

- ESLint
- Vitest
- Production Build
- Responsive Design
- بررسی Light/Dark و RTL/LTR در Chrome
- بررسی Accessibility و Color Contrast
- بررسی خوانایی و سادگی کد و جلوگیری از Over-engineering
- بهینه‌سازی حجم تصاویر با فرمت WebP

### موارد باقی‌مانده

تکمیل صفحات داخلی، اتصال داده‌های مشترک، تصاویر مقالات و اطلاعات تماس.

## Issue #3 — مدل‌های داده و ساختار مسیرها

- **ابزار:** Codex
- **خروجی استفاده‌شده:** مدل‌های دوزبانه و داده‌های نمونه، قالب‌بندی تاریخ، انتقال مسیرها به پوشه‌های جدا با `$slug` و تست‌های داده و مسیریابی.
- **تکمیل قرارداد داده:** فیلدهای تحصیلات، تماس، تصاویر با متن جایگزین دوزبانه و دستاوردهای پروژه با کمک Codex اضافه شدند.
- **بررسی:** ESLint، هر ۸ تست Vitest و بیلد TypeScript و Vite در محیط محلی موفق بودند.
