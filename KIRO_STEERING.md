# PAWAAC — KIRO STEERING FILE
### Exact prompts + spec requirements for each build session
> Use with Kiro Pro+ | Model: claude-opus-4-20250514
> Keep this file open in Kiro — it is your requirements document

---

## KIRO PROJECT INITIALIZATION

### First prompt (run ONCE to set context):
```
I'm building a production Next.js 15 website for PAWAAC Drones — 
an Indian autonomous surveillance drone startup. Dark, cinematic design 
modeled after anduril.com but grittier.

Tech stack:
- Next.js 15 App Router, TypeScript strict mode
- Tailwind CSS v4 with CSS variables
- React Three Fiber + @react-three/drei for 3D
- GSAP 3.12 + ScrollTrigger for scroll animations
- Framer Motion 11 for component transitions
- Lenis v2 for smooth scroll

Design system:
- Fonts: Syne (display/headings), Inter (body), IBM Plex Mono (data/metrics)
- Colors: bg #080808, surface #161616, red accent #E8202A, 
          green status #00FF88, text #F0EDE8, secondary text #8A8A8A
- Border: #1F1F1F

Aesthetic: Military intelligence meets Silicon Valley. No gradients on 
light backgrounds. Dark throughout except one white traction section. 
Custom cursor, film grain overlay, number tickers.

I will give you section-by-section requirements. Always write TypeScript,
always create proper types, always handle mobile responsiveness.
```

---

## PHASE 1: PROJECT FOUNDATION

### Prompt 1.1 — Init + Global Setup
```
Initialize the Next.js 15 project with the design system defined in context.

Create:
1. src/app/globals.css with all CSS variables and font imports
   (@import Syne from Google Fonts, Inter from Google Fonts, 
   IBM Plex Mono from Google Fonts)
   
2. src/app/layout.tsx with:
   - Font setup (next/font/google)
   - Lenis smooth scroll provider
   - Custom cursor component slot
   - Film grain overlay (pure CSS pseudo-element, subtle)
   - Meta tags for SEO

3. tailwind.config.ts extending with custom colors from design system

4. src/components/ui/FilmGrain.tsx — CSS-only grain overlay
   (Use background-image: url("data:image/svg+xml...") or 
   a repeating noise pattern, opacity 0.03-0.04)

5. src/components/providers/LenisProvider.tsx — wraps children,
   initializes Lenis, syncs with GSAP ScrollTrigger
```

### Prompt 1.2 — Custom Cursor
```
Build a custom cursor for PAWAAC website.

Component: src/components/ui/CustomCursor.tsx

Behavior:
- Default: small dot (6px) + outer ring (24px) that follows with lag
- On interactive elements (buttons, links): outer ring expands to 40px
  and fills with red (#E8202A) at 20% opacity
- On hero section: transforms to crosshair (SVG crosshair, 32px)
- On drone 3D model: radar sweep SVG animation (two arcs rotating)
- On CTA buttons: shows text "CLICK" in center of cursor ring

Implementation:
- Use useRef + requestAnimationFrame for smooth follow (not CSS transition)
- Track mouse with useEffect addEventListener
- Use data attributes on elements: data-cursor="crosshair" etc
- Hide on mobile (useMediaQuery hook)

Hide native cursor in globals.css: * { cursor: none; }
```

### Prompt 1.3 — Navigation
```
Build the sticky navigation component.

Component: src/components/layout/Navigation.tsx

Design:
- Fixed position, full width, z-index 100
- Initial state: transparent background, show on all content
- Scrolled state (>50px): dark bg #080808 with 0.9 opacity + backdrop-blur-sm
  Transition: smooth 300ms ease
- Left: PAWAAC logo SVG (white version) + "Pawaac Drones" text
- Center: nav links [Product] [Deployments] [Technology] [About]
  Font: Inter 13px weight 500, text #8A8A8A, hover: #F0EDE8
  Animated underline on hover (width: 0 → 100%, from left, red color)
- Right: [Schedule Demo] button
  Style: small, border 1px solid #E8202A, text #E8202A, 
  hover: bg #E8202A, text white
  Font: Inter 12px weight 600, uppercase, letter-spacing 0.1em

Mobile: hamburger menu → full-screen overlay
  Overlay: bg #080808, links centered, large (32px), stagger animation in
```

