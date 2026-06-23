# How to Update Text and Images on MadSphere Web

Hey! Here is the guide to help you find and update all the text, copy, and images across the site. Everything is structured in standard React/Next.js files, so changing things is pretty straightforward.

---

## 📸 How to Change an Image (Step-by-Step Example)

Whenever you want to swap out an image, follow these two simple steps:

### Step 1: Place your image in the public folder
Save your new image file inside the `/public` folder. If it's a general asset (like a logo), put it in `public/`. If it's for a specific page, put it in `public/images/`.
For example, let's say you want to use a new portrait named `my_photo.png`. Save it here:
`public/images/my_photo.png`

### Step 2: Update the reference in the code
Open the page or component file where the image is displayed. Find the `<img>` tag and change its `src` attribute to point to the new image path relative to the public folder.

**Before:**
```tsx
<img 
  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&fit=crop" 
  alt="Founder" 
  className="w-full h-full object-cover" 
/>
```

**After:**
```tsx
<img 
  src="/images/my_photo.png" 
  alt="Founder" 
  className="w-full h-full object-cover" 
/>
```

That's it! Next.js serves files from the `public` folder directly at the root, so `/images/my_photo.png` maps straight to `public/images/my_photo.png`.

---

## 🛠️ The Main Content Data File
Instead of editing pages directly, we kept most of the main marketing lists in a single config file:
[site.ts](./src/data/site.ts)

Here's what you can update in `site.ts`:
* **Navigation Links (Lines 1-7)**: Label and page links.
* **Hero Section Cards (Lines 9-15)**: Labels and Unsplash images that scroll horizontally in the Hero block.
* **Social Media Links (Lines 17-22)**: Labels and account URLs.
* **Expertise Areas (Lines 27-70)**: Titles, descriptions, tags, and background preview images.
* **Works Portfolio (Lines 72-136)**: Project names, category tags, preview image links, and filter categories.
* **Process "How We Work" Steps (Lines 138-163)**: Steps 1 to 4 headings, descriptions, and the step illustrations mapping to `public/process_step_01.png`, etc.
* **Testimonials (Lines 165-172)**: Client quotes, names, roles, and avatar URLs (Note: This section is currently hidden from the UI for launch, but the data is here).
* **Marquee Industries (Line 175)**: Text strings for the industries carousel under the Hero section.

---

## 🖥️ Page-by-Page Code Directory

If you want to edit page headings, paragraphs, or local layout images, open these files:

### 1. Homepage
File Path: [page.tsx](./src/app/page.tsx)
* **Logos (Lines 190-191)**: Points to `/logo.png` and `/logo_white.png`.
* **Hero Background (Line 207)**: Points to `/hero_gradient_bg.png`.
* **Hero Copy (Lines 233-240)**: Heading (`Brands That Can't Be Ignored.`) and paragraph text.
* **About Us Teaser (Lines 358-394)**: Left-side paragraph and bullet list of services.
* **About Us Images (Lines 429 & 440)**: Right-side Unsplash photos.
* **Founder Section (Lines 484-539, Commented Out)**: Heading and three main narrative paragraphs explaining the studio launch.
* **Founder Photos (Lines 525-535, Commented Out)**: The two vertical founder portrait photos.

### 2. About Page
* **SEO Metadata (Titles/Description)**: [about/page.tsx](./src/app/about/page.tsx)
* **Text & Images Copy**: [AboutClient.tsx](./src/app/about/AboutClient.tsx)
  * *Scroll-Triggered Zoom Intro (Lines 35-42)*: The zoom text blocks (`we discover. we design. we disrupt.`).
  * *Hero Title & Paragraph (Lines 69-79)*: Studio introduction description.
  * *Hero Landscape Image (Lines 83-87)*: Unsplash landscape banner image.
  * *Principles Grid (Lines 103-124)*: The titles, descriptions, and image previews for the four core principles.
  * *Vision & Mission Cards (Lines 204-213)*: Heading labels and text blocks.

### 3. Services Page
* **SEO Metadata (Titles/Description)**: [services/page.tsx](./src/app/services/page.tsx)
* **Text & Images Copy**: [ServicesClient.tsx](./src/app/services/ServicesClient.tsx)
  * *Detailed Service Breakdown (Lines 8-141)*: An array containing the names, subheadings, and bullet list item details (like Positioning, Messaging, Identity) showing titles, descriptions, and outputs.
  * *Hero Landscape Banner (Lines 168-172)*: Header image.

