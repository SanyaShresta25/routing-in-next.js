# 💼 Simple site using Next.js

A simple responsive About page built with **Next.js**, **Tailwind CSS**, and **TypeScript**.  
This layout showcases four feature cards with icons, a header navigation bar, and clean typography.

## ✨ Features

- Responsive grid layout
- Reusable header with navigation links
- Tailwind CSS styling
- Image optimization using `next/image`
- Page routing: `/`, `/about`, `/contact`

## 🗂 Folder Structure

```

src/
├── app/
│   ├── page.tsx         # Home page
│   ├── about/page.tsx   # About page (this layout)
│   └── contact/page.tsx # Contact page
├── components/
│   └── Header.tsx       # Reusable header component
public/
└── images/              # All images/icons (e.g., icon-supervisor.svg, logo.svg)

```

## 🛠️ Getting Started

1. **Install dependencies**  
```

npm install

```

2. **Run the dev server**  
```

npm run dev

```

3. Open in browser: [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/) (optional for social/media icons)