### Prompt 1.4 — Pre-loader
```
Build the page pre-loader component.

Component: src/components/ui/Preloader.tsx

Behavior:
1. Shows on first page load (use sessionStorage to not show on nav)
2. Duration: 1.8 seconds
3. Animation:
   - Bg: pure black #000000
   - Center: PAWAAC logo SVG, strokes draw in (dasharray animation)
     Takes 0.8s
   - Below logo: thin progress bar (#E8202A color) fills 0→100% in 1.2s
   - Text below: "INITIALIZING" in IBM Plex Mono, 10px, #8A8A8A
     Typewriter effect, then "SYSTEM READY"
4. Exit: fade out (Framer Motion AnimatePresence, 0.3s)
5. After exit: body scroll enables

Use Framer Motion for orchestration.
Do NOT use an actual loading state — it's cosmetic/UX only.
```

---

## PHASE 2: HERO + PROBLEM SECTIONS

### Prompt 2.1 — Hero Section
```
Build the hero section for PAWAAC website.

Component: src/components/sections/Hero.tsx

Layout: Full viewport (100dvh)

Video background:
- HTML5 video, autoplay, muted, loop, playsInline
- src: /videos/hero_web.webm (first) + /videos/hero_web.mp4 (fallback)
- poster: /videos/hero_poster.jpg
- CSS: object-fit cover, w-full h-full absolute inset-0
- Overlay: gradient from rgba(8,8,8,0.3) at center to rgba(8,8,8,0.75) at edges

Content (absolute positioned, bottom-left, z-10, padding 60px):
  Label: "PAWAAC DRONES — BENGALURU, INDIA"
         IBM Plex Mono, 11px, #8A8A8A, uppercase, letter-spacing 0.15em
         Fade + slide up on load (Framer Motion, delay 0.5s)
         
  H1: "Aerial security layer
       for the physical world."
      Syne, 80px desktop / 48px mobile, #F0EDE8, weight 700
      Stagger each word: fade + translateY(20px → 0), 0.05s stagger
      Start delay: 0.7s
      
  Body: "Level-5 autonomous drones. No pilots. 24×7 surveillance."
        Inter, 18px, #8A8A8A, max-width 480px
        Fade in delay 1.1s
        
  Buttons (flex row, gap 16px, margin-top 32px):
    Primary: bg #E8202A, text white, "Schedule Demo →"
             Hover: scale(1.02), brightness(1.1)
    Secondary: border 1px #F0EDE8 at 30% opacity, text #F0EDE8, "Watch in Action ▶"
             Hover: bg rgba(240,237,232,0.1)

HUD Card (absolute, top-right, 280px wide, z-10, margin 40px):
  bg rgba(22,22,22,0.8), backdrop-blur-md, border 1px #1F1F1F, rounded-sm, p-4
  
  Header row: green dot (animate-pulse) + "LIVE FEED: ACTIVE"
              IBM Plex Mono, 10px, #00FF88
  
  Data rows (IBM Plex Mono, 12px):
    "ALTITUDE" : "120m AGL" (random between 115-130 every 3s)
    "SPEED"    : "72 km/h"  (random between 68-75 every 4s)
    "COVERAGE" : "Active"
    "AI STATUS": "MONITORING" (flash to "ALERT" randomly 1/20 chance per tick)
  
  Numbers update with useInterval, number transitions with framer motion
  "CLASSIFIED FEED — AUTHORIZED ACCESS ONLY" at bottom, 9px, #8A8A8A

Scroll indicator (bottom-center):
  "SCROLL" text, IBM Plex Mono 10px #8A8A8A
  + animated down arrow (CSS keyframe bounce)
```