### 4. Careers Page
* **SEO Metadata (Titles/Description)**: [careers/page.tsx](./src/app/careers/page.tsx)
* **Text & Images Copy**: [CareersClient.tsx](./src/app/careers/CareersClient.tsx)
  * *Perks list (Lines 20-57)*: Emojis, titles, and descriptions.
  * *Open Positions Grid (Lines 60-89)*: Roles, contract types, experience levels, location details, and job descriptions.
  * *Main Heading (Line 104)*: `Join the MadSphere`
  * *Vibe Section Image (Line 128)*: The 3D-angled team portrait loaded from `/images/careers_portrait.png`.
  * *CV Submission Banner (Lines 282-311)*: Large footer header text and Unsplash circular avatar pictures.

### 5. Contact Page
* **SEO Metadata (Titles/Description)**: [contact/page.tsx](./src/app/contact/page.tsx)
* **Text & Images Copy**: [ContactClient.tsx](./src/app/contact/ContactClient.tsx)
  * *Header Text (Line 42)*: `Let's make something great`
  * *Contact Cards (Lines 57-72)*: Text details for Email (`hello@madsphere.in`), Phone, Address, and Studio Hours.
  * *Service Dropdown / Budget Options (Lines 116-130)*: Select options.

### 6. Works Page (3D WebGL Portfolio)
* **SEO Metadata (Titles/Description)**: [works/page.tsx](./src/app/works/page.tsx)
* **Text & Images Copy**: [WorksClient.tsx](./src/app/works/WorksClient.tsx)
  * *Audio Track Source (Line 37)*: Ambient track file loaded from `/audio/bg-audio.mp3`.
  * *Logo & Navigation (Line 68)*: Path to `/logo.png`.
  * *Overlay Text (Lines 88-92)*: Section title overlay copy.
  * *Preloader Overlay Splash (Line 105)*: Shutter screen intro copy (`Enter into the world of Madsphere`).

---

##  Global & Shared Layout Components

These global components appear on multiple pages:

### 1. Global Navigation Bar
File Path: [Navbar.tsx](./src/components/Navbar.tsx)
* **Navbar Logo Paths (Lines 38-39)**: Points to `/logo.png` and `/logo_white.png`.
* **Talk Button Email (Line 104)**: Mobile popup email contact action (points to `mailto:hello@madsphere.in`).

### 2. Global Footer
File Path: [Footer.tsx](./src/components/Footer.tsx)
* **Hero Text (Lines 29-30)**: Upper footer headline `Let's build something real.`.
* **Floating Portraits (Lines 50 & 70)**: Left and right portrait images floating behind the text.
* **Subtitle Description (Line 75)**: `Tell us where you are, where you want to go...`.
* **Logo Label (Line 111)**: Large serif `MADSPHERE` text.
* **Copyright Label (Line 133)**: `© 2026 MadSphere Marketing Agency. All rights reserved.`.

### 3. FAQ Section Accordion
File Path: [FAQ.tsx](./src/components/FAQ.tsx)
* **FAQ Q&A List (Lines 9-40)**: Questions and answers array.
* **Side Image (Line 109)**: Unsplash VR developer preview photo.

### 4. Careers Apply Form Modal
File Path: [ApplyModal.tsx](./src/components/ApplyModal.tsx)
* **API Route endpoint (Line 49)**: Points to `/api/apply`.
* **Modal details (Lines 112-114)**: Success alert copy.
* **Modal footer email (Line 235)**: Form footnote details (`Sent to madsphere.info@gmail.com`).

### 5. Floating Animated Mascot
File Path: [Mascot.tsx](./src/components/Mascot.tsx)
* **Mascot Image (Line 18)**: Points to `/mascot.png`.

### 6. Shutter Page Preloader
File Path: [Preloader.tsx](./src/components/Preloader.tsx)
* **Logo (Line 95 & 205)**: Dark mode preloader logo path `/logo_white.png`.
* **Loading Tag (Line 97)**: `Loading Experience`.
