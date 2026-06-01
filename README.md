# Kumar Saksham — Personal Portfolio

A 3D interactive personal portfolio built with React, Three.js, and Framer Motion. Features a real-time solar system where each planet represents a project, a Milky Way starfield background, live Codeforces stats, and multilingual greetings.

---

## Live Demo

> Deploy via Vercel — see [Hosting](#hosting) section below.

---

## Features

- **3D Solar System** — 7 planets with real NASA textures (Mercury → Uranus), each mapped to a project. Click a planet to explore. Drag to orbit.
- **Milky Way Background** — procedural Canvas 2D starfield with galactic band, nebula blobs, and twinkling stars across every section.
- **Multilingual Hero** — greeting rotates through 12 languages on the landing page.
- **Live Codeforces Counter** — fetches real wrong submission count from the Codeforces public API on page load.
- **Floating UI** — Works 🪐, Talk 🛰️, CV📄, and Me 🌙 buttons drift in space with GPU-composited CSS animations.
- **Custom Cursor** — dot + ring cursor with hover states.
- **Skills Section** — filterable by category, switchable between bar and orb views.
- **Contact Form** — wired to EmailJS, sends real emails to `amostsaksham@gmail.com`.
- **Sections** — Hero, About, Skills, Projects (Solar System), Contact.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| 3D | Three.js, React Three Fiber, React Three Drei |
| Animation | Framer Motion |
| Contact | EmailJS |
| Fonts | Arial (system) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── About.jsx          # About section
│   ├── Contact.jsx        # Contact form (EmailJS)
│   ├── Cursor.jsx         # Custom cursor
│   ├── Footer.jsx         # Footer
│   ├── Hero.jsx           # Landing page
│   ├── MilkyWay.jsx       # Fixed starfield background
│   ├── Navbar.jsx         # Navigation
│   ├── Planet.jsx         # Individual planet with texture + rings
│   ├── Projects.jsx       # Projects section wrapper
│   ├── Skills.jsx         # Skills section
│   ├── SolarSystem.jsx    # 3D solar system canvas
│   └── StarField.jsx      # R3F star points (used in Hero)
├── data/
│   └── projects.js        # Project data + skills data
├── App.jsx
├── App.css
├── index.css
└── main.jsx
public/
└── textures/              # Local planet texture files
    ├── sun.jpg
    ├── mercury.jpg
    ├── venus.jpg
    ├── earth.jpg
    ├── mars.jpg
    ├── jupiter.jpg
    ├── saturn.jpg
    ├── uranus.jpg
    └── saturn_ring.jpg
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Contact Form Setup (EmailJS)

The contact form sends real emails but requires a free EmailJS account:

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Add a Gmail service → copy the **Service ID**
3. Create a template with variables `{{from_name}}`, `{{from_email}}`, `{{message}}` → copy the **Template ID**
4. Go to Account → API Keys → copy your **Public Key**
5. Open `src/components/Contact.jsx` and replace:

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
```

---

## Hosting

### Deploy to Vercel + Custom Domain

**1. Push to GitHub**
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/KrSaksh/portfolio.git
git push -u origin main
```

**2. Deploy on Vercel**
- Go to [vercel.com](https://vercel.com) → sign in with GitHub
- Import the `portfolio` repo → Deploy (Vite is auto-detected)
- Every push to `main` triggers a redeploy

**3. Connect a custom domain**
- Vercel → Project → Settings → Domains → add your domain
- In your registrar's DNS, add:
  - `A` record: `@` → `76.76.21.21`
  - `CNAME` record: `www` → `cname.vercel-dns.com`
- SSL is provisioned automatically

---

## Planet → Project Mapping

| Planet | Project |
|---|---|
| Mercury | Flipzon (Online Retail System) |
| Venus | Aarogya (Elderly Assistant) |
| Earth | MeMS (Memory Management System) |
| Mars | NES Emulator |
| Jupiter | Custom Assembler & Simulator |
| Saturn | PathWander (Journey Tracker) |
| Uranus | Tank Stars (2D Artillery Game) |

---

## Credits

- Planet textures — [Planet Pixel Emporium](https://planetpixelemporium.com) (public domain)
- Earth texture — NASA Visible Earth (public domain)
- Icons — inline SVG (no external dependency)

---

## License

MIT — free to use and adapt.