### Prompt 2.2 — Problem Section
```
Build the India security problem section.

Component: src/components/sections/Problem.tsx

Background: #0F0F0F

Layout: max-width 1200px, centered, padding 120px vertical

Entry animations: all use GSAP ScrollTrigger, trigger when 20% visible

Label: "INDIA-CENTRIC PROBLEM" — IBM Plex Mono, uppercase, red #E8202A, 11px

Headline (2 lines):
  "SECURITY"          — Syne 80px, white, weight 700
  "IS FAILING INDIA." — Syne 80px, white, weight 700, 
                        "FAILING" in #E8202A
  
  Animation: each word slides in from left, stagger 0.1s

Left column (40%): Three pain point blocks
  Each: left red border (2px), padding-left 16px, margin-bottom 32px
  
  [LATE/NO AWARENESS]
  Security teams operate reactively. Incidents discovered after they happen.
  
  [LIMITED COVERAGE]  
  Ground patrols cover ~3km²/hr. Drone systems require trained pilots.
  
  [MANUAL OVERLOAD]
  CCTV generates footage without intelligence. Humans can't monitor thousands of streams.
  
  Font: heading Inter 13px weight 700 uppercase, body Inter 14px #8A8A8A

Right column (60%): 2×2 stat cards grid
  Cards: bg #161616, border #1F1F1F, rounded-sm, p-6
  
  Card 1: "CRIME IN INDIA (NCRB)"  → "6.25M" (IBM Plex Mono 52px #E8202A) + "Total Reported Cases"
  Card 2: "BORDER LENGTH OF"       → "22,623 Km" (52px white) + "Coast + Land"
  Card 3: "URBAN COVERAGE"         → "<30%" (52px #E8202A) + "CCTV Penetration"
  Card 4: "ILLEGAL TRADE LOSS"     → "~$17B" (52px white) + "Impact on Economy"
  
  Numbers use react-countup — count up when scrolled into view
  Cards: fade + translateY(40px → 0) stagger on scroll entry
```

---

## PHASE 3: 3D DRONE SHOWCASE

### Prompt 3.1 — Three.js Scene
```
Build the 3D drone showcase section using React Three Fiber.

Component: src/components/sections/DroneShowcase.tsx
3D Scene: src/components/3d/DroneScene.tsx

Section background: #080808
Height: 100vh (pinned during scroll for 500px of scroll depth)

Three.js Scene setup (DroneScene.tsx):
- Canvas with gl={{ antialias: true, alpha: true }}
- Camera: fov 45, position [0, 0, 5]
- OrbitControls with autoRotate={false}, enableZoom={false}
- Damping enabled for smooth mouse response

Drone Model:
- Load /models/drone.glb using useGLTF (drei)
- Scale: fit to ~2 units height
- Position: center [0, 0, 0]
- Auto-rotate on Y axis: 0.002 radians per frame
- Mouse parallax: slight tilt (±5°) following cursor via useFrame

Lighting:
- AmbientLight: intensity 0.3, color #FFFFFF
- DirectionalLight: position [5, 5, 5], intensity 1.2 (key light)
- DirectionalLight: position [-5, 3, -5], intensity 0.4, color #3B82F6 (blue rim)
- SpotLight: position [0, 10, 0], intensity 0.6, angle 0.3 (top)

Post-processing (@react-three/postprocessing):
- Bloom: intensity 0.3, luminanceThreshold 0.8 (subtle glow on edges)
- Vignette: offset 0.5, darkness 0.5

Hotspot Annotations (HTML overlays using drei Html component):
  Each: small dot + connecting line + label card
  
  TOP-RIGHT: "30× Optical Zoom + Thermal"
  TOP-LEFT: "Onboard AI Perception"  
  BOTTOM: "Auto Dock & Battery Swap"
  LEFT: "GPS-Denied Navigation"
  RIGHT: "2 Hour Endurance"
  
  Labels fade in AFTER drone is visible (1s delay)
  On hover: label card expands with more detail

Scroll integration:
  - GSAP ScrollTrigger: as user scrolls down, drone tilts forward
    slightly (as if taking off) then resolves back to level
  - Use useScroll (drei) for position mapping

Mobile fallback:
  - If isMobile (useMediaQuery): render static drone PNG instead
  - import Image from 'next/image', show /images/drone_hero.png
  - Still show the hotspot labels as positioned elements

Section text (overlaid on canvas, HTML):
  Top-left: 
    Label: "AUTONOMOUS e-VTOL DRONE"
    H2: "Fully autonomous. Fully capable."
    Sub: "Zero manual flight operation required."
    
  Bottom: three-column specs bar (like product page)
    [Technical] [User Experience] [Autonomy]
    Each column lists 4-5 bullet points from pitch deck
```

