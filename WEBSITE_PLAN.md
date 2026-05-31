# PAWAAC DRONES — NEXT-LEVEL WEBSITE PLAN
### "The Anduril of India" — Design & Engineering Blueprint
> Version 1.0 | May 2026 | For use with Kiro Pro+ (claude-opus-4-20250514)

---

## 0. NORTH STAR

The benchmark is **[anduril.com](https://anduril.com)** — the highest-tier defense-tech website on the internet. PAWAAC should feel like that, but **Indian, grittier, and more cinematic**. A visitor should feel like they're looking at a classified system being declassified for them.

**One-sentence brief:** A dark, cinematic, scroll-driven experience where the drone feels alive — it flies through the page, analyzes the world, and leaves you with zero doubt this is the future of security.

---

## 1. DESIGN PHILOSOPHY

### Aesthetic Direction: **"CLASSIFIED INTELLIGENCE"**
Think: Military ops room meets Silicon Valley precision. Not a drone company website — a **security intelligence platform** website.

| Dimension | Decision |
|-----------|----------|
| **Theme** | Near-black + off-white + blood red (from pitch deck) |
| **Typography** | Display: `Syne` or `Space Grotesk`... No wait — `DM Serif Display` for hero + `IBM Plex Mono` for data/tech + `Inter` for body. Actually: **`Neue Haas Grotesk`** (or `Aktiv Grotesk` fallback) — military precision |
| **Motion** | Scroll-driven cinematic — GSAP ScrollTrigger + Lenis smooth scroll |
| **3D** | React Three Fiber — interactive drone from your .blend file |
| **Feel** | Anduril.com × Linear.app × Apple product page |
| **Grain** | Subtle film grain overlay on dark sections (CSS noise) |
| **Cursor** | Custom cursor: crosshair with radar sweep on hover |

### Color System
```css
--bg-primary:    #080808;   /* Near-black — main background */
--bg-secondary:  #0F0F0F;   /* Card backgrounds */
--bg-surface:    #161616;   /* Elevated surfaces */
--accent-red:    #E8202A;   /* PAWAAC red — sparingly, high impact */
--accent-green:  #00FF88;   /* Status/live indicators */
--text-primary:  #F0EDE8;   /* Off-white, not pure white */
--text-secondary:#8A8A8A;   /* Labels, captions */
--border:        #1F1F1F;   /* Subtle dividers */
--data-blue:     #3B82F6;   /* Vision AI / detection boxes */
```

### Typography Scale
```
Hero:          Syne 96px / weight 700 — "Aerial security layer"
Section Title: Syne 64px / weight 600
Body:          Inter 16px / weight 400 / line-height 1.7
Data/Mono:     IBM Plex Mono 14px — for metrics, coordinates, specs
Labels:        Inter 11px / weight 500 / UPPERCASE / letter-spacing 0.15em
```

---

## 2. TECH STACK

```
Framework:       Next.js 15 (App Router + Turbopack)
Language:        TypeScript
Styling:         Tailwind CSS v4 + CSS Variables
3D Engine:       React Three Fiber (@react-three/fiber) + Drei + Postprocessing
Animation:       GSAP 3.12 + ScrollTrigger + Framer Motion 11
Smooth Scroll:   Lenis (v2)
Video:           Next/video or native HTML5 with IntersectionObserver lazy-load
Forms:           React Hook Form + Zod
Email:           Resend (for demo requests)
Analytics:       PostHog (self-hostable, privacy-friendly)
Deployment:      Vercel (Edge Runtime for speed)
CMS (optional):  Sanity.io — for gallery/news updates without code changes
```

### Why These Choices
- **React Three Fiber** — loads your .GLB drone model natively, handles WebGL, much easier than raw Three.js
- **GSAP ScrollTrigger** — industry standard for scroll-based animations (used by Apple, Netflix)
- **Lenis** — buttery smooth scroll that makes everything feel premium
- **Next.js 15** — SEO critical for defense procurement discovery, ISR for performance

---

## 3. SITE ARCHITECTURE

```
/                    → Homepage (the full cinematic experience)
/product             → Drone specs deep-dive (interactive 3D)
/vision-ai           → Vision AI platform page  
/decision-os         → Decision OS / Command Center
/deployments         → Gallery of real missions (gated or open)
/about               → Team + mission
/contact             → Demo request form
```

**Mobile Strategy:** Full experience on mobile but with pre-rendered video instead of 3D model (Three.js is too heavy for mobile). Detect with `useMediaQuery` and swap components.

---

## 4. HOMEPAGE — SECTION BY SECTION

### SECTION 0: PRE-LOADER (2 seconds)
```
- Pure black screen
- PAWAAC logo draws itself via SVG stroke animation
- Progress bar fills (simulated, not real — creates anticipation)
- Fade out, hero fades in
- Can play a single "system initializing" audio beat (optional, user consent)
```
**Implementation:** Framer Motion AnimatePresence + SVG stroke dasharray animation

---

### SECTION 1: HERO — "THE LAUNCH"
```
Layout: Full viewport (100vh)
Background: Your actual drone flight footage — full bleed, no borders
            Muted, autoplay, looping
            Slight dark vignette overlay (gradient from edges)

Content (bottom-left 40% of screen):
  [LABEL]  PAWAAC DRONES — EST. 2025, BENGALURU
  [H1]     "Aerial security layer
            for the physical world."
  [BODY]   Level-5 autonomous drones. No pilots. 24×7 surveillance.
  [BUTTONS] [Schedule Demo →]   [Watch System in Action ▶]

Right side: Floating HUD card (glassmorphism, dark)
  • LIVE FEED: ACTIVE
  • Altitude: 120m AGL  
  • Speed: 72 km/h
  • AI Status: MONITORING
  (All animated with random-ish number flickers — fake but convincing)

Bottom of screen: Scroll indicator with animated arrow
```

**Drone footage tip:** Cut your video to start with drone ascending — creates the "launch" moment the visitor experiences as the page loads.

---

### SECTION 2: THE PROBLEM — "INDIA IS EXPOSED"
```
Layout: Dark gray background (#0F0F0F), full-width
        Scroll-pinned for ~300px of scroll depth

Animation sequence (triggered by scroll):
  1. Counter animates up: "₹120B spent on physical security worldwide"
  2. Red text fades in: "...and security is still reactive."
  3. Four stats cards slide in from bottom:
     [6.25M Cases]  [22,623 Km Border]  [<30% CCTV]  [~$17B Trade Loss]
  4. Background: faint India map outline, glowing red dots on vulnerable zones

Typography: Large, editorial — stat numbers in 80px IBM Plex Mono
```

**Visual ref:** How The New York Times does data journalism — let the numbers hit.

---

### SECTION 3: THE REVEAL — "MEET THE SYSTEM"
```
Layout: Full-screen black, drone enters from top-right flying in

Three.js 3D Scene:
  - Your drone model (.GLB) floats in the center
  - Slow rotation on Y-axis (10 RPM)
  - Ambient occlusion + rim light (gives the military-glossy look)
  - Mouse parallax: slight tilt follows cursor position
  - Scroll: drone slowly descends into "docked" position

Text appears around drone with connecting lines (HUD-style):
  [Left]   "2 Hour Endurance" → arrow pointing to battery area
  [Top]    "30× Optical Zoom" → arrow pointing to camera
  [Right]  "72 km/h Cruise"   → arrow pointing to wings
  [Bottom] "GPS-Denied Nav"   → arrow pointing to sensors
  [Center] "Level-5 Autonomy" — glowing in PAWAAC red

Below drone: three column breakdown
  [AUTONOMOUS PATROL]  [VISION AI]  [DECISION OS]
  Each with icon + 1-line description
```

**Asset needed:** Export your .blend as GLB (see ASSET_PIPELINE.md)

---

### SECTION 4: THE PITCH — "NO PILOT NEEDED"
```
Layout: Split screen — left video, right text
Left: Your flight video showing draw-path UI (the "draw a route" feature)
Right:
  [LABEL] REVOLUTIONARY SIMPLICITY
  [H2]    "If you know how to use a phone,
           you can deploy PAWAAC."
  
  Steps animate in on scroll:
  1. Draw your patrol route
  2. Drone flies itself
  3. AI watches everything
  4. Alerts sent to your phone
  
  [CTA] → "See it live"
```

---

### SECTION 5: VISION AI — "THE MACHINE SEES"
```
Layout: Dark section, full-width
Background: Real drone footage WITH bounding boxes from your Vision AI output

Left panel (40%):
  [LABEL] VISION AI — PERCEPTION LAYER
  [H2]    "Current vision AI that detects
           anything you define."
  [BODY]  RT-DETR, YOLO, LLM pipeline.
           Custom anomaly definition.
           Real-time edge inference.

Right panel (60%): INTERACTIVE DEMO WIDGET
  Shows a dark "live feed" frame
  Objects get detected with animated bounding boxes:
    • "VEHICLE DETECTED — Zone B4"
    • "PERSONNEL COUNT: 7"
    • "UNUSUAL MOVEMENT PATTERN"
  Detection boxes flash in and out (CSS animation)
  Timeline at bottom shows alert feed
  
  [SMALL TEXT] Simulated interface — actual system performance may vary

Below: Three cards
  [SENSING] → [PROCESSING] → [INTELLIGENCE]
  With flow arrows between them
```

---

### SECTION 6: DECISION OS — "COMMAND CENTER"
```
Layout: Black background — dark dashboard aesthetic

[LABEL] DECISION OS — THE BRAIN
[H2]    "Software that turns surveillance
         into decisions."

Center: Animated command center mockup
  - Map of an area with moving drone icon
  - Sidebar showing alert feed
  - Top bar with mission status
  - Threat indicators
  (All CSS/canvas — not real data, but looks real)

Six-step pipeline cards animate in sequence:
  1. Sensor Fusion → 2. Entity Analysis → 3. Persistent Tracking
  4. Operational Alert → 5. Decision & Planning → 6. Autonomous Action
  
  Connected by animated line that draws as you scroll
```

---

### SECTION 7: TRACTION — "BATTLE-TESTED"
```
Layout: White section (contrast break — the only light section)
Purpose: Investors and buyers need to see proof. This is the credibility section.

Top: Animated counters (count up when scrolled into view)
  [₹21L+]    [500+ Missions]   [99.9% Uptime]   [<10 Min Deploy]

Below: Mission cards grid
  Each card = a real deployment
  
  [NCC 7 UP Air] — ₹1L — DELIVERED ✓
  [ASC Bangalore] — ₹20L — DELIVERED ✓  
  [Tawang Unit] — ₹75L — TECH EVAL PASSED
  [Northern Unit] — ₹3.5 Cr — PO RECEIVED
  [KSIE Kerala] — MoU SIGNED
  [MEG Army] — DEMO COMPLETE
  
  Status badges with color: Green = Delivered, Yellow = Pipeline

India Map (SVG):
  Glowing dots on deployment locations
  Lines connecting HQ (Bengaluru) to each location
  Animated on scroll entry
```

**Note:** Blur or omit specific unit names if operationally sensitive.

---

### SECTION 8: DOCKING SYSTEM — "ALWAYS ON"
```
Layout: Dark, video-heavy section

[H2] "Always mission-ready."
[BODY] 24/7 automated charging. Weather-proof housing.
        Deploy in under 10 minutes.

Background: Your 3D Blender render of the docking system
  Options:
  A) Render a 10-second video of drone docking → use as video bg
  B) Export docking station as separate GLB → show in Three.js scene
  
  Recommended: Render a short video (A) — more impressive, lighter

Stats row:
  [Auto-Charging]  [IP65 Weather-Proof]  [24/7 Ready]  [<10 Min Deploy]
  Each with icon + description
```

---

### SECTION 9: GALLERY — "SEE IT IN THE FIELD"
```
Layout: Full-bleed masonry grid (like Dribbble but dark)

Images you have:
  - Deployment photos
  - Flight photos  
  - Team photos
  - Drone on ground
  - Command center setups

Hover effect: Image zooms slightly, overlay shows:
  "Location: Bengaluru Field Test | May 2025"
  Subtle red border appears

Lightbox: Click → full screen with arrow navigation

Filter tabs: [All] [Deployments] [Hardware] [Team]
```

---

### SECTION 10: BUSINESS MODEL — "HOW WE WORK WITH YOU"
```
Layout: Dark, three-tier pricing table

[H2] "Start with hardware. Scale with AI."

Phase 1: Hardware
  ₹5L – ₹25L (one-time)
  Autonomous e-VTOL / Quadcopter + Dock + Camera + GCS

Phase 2: Vision AI
  ₹8K – ₹25K/month
  Custom alerts + object tracking + activity recognition
  
Phase 3: Decision OS
  Enterprise pricing
  Command center + data analysis + decision support

[CTA] "Talk to our team →"
```

---

### SECTION 11: THE VISION — "WHERE WE'RE GOING"
```
Layout: Full-screen, cinematic
Background: Dramatic aerial drone footage — city at night or border landscape

Text (centered, large):
  "PAWAAC is to physical security
   what maps are to navigation."
   
[Subtext] The data layer for physical security.
           Embedded into cities, borders, and infrastructure.
           
[Small] Turning observation into continuous security intelligence.

[CTA buttons]
  [Request a Demo]  [Talk to an Investor]
```

---

### SECTION 12: FOOTER
```
Left:  PAWAAC logo + "Pilotless Airborne Warning and Aerial Control"
Center: Nav links (Product / Deployments / About / Contact)
Right: 
  kshitij@pawaac.com
  +91 76739 43461
  15, 9th Main Rd, Jayanagar 3rd Block, Bengaluru — 560011

Bottom bar: © 2026 Pawaac Drones Pvt Ltd | Privacy | Terms
            [DGCA Compliant] [MeitY Recognized] (badges if applicable)
```

---

## 5. PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse Score | > 85 |
| 3D model load | < 3s (with Draco compression) |
| Video first frame | < 1s (poster image until load) |

### Perf Strategies
- All videos: lazy load with IntersectionObserver, poster frame shown first
- 3D model: Draco compressed GLB, LOD (level of detail) for mobile
- Images: Next/Image with WebP, blur placeholder
- Fonts: `display: swap`, preload critical fonts
- Route: Dynamic imports for Three.js (only loads on section enter)
- Hero video: Preload first few seconds only

---

## 6. KEY INTERACTIONS TO BUILD

### A. Custom Cursor
```jsx
// Crosshair cursor on dark sections
// Transforms to circle on interactive elements  
// Red "LOCKED" state when hovering on CTAs
// Radar sweep animation on hover over drone
```

### B. Parallax Flight Trail
```jsx
// As user scrolls down the hero, a drone silhouette
// moves across the screen leaving a subtle trail
// Tied to scroll position via GSAP
```

### C. Number Ticker
```jsx
// All stats count up when scrolled into view
// Use: react-countup or custom requestAnimationFrame
// IBM Plex Mono font for mechanical feel
```

### D. Mission Status Live Ticker
```jsx
// Top bar (optional): "PAWAAC SYSTEM STATUS — ALL UNITS OPERATIONAL"
// Scrolls horizontally like a news ticker
// Green dot pulses
```

### E. Detection Simulation
```jsx
// Vision AI section: canvas overlay on video
// Random bounding boxes appear with labels
// Fade in/out with CSS keyframes
// Makes Vision AI tangible without showing real classified footage
```

---

## 7. KIRO WORKFLOW — HOW TO BUILD THIS

### Setup Prompt for Kiro
```
You are building a production-grade Next.js 15 website for PAWAAC Drones,
an Indian autonomous surveillance drone company. The design aesthetic is 
dark military-intelligence — think Anduril.com meets Apple product page.
Stack: Next.js 15, TypeScript, Tailwind CSS v4, React Three Fiber, 
GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll.
Always write production-quality, TypeScript-safe code.
Color palette: bg #080808, accent red #E8202A, text #F0EDE8.
Font: Syne (display) + Inter (body) + IBM Plex Mono (data).
```

### Build Order (do NOT skip steps)
```
Phase 1 — Foundation (Day 1-2)
  □ next.js project init with TypeScript + Tailwind v4
  □ Global CSS variables + font setup
  □ Lenis smooth scroll wrapper
  □ Custom cursor component
  □ Pre-loader component
  □ Navigation (fixed, transparent → opaque on scroll)
  
Phase 2 — Hero + Problem (Day 3)
  □ Hero section with video background
  □ HUD overlay component (floating data card)
  □ Problem section with animated counters
  □ India stats cards
  
Phase 3 — 3D Drone (Day 4-5)
  □ Three.js scene setup (React Three Fiber)
  □ Load GLB drone model
  □ Hotspot annotations
  □ Mouse parallax
  □ Scroll-linked position animation
  
Phase 4 — Feature Sections (Day 6-8)
  □ "No Pilot Needed" split section
  □ Vision AI section with detection sim
  □ Decision OS dashboard mockup
  □ Docking system section
  
Phase 5 — Credibility (Day 9-10)
  □ Traction section with counters
  □ Mission cards grid
  □ India deployment map (SVG)
  □ Gallery masonry grid + lightbox
  
Phase 6 — Bottom + Polish (Day 11-12)
  □ Business model section
  □ Vision statement section
  □ Footer
  □ Demo request form (React Hook Form + Resend)
  □ Mobile responsiveness pass
  □ Performance audit + optimization
  
Phase 7 — Deploy (Day 13)
  □ Vercel deployment
  □ Domain setup (pawaac.com)
  □ Analytics (PostHog)
  □ Meta tags + OG image
```

### Per-Section Kiro Prompt Template
```
Build the [SECTION NAME] section for PAWAAC website.
Requirements:
- [list from this plan]
GSAP animations: [describe what animates]
Mobile: [how it adapts]
Component file: src/components/sections/[SectionName].tsx
```

---

## 8. SEO & META STRATEGY

```html
Title: "PAWAAC Drones — Autonomous Aerial Surveillance for India"
Description: "Level-5 autonomous drones for defense and police. 
              24×7 surveillance without pilots. Deployed with Indian Army & Police."

OG Image: A dramatic shot of drone in flight + "PAWAAC" text
          Size: 1200×630px — render from Blender or take from footage

Keywords (implicit in content):
  autonomous drone India, surveillance drone defense, 
  unmanned aerial vehicle police, AI surveillance India,
  Level 5 drone autonomy, border surveillance drone
```

---

## 9. CONTENT YOU NEED TO PREPARE

### From Existing Assets
- [ ] Export drone .blend to GLB (see ASSET_PIPELINE.md)
- [ ] Select 3 best flight video clips (10-30 seconds each)
- [ ] Select 15-20 deployment photos for gallery
- [ ] Render docking station animation from Blender (see ASSET_PIPELINE.md)
- [ ] Get team headshots (3-4 founders/key members)

### New Content to Create
- [ ] Write short bio for Kshitij (and co-founders if applicable)
- [ ] Decision: which customer names to show publicly vs keep hidden
- [ ] One paragraph: "Why we started PAWAAC" (origin story for About page)
- [ ] Logo in SVG format (vector, not PNG)

### Optional But High-Impact
- [ ] 30-second "system demo" screen recording of Vision AI UI
- [ ] Aerial B-roll: city overheads, border fence, highways (from your footage)
- [ ] One testimonial quote from a customer contact (even anonymous with role title)

---

## 10. RISK FLAGS

| Risk | Mitigation |
|------|-----------|
| Operational security — showing deployment locations | Use city names only, not unit coordinates |
| 3D model too heavy → slow load | Draco compress + LOD + lazy load |
| Video autoplay blocked by browser | Always include poster image fallback |
| DGCA/regulatory mention | Add "DGCA compliant operations" badge, add note on regulated use |
| Three.js crash on older mobile | Detect and render static drone image fallback |
| Defence customer logos without permission | Use text only ("Indian Army Unit") not logos |

---

## APPENDIX: REFERENCE WEBSITES

| Site | What to steal |
|------|--------------|
| anduril.com | Overall dark aesthetic, product reveal, scroll pacing |
| linear.app | Smooth scroll feel, clean typography, feature sections |
| apple.com/macbook-pro | 3D product scroll interaction |
| palantir.com | Data intelligence aesthetic, command center feel |
| boston-dynamics.com | Robot product photography approach |
| vercel.com | Performance messaging, dark + clean |

---

*Next: See ASSET_PIPELINE.md for how to prepare your .blend file, videos, and photos.*
