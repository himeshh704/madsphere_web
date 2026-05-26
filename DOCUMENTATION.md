# MadSphere Web Architecture & Motion Documentation

This document serves as a comprehensive developer reference for the custom UI animations, route transition logic, anti-inspection protections, responsive design systems, and multi-section layouts built for the MadSphere digital agency platform.

---

## 1. Initial Load & Route Transition Preloaders
Located in: [`src/components/Preloader.tsx`](./src/components/Preloader.tsx)

We implement two distinct preloader workflows depending on the client lifecycle:

### A. Initial Load Sequence (First Reload)
- **Kinematic Running Stickman**: Built entirely using hierarchical vector SVG elements. Rather than rotating independent lines, lower limbs (calves) are nested inside parent thigh groups, locking the knee joint in place relative to the swing of the hip. Similarly, forearm lines are nested inside upper arm groups to lock the elbows.
  - Alternating leg keyframes (`run-thigh-l`, `run-thigh-r`) oscillate between `-35deg` and `35deg` while calves bend dynamically (`run-calf-l`, `run-calf-r`) up to `85deg` on swingbacks.
  - A subtle torso/head bobbing transition (`run-body-bob` applying `translateY(3px)`) is matched to the running tempo to simulate stride impacts.
- **Dynamic Track-Following**: The stickman container's horizontal position maps directly to the loading progress bar using relative positioning `style={{ left: "calc(" + progress + "% - 25px)" }}`.
- **Cinematic Split Shutter**: Once progress reaches `100%`, a horizontal curtain-open animation splits the viewport. The top and bottom black panels transition out of the viewport in opposite directions (`y: -100%` and `y: 100%`) using a custom high-performance cubic-bezier ease (`[0.76, 0, 0.24, 1]`) to reveal the website with a cinematic grand opening.

### B. Client Route Transitions (Page Changes)
- **Automated Route Trigger**: The preloader hooks into the Next.js navigation stack using `usePathname()`.
- **Snappy wiper loader**: When changing pages, a quick progress-bar animation (approx 400ms duration) is displayed to cover server rendering latency, keeping page switches fluid.

---

## 2. Page Scroll & Sequential Animations
Located in: [`src/app/page.tsx`](./src/app/page.tsx) and [`src/app/works/page.tsx`](./src/app/works/page.tsx)

### A. How We Work Process Sequence
- **Connecting Dotted Connectors (Desktop)**: On screens `>= 1024px`, absolute SVG paths connect the right edges of the process steps to the left edges of subsequent columns using S-curve cubic Bezier curves (`d="M ... C ..."`).
- **Staggered Entrance**: The cards and paths reveal sequentially. On desktop, card $i$ delays by $i \times 0.8\text{s}$, and line $i$ delays by $(i \times 0.8 + 0.45)\text{s}$. This paces the animations in a fluid chain (Card 1 ➔ Line 1 ➔ Card 2 ➔ Line 2 ➔ Card 3 ➔ Line 3 ➔ Card 4).
- **Responsive Fallback**: On mobile, the SVG lines are hidden and cards slide up in a rapid stagger cascade ($i \times 0.15\text{s}$ delay) to keep interactions snappy.

### B. Parallax & 3D Limb Tilts (Touch-Optimized)
- **Scroll-Linked Parallax**: Utilizes Framer Motion's `useScroll` and `useTransform` to bind image scale/position to scroll speed. Disabled on viewports width `< 768px` to bypass calculations during touch scrolling.
- **Tilt3D Engine**: Portfolio and team cards map mouse coordinates relative to the card's bounding rectangle (`getBoundingClientRect()`), updating `rotateX` and `rotateY` springs to create physical 3D depth on hover. Omitted on touch-pointer viewports to optimize paint performance.

---

## 3. Works Page Layout Architecture
Located in: [`src/app/works/page.tsx`](./src/app/works/page.tsx)

The Works page is a multi-section document designed to mirror Figma specifications:
1. **Header Grid**: Contains a staggered 2-column flex layout splitting the "Featured Work" title on the left and the portfolio tag and styling descriptor on the right.
2. **Philosophy Block & Client Marquee**: Showcases the centered creative-engineering philosophy header and the brand logo marquee loop.
3. **White-boxed Works Grid**: Wrapped in a prominent rounded container (`rounded-[2rem] bg-white border dark:bg-[#070708]`) that houses the category filters and the 3-column staggered masonry grid.
4. **How We Work**: Embeds the responsive 4-step process cards alongside custom 3D image assets (chrome cube, hand, dispenser, iridescent ring).
5. **Client Stories**: Embeds the testimonial slider to build social proof.
6. **Careers Banner**: A dark call-to-action block featuring inline overlapping avatars with slow spring scroll entry, vertical float cycles, and hover zoom effects mirroring the footer style.

---

## 4. Robust Code Copy & Inspection Protections
Located in: [`src/components/AntiInspect.tsx`](./src/components/AntiInspect.tsx) and [`src/app/globals.css`](./src/app/globals.css)

To protect intellectual property, we block browser source-inspection vectors:

- **Keyboard & Menu Blocks**: Intercepts:
  - F12, DevTools (`Ctrl+Shift+I` / `Cmd+Option+I`), Console window (`Ctrl+Shift+J` / `Cmd+Option+J`), and View Source (`Ctrl+U` / `Cmd+U`).
  - Page saving (`Ctrl+S` / `Cmd+S`).
  - Right-click context menus (`contextmenu` event).
- **Clipboard & Drag Protections**:
  - Global intercept on the `copy` event to disable clipboard copy command.
  - Global intercept on `dragstart` for `img` and `video` tags to prevent dragging images to desktops or directories.
- **User-Select CSS rules**: `user-select: none` is applied globally in `globals.css` to prevent text highlighting. Normal selection is dynamically re-enabled only on `<input>`, `<textarea>`, and `<select>` fields so forms remain fully functional.
- **DevTools Debugger Loop**: In production mode (`process.env.NODE_ENV === "production"`), a loop runs every second to check script execution speed. If DevTools is open, a `debugger` statement pauses execution. If the delay exceeds 100ms, the script clears the DOM (`document.body.innerHTML = 'Developer tools are disabled.'`) and triggers a reload.
