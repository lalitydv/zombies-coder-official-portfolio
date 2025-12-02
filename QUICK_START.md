# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Implemented

✅ **Dynamic Colors**
- Primary color: Green (#22c55e)
- Secondary color: Blue (#3b82f6)
- 50 unique colors for categories (automatically assigned)

✅ **Dark/Light Theme**
- Toggle button in navbar
- Persists preference in localStorage
- Smooth transitions

✅ **Multi-Language Support**
- English (default)
- Hindi (हिंदी)
- Language switcher in navbar
- All content translates dynamically

✅ **250 Projects Across 50 Categories**
- Each category has 5 projects
- All projects follow "Zombies Coder – Product Name" format
- Full project details with features, tech stack, and descriptions

✅ **SEO Optimized**
- Meta tags on all pages
- Open Graph tags
- Semantic HTML structure

✅ **Fully Responsive**
- Mobile-first design
- Tablet and desktop optimized
- Touch-friendly interactions

## Project Structure

```
├── pages/
│   ├── _app.js              # App wrapper with theme/lang state
│   ├── index.js              # Homepage
│   ├── categories/
│   │   ├── index.js          # All categories
│   │   └── [slug].js         # Category detail page
│   └── projects/
│       ├── index.js          # All projects
│       └── [slug].js         # Project detail page
├── components/
│   ├── Navbar.jsx            # Navigation with theme/lang switchers
│   ├── Footer.jsx            # Footer component
│   ├── CategoryCard.jsx      # Category card with dynamic colors
│   ├── ProjectCard.jsx       # Project card component
│   ├── ProductDetail.jsx     # Project detail page component
│   ├── ThemeToggle.jsx       # Dark/light theme toggle
│   └── LanguageSwitcher.jsx  # Language switcher dropdown
├── data/
│   ├── categories.js         # 50 categories + 250 projects
│   ├── colors.js             # Color palette configuration
│   └── translations.js        # English & Hindi translations
└── styles/
    └── globals.css            # Global styles + Tailwind
```

## Customization

### Change Colors
Edit `data/colors.js` to modify primary, secondary, or category colors.

### Add More Languages
1. Add translations to `data/translations.js`
2. Add language to `languages` array in `translations.js`

### Add More Projects
Edit `data/categories.js` - add product names to `productNames` object or modify the generation logic.

### Modify Styling
- Tailwind config: `tailwind.config.js`
- Global styles: `styles/globals.css`
- Component styles: Edit individual component files

## Build for Production

```bash
npm run build
npm start
```

## Deploy

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## Notes

- Project thumbnails are placeholders (🧟‍♂️ emoji)
- Replace `/public/favicon.ico` with your actual favicon
- Add real project images to `/public/images/` matching the slug pattern
- Update contact information in Footer component

