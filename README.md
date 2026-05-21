# Madsphere
**A High-End Cinematic Creative Agency Framework**

*Engineered and architected by Himesh Choudhary.*

Madsphere is a highly optimized, interactive frontend architecture built for creative agencies, studios, and high-tier digital portfolios. It relies heavily on math-driven physics, custom WebGL-style DOM interactions, and aggressive performance optimizations.

## Core Architecture

This project is built using modern React server/client paradigms to ensure maximum performance while allowing heavy physics-based client animations.

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (v4) with custom theme tokens.
- **Motion & Physics**: Framer Motion
- **Icons**: Lucide React

## Animation & Interaction Philosophy

Madsphere moves away from generic CSS transitions and relies on custom-tuned spring physics.

- **`useScroll` & Parallax**: We utilize Framer Motion's `useScroll` combined with `useTransform` to tie element opacity, Y-axis translation, and blur filters directly to the user's scroll velocity. 
- **`Tilt3D` Engine**: Portfolio items and process steps are wrapped in a custom 3D tilt engine that maps mouse coordinates (`clientX`, `clientY`) to DOM element bounding rectangles, updating `rotateX` and `rotateY` via `useSpring` to create tactile depth.
- **Magnetic Wrapping**: Navigation and Call-To-Action buttons utilize bounded spring boundaries to physically follow the user's cursor.
- **Touch-Aware Degradation**: For mobile and touch devices (`matchMedia("(pointer: coarse)")`), complex 3D tracking is gracefully degraded to ensure stable 60fps scrolling without jitter.

## Key Directories

- `/src/app/` - Core routing hierarchy and global layouts.
- `/src/app/template.tsx` - Handles the cross-fade and Y-axis translation when navigating between routes, ensuring a SPA-like premium feel.
- `/src/components/Animations.tsx` - The central physics engine containing reusable wrappers (`MagneticWrap`, `Tilt3D`, `FloatingOrbs`, `TextReveal`).
- `/src/components/Preloader.tsx` - Simulates heavy asset loading to delay the initial render until the DOM is fully constructed.
- `/src/data/site.ts` - Centralized data store for portfolio items, stats, and text copy.

## Development

To spin up the local development server:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The application will be available at `http://localhost:3000`.

## Production Build

Ensure that there are no hydration mismatches caused by browser extensions during development. For final deployment to Vercel:

```bash
npm run build
npm start
```