---

## PHASE 4: FEATURE SECTIONS

### Prompt 4.1 — "No Pilot Needed" Section
```
Build the simplicity section.

Component: src/components/sections/Simplicity.tsx

Background: #0F0F0F

Layout: Two columns, equal width, 120px vertical padding

Left column (video):
  - Video player: drone footage showing someone drawing a route on tablet
  - Autoplay on scroll entry (IntersectionObserver)
  - Rounded corners (4px), slight shadow
  - "PAWAAC SIMPLICITY" red badge top-left of video frame

Right column (text + steps):
  Label: "REVOLUTIONARY SIMPLICITY"  
  H2: "If you know how to use a phone, you can fly PAWAAC drones."
  
  Four step cards (animate in stagger on scroll):
  Each: flex row, number circle (red, IBM Plex Mono) + text
  
  ① "Draw your patrol route on the map"
  ② "Hit Go — drone flies itself"  
  ③ "AI watches every frame, detects anomalies"
  ④ "Instant alerts sent to your command post"
  
  [CTA] "See it live →" — text button, red color, arrow animation on hover

Animation: 
  Left video: slide in from left (translateX -60px → 0, opacity 0 → 1)
  Right text: each element fades up, 0.15s stagger
  Both trigger at 30% scroll threshold
```

### Prompt 4.2 — Vision AI Section
```
Build the Vision AI section.

Component: src/components/sections/VisionAI.tsx

Background: #080808

Layout: Full width section, 140px vertical padding

Header (centered, max-width 700px):
  Label: "PART 2 — PERCEPTION LAYER"
  H2: "Vision AI →"
  Body: "Define anything you want to detect. Our model finds it in real-time 
         using RT-DETR, YOLO, and LLM-based reasoning."

Main visual (full-width, 70vh height):
  - Drone footage video as background
  - Canvas overlay with detection simulation:
    * 3-5 bounding boxes that appear/disappear over 3s cycles
    * Each box: 1px border in #00FF88 or #E8202A (threat vs normal)
    * Label above box: "VEHICLE" / "PERSONNEL" / "ANOMALY DETECTED"
    * Confidence score: "94.2%" in IBM Plex Mono
  - Alert sidebar (right 280px, dark glassmorphism):
    * Header: "LIVE ALERTS" + green pulse dot
    * 3-4 alert cards that queue in from top:
      "⚠ Border intrusion detected — Zone 4B — 14:32:01"
      "✓ Convoy route cleared — 2 vehicles — 14:30:55"
      "⚑ Unusual movement — Personnel count: 7 — 14:29:12"
    * IBM Plex Mono, 11px, color-coded
    * New alerts animate in from top, old ones fade out
  
  - "SIMULATED INTERFACE — Real-time performance varies by deployment" 
    footer text, 10px, #8A8A8A

Below: Three cards (Sensing → Processing → Intelligence)
  Animated connection arrows between them
  Cards: bg #161616, p-6, border-left 3px solid #E8202A (first card)
```

### Prompt 4.3 — Decision OS Section
```
Build the Decision OS section.

Component: src/components/sections/DecisionOS.tsx

Background: #080808

Label: "PART 3 — ACTION LAYER"
H2: "Decision OS →"
Body: "Software that connects sensors, drones, and defense systems into 
       a single AI-driven command network."

Pipeline visualization (scroll-triggered SVG animation):
  Six numbered boxes connected by animated line that draws itself on scroll:
  
  [1 Sensor Fusion] → [2 Entity Analysis] → [3 Persistent Tracking]
  [4 Operational Alert] → [5 Decision & Planning] → [6 Autonomous Action]
  
  - Each box: dark card #161616, border #1F1F1F
  - Number: IBM Plex Mono, red, large (24px)
  - The connecting line draws from left to right as user scrolls
    Use SVG path + dasharray animation driven by ScrollTrigger progress
  - Each box fades in as the line reaches it

Command Center Mockup (below pipeline):
  - Dark dashboard wireframe (use divs + CSS, not an image)
  - Left: "mission map" placeholder (dark rectangle with grid lines + red dot)
  - Right: sidebar with "ALERT FEED" and mock entries
  - Top bar: "PAWAAC DECISION OS | MISSION ACTIVE | 3 UNITS DEPLOYED"
  - This is illustrative — label it "Command Center Interface (Beta)"
  
  Scale animation: enters at scale 0.9, opacity 0 → full on scroll
```

