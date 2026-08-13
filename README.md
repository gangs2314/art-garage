# Art Garage Tattoo Studio — Ultra-Luxury Website

A production-ready, mobile-first, editorial luxury website built with **React + Vite + Tailwind CSS**.

> **You Imagine It. We Ink It.**
> Bangalore's Premier Custom Tattoo Studio — Rajajinagar

---

## ✨ Features

- **Ultra-luxury editorial design** — bone-white canvas, editorial serif typography, museum-grade image treatment
- **Omnipresent contact engine** — WhatsApp, Call, Instagram accessible from every viewport
- **Fully responsive** — mobile-first design tested from 360px phones → 4K desktops
- **Interactive portfolio** — filterable masonry gallery with lightbox modal
- **Overlay architectural menu** — dark glassmorphic panel with luxury action cards
- **Live map integration** — embedded Google Maps of Rajajinagar studio
- **Floating action dock** — mobile FAB pattern that expands into WhatsApp / Call / Instagram
- **Bottom-left authority badges** — Google Reviews 4.9★, hygiene certification, Instagram
- **Zero placeholders** — every component fully written and production-ready

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
```

The optimized production bundle will be output to the `/dist` folder — ready to deploy to Vercel, Netlify, Hostinger, or any static host.

### 4. Preview the production build locally

```bash
npm run preview
```

---

## 📁 Project Structure

```
art-garage-luxury-studio/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── index.css
    ├── main.jsx
    ├── App.jsx
    └── components/
        ├── Navbar.jsx
        ├── OverlayMenu.jsx
        ├── AuthorityDock.jsx
        ├── Hero.jsx
        ├── Manifesto.jsx
        ├── PortfolioGrid.jsx
        ├── Artists.jsx
        ├── Process.jsx
        ├── StudioSpace.jsx
        ├── FloatingContactBar.jsx
        ├── LocateModal.jsx
        └── Footer.jsx
```

---

## 🎨 Design System

| Token | Value | Purpose |
|-------|-------|---------|
| `bone` | `#FAFAF7` | Primary background (warm off-white) |
| `ink` | `#111111` | Primary text and CTAs |
| `warmGray` | `#6B6863` | Secondary text |
| `bloodRed` | `#8C1F1F` | Accent (hover states, highlights) |
| `mutedGold` | `#B8975B` | Luxury detail accent |

**Typography**
- Display / Headline: **Cormorant Garamond** (editorial serif)
- Body / UI: **Plus Jakarta Sans** (clean grotesque sans)

---

## 📱 Responsive Breakpoints

- `xs`: 400px (small phones)
- `sm`: 640px (large phones)
- `md`: 768px (tablets)
- `lg`: 1024px (small laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large desktops)

**Mobile-first tested**: iPhone SE, iPhone 14, Samsung Galaxy, iPad, iPad Pro, MacBook, Ultra-wide.

---

## 📞 Contact Integration (Everywhere)

Every page includes multiple contact touchpoints:

1. **Sticky Navbar** — Locate Us, WhatsApp icon, Call icon, Menu
2. **Hero CTA row** — Book Appointment / Book on Call / WhatsApp
3. **Bottom-left Authority Dock** — Google reviews, hygiene badge, @artgaragetattoo Instagram
4. **Bottom-right Floating Action** — WhatsApp chat pill + Call + Instagram
5. **Overlay Menu Footer** — All channels
6. **Portfolio Modals** — "Inquire About Similar Work" WhatsApp deep link
7. **Artist Cards** — "Book With Artist" WhatsApp deep link
8. **Studio Space Section** — Full contact block
9. **Footer** — Complete contact grid

**Direct contact endpoints used:**
- 📱 WhatsApp: `+91 77958 75799` (pre-filled messages)
- ☎️ Phone: `tel:+917795875799`
- 📸 Instagram: `@artgaragetattoo`
- ✉️ Email: `sudeepkr59351@gmail.com`

---

## 🖼️ Replacing Images

All images currently use Unsplash CDN URLs (desaturated by CSS filter to look museum-grade).

To replace with your own Art Garage / Instagram photos:

1. Add your images to `public/images/`
2. In each component, replace the `src="https://images.unsplash.com/..."` URL with `src="/images/your-photo.jpg"`

The `fine-art-img` CSS class will automatically apply the luxury desaturated grade.

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

Drag & drop the `/dist` folder into [netlify.com/drop](https://app.netlify.com/drop).

### Static hosting (Hostinger, cPanel, etc.)

Upload the contents of `/dist` to your public HTML folder.

---

## 📄 License

© 2026 Art Garage Tattoo Studio. All rights reserved.

**You imagine it. We ink it.**