---

## PHASE 5: CREDIBILITY SECTIONS

### Prompt 5.1 — Traction Section
```
Build the traction / social proof section.

Component: src/components/sections/Traction.tsx

Background: #FFFFFF (this is the ONLY light section — contrast moment)
Text colors: #080808 (primary), #6B7280 (secondary)

Top: Four animated stat counters (horizontal row, centered)
  Each: large number + label
  
  "₹21L+"   — "Revenue Generated"    — IBM Plex Mono 72px #080808
  "₹3.5Cr"  — "In Pipeline"          — IBM Plex Mono 72px #080808
  "500+"     — "Missions Completed"   — IBM Plex Mono 72px #080808
  "99.9%"    — "System Uptime"        — IBM Plex Mono 72px #080808
  
  Use react-countup, trigger on scroll entry
  Thin #E8202A underline under each number
  Dividers between: 1px #E5E7EB

Subheading: "DEPLOYED WITH INDIA'S DEFENSE & SECURITY FORCES"
            Inter 12px uppercase #6B7280, centered, margin-top 80px

Mission cards grid (2×3 grid, desktop; 1 column mobile):
  Each card: bg white, border 1px #E5E7EB, rounded-sm, p-6
  
  Left of card: colored status dot + status text
  Right of card: amount in bold
  
  Cards:
  [NCC 7 UP Air]  | ₹1L   | ✓ DELIVERED — green dot
  [ASC Bangalore] | ₹20L  | ✓ DELIVERED — green dot
  [Tawang Unit]   | ₹75L  | ◐ TECH EVAL PASSED — yellow dot
  [Northern Unit] | ₹3.5Cr| ● PO RECEIVED — blue dot
  [KSIE Kerala]   | —     | ◉ MoU SIGNED — purple dot
  [MEG Army]      | —     | ○ DEMO COMPLETE — gray dot

  Cards: slide up stagger on scroll entry

India SVG Map (right-aligned, 50% width):
  Use react-simple-maps with India TopoJSON
  Dark fill for states (#1A1A1A on white section... or place map on dark bg section)
  Glowing red dots at deployment coordinates
  Animated: dots pulse (scale 1 → 1.4 → 1, 2s loop)
  Lines from Bengaluru to each city (animated SVG path)
  
  Deployment coordinates:
    [12.97, 77.59] Bengaluru — HQ
    [26.85, 80.94] Lucknow — NCC 7 UP Air
    [27.59, 91.86] Tawang — Tawang Unit
    [10.85, 76.27] Kerala — KSIE
```

### Prompt 5.2 — Gallery Section
```
Build the deployment gallery section.

Component: src/components/sections/Gallery.tsx

Background: #080808

Header:
  H2: "Gallery"
  Sub: "From research to deployment — in the field."
  
  Filter tabs: [All] [Deployments] [Hardware] [Team]
  Tab style: small buttons, selected = red bg, unselected = transparent + border

Masonry Grid:
  Use CSS columns: 3 columns desktop, 2 tablet, 1 mobile
  Images from /gallery/ directory
  
  Each image:
  - Next/Image with blur placeholder
  - Aspect ratio varies (masonry, not uniform grid)
  - Border: 2px solid transparent
  - Hover: border-color → #E8202A
           scale: 1.02
           Overlay appears: location text (IBM Plex Mono, white, bottom-left)
  
  Click → Lightbox:
    Full screen overlay (#080808 at 0.95 opacity)
    Image centered, max 90vw × 90vh
    Arrow left/right to navigate
    X button top-right to close
    Image info bottom: "Location | Date | Mission Type"
    Keyboard: Escape to close, arrow keys to navigate

Filter animation: Framer Motion AnimatePresence — items fade out/in on filter change
```

---

## PHASE 6: CLOSING SECTIONS

### Prompt 6.1 — Vision Statement Section
```
Build the closing vision section.

Component: src/components/sections/Vision.tsx

Background: Full-screen video (aerial night footage or border landscape)
Overlay: dark gradient (rgba(8,8,8,0.6))
Height: 100vh

Content (centered, max-width 900px):
  
  Eyebrow: IBM Plex Mono 11px #8A8A8A "THE LONG GAME"
  
  H2 (large, centered, white):
  "PAWAAC is to physical security
   what maps are to navigation."
   Syne, 64px desktop / 40px mobile, weight 700
   
  Subtext: Inter 18px #8A8A8A max-width 600px centered
  "PAWAAC aims to become the data layer for physical security —
   embedded into cities, borders, and infrastructure,
   turning observation into continuous security intelligence."
  
  Divider: thin white line, 80px wide, centered, margin 40px
  
  CTA buttons:
    [Request a Demo] — large, red fill, white text, 16px Inter
    [Talk to Investors] — border red, red text
    Gap 16px between buttons

Animation: content fades and scales from 0.95 → 1 on scroll entry
```

### Prompt 6.2 — Demo Request Form
```
Build the demo request section.

Component: src/components/sections/Contact.tsx

Background: #0F0F0F

Layout: Two columns

Left column (40%):
  Label: "GET IN TOUCH"
  H2: "Schedule a live demonstration."
  Body: "See PAWAAC deployed in a mission scenario. Available for 
         defense units, police departments, and government agencies."
  
  Contact info (IBM Plex Mono, 13px, #8A8A8A):
    ✉ kshitij@pawaac.com
    ☎ +91 76739 43461
    ⌖ Jayanagar, Bengaluru 560011

Right column (60%): Form
  Fields (all: dark bg #161616, border #1F1F1F, text #F0EDE8, rounded-sm):
    Name*: text input
    Organization*: text input
    Role: text input (Commander / Security Head / etc)
    Email*: email input
    Phone: tel input
    Message: textarea 4 rows, "Tell us about your use case"
    
  Submit button: full-width, bg #E8202A, "Request Live Demo →"
                 Loading state: spinner + "Submitting..."
                 Success state: green checkmark + "Request received. We'll contact you within 24 hours."
  
  Use React Hook Form + Zod validation
  Backend: Next.js API route /api/contact → Resend for email
  
  On submit: send email to kshitij@pawaac.com with form data
```

---

## KIRO TIPS FOR THIS PROJECT

### When Kiro generates wrong aesthetics:
```
"Make it darker and more minimal. Remove any gradients. 
The aesthetic should be Anduril.com — military precision, 
near-black backgrounds, surgical typography. Less is more."
```

### When Three.js isn't loading:
```
"The GLB file is at /public/models/drone.glb.
Add error boundary around the Canvas.
Show a static PNG fallback if WebGL is not supported.
Console.log the GLTF result to check if model loaded."
```

### For scroll animation issues:
```
"Use GSAP ScrollTrigger with markers: true for debugging.
Ensure Lenis scroll is synced with GSAP via:
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)"
```

### For mobile:
```
"Add a useMediaQuery hook that detects < 768px.
On mobile:
- Replace Three.js canvas with static drone PNG
- Reduce animation complexity (no parallax)
- All sections stack vertically
- Reduce font sizes by ~30%
- Video stays but with lower resolution"
```

### Performance prompt:
```
"Run a performance audit. 
- Verify all images use Next/Image with sizes prop
- All heavy components (Three.js, GSAP) use dynamic import
- Videos have poster prop set
- Add loading="lazy" to below-fold images
- Verify Lenis is being destroyed on component unmount"
```

---

*Total estimated build time with Kiro Pro+: 10-14 days of active sessions*
*Result: A website that makes Skydio, IdeaForge, and Garuda look like brochures.*
