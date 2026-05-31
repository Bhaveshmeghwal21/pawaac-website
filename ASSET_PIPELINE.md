# PAWAAC — ASSET PIPELINE
### How to prepare every visual asset for the website
> Do this BEFORE starting Kiro development — website is only as good as its assets.

---

## PRIORITY ORDER

```
1. Drone 3D Model (GLB export)          — Needed for Section 3
2. Hero flight video (compressed)       — Needed for Section 1 (Day 1)
3. Docking animation video              — Needed for Section 8
4. Deployment photos (optimized)        — Needed for Section 9
5. Vision AI demo recording             — Needed for Section 5
```

---

## ASSET 1: DRONE 3D MODEL (.blend → .glb)

### Why GLB?
React Three Fiber (Three.js) natively loads `.glb` (binary GLTF). It's the web standard for 3D. Your `.blend` file needs to be exported and compressed.

### Step-by-Step Blender Export

**Step 1: Clean the model**
```
In Blender:
□ Remove all unnecessary objects (lights, cameras, environment)
□ Apply all modifiers (Ctrl+A → Apply All Modifiers in 3.x)
□ Merge meshes where possible (reduces draw calls)
□ Check polygon count — target < 50,000 polygons for web
  If higher: Edit Mode → Decimate modifier → Factor 0.3-0.5
□ UV unwrap is done (needed for textures to appear)
```

**Step 2: Material check**
```
□ Use only PBR materials (Principled BSDF shader)
□ Metallic: 0.8-1.0 for drone body (military matte)
□ Roughness: 0.4-0.6 (semi-matte military finish)
□ Base Color: Dark charcoal (#1A1A1A to #2A2A2A)
□ NO emission materials except for any indicator lights
□ Bake textures if using complex node setups
```

**Step 3: Export settings**
```
File → Export → glTF 2.0 (.glb/.gltf)

Settings:
  Format: GLB (Binary) — single file, easier to load
  
  Include:
    ✓ Selected Objects (or All if cleaned)
    ✓ Custom Properties
  
  Transform:
    ✓ +Y Up (web standard)
    
  Mesh:
    ✓ Apply Modifiers
    ✓ UVs
    ✓ Normals
    ✓ Tangents (for normal maps)
    
  Material:
    ✓ Export Materials
    
  Animation: OFF (unless you have rigged animation)
  
  Output file: pawaac_drone_v1.glb
```

**Step 4: Compress with Draco**
```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress with Draco
gltf-pipeline -i pawaac_drone_v1.glb -o pawaac_drone_compressed.glb --draco.compressionLevel 7

# Target output size: < 2MB (ideally < 1MB)
# Check with: ls -lh pawaac_drone_compressed.glb
```

**Step 5: Validate in browser**
```
Go to: https://gltf.report/
Upload pawaac_drone_compressed.glb
Check:
  - Renders correctly
  - Materials look right
  - No missing textures
  - Polygon count shown
```

### Loading in React Three Fiber
```jsx
// After export, place in: /public/models/drone.glb

import { useGLTF } from '@react-three/drei'

function DroneModel() {
  const { scene } = useGLTF('/models/drone.glb')
  return <primitive object={scene} />
}

// Preload for faster display
useGLTF.preload('/models/drone.glb')
```

---

## ASSET 2: DOCKING SYSTEM ANIMATION

This is a **huge visual win** — a 3D render of the drone autonomously docking looks premium and explains the product instantly.

### Option A: Blender Render (Recommended — ~2-3 hours of work)

**Sequence to animate (10-15 seconds total):**
```
0:00 - 0:03  Drone approaches from above (bird's eye view)
0:03 - 0:06  Drone descends toward dock (side view)
0:06 - 0:09  Drone lands and locks into dock (close-up)
0:09 - 0:12  Dock cover closes (or charging indicator appears)
0:12 - 0:15  "CHARGING — NEXT MISSION IN 45 MIN" text overlay fades in
```

**Blender render settings for web video:**
```
Output:
  Resolution: 1920×1080 (or 1280×720 for faster render)
  FPS: 24 (cinematic)
  Format: FFmpeg Video → H.264 → MP4

Lighting for cinematic look:
  Key light: Area light, warm white, 45° from front-left
  Rim light: Blue-tinted light from behind (separates from dark bg)
  Fill: Very subtle, ratio 4:1 key to fill
  Background: Pure black (#000000) — blends with website bg
  
Render engine:
  Use CYCLES (not EEVEE) for quality
  Samples: 128 (good quality/speed balance)
  Denoising: ON (Intel Open Image Denoise)
  
Estimated render time: 2-4 hours on mid-range GPU for 360 frames
```

**Post-processing in DaVinci Resolve (free):**
```
□ Add subtle color grade: crush shadows, slight blue-teal in mids
□ Add film grain (DaVinci built-in: 0.1-0.15 intensity)
□ Export: H.264, CRF 18, MP4
□ Create WebM version too (better browser support):
  ffmpeg -i docking.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 docking.webm
```

### Option B: Export Dock as GLB + Animate in Three.js
```
If you don't want to render video:
Export docking station as separate GLB
Animate in Three.js with GSAP timeline
Drone descends via GSAP animation on scroll
```
Option A looks much better. Go with A if you have GPU time.

---

## ASSET 3: HERO VIDEO PREPARATION

### Selection Criteria
```
Pick footage that shows:
  Priority 1: Drone in flight against open sky (most impressive)
  Priority 2: Drone's camera POV — aerial shots of terrain/city
  Priority 3: Drone launching from dock
  Priority 4: Night flying (if available — very cinematic)

Avoid:
  - Shaky handheld footage
  - Indoor close-ups (save for gallery)
  - Anything with visible classified locations
```

### Processing Pipeline
```bash
# Trim to best 30-60 seconds
# Use DaVinci Resolve or even Adobe Premiere / CapCut

# Color grade: 
#   Shadows: crushed to near-black
#   Highlights: slightly desaturated  
#   Add very subtle blue-teal grade (cinematic military look)
#   Vignette: subtle darkening at edges

# Export for web (ffmpeg):
ffmpeg -i hero_raw.mp4 \
  -vf "scale=1920:1080" \
  -c:v libx264 \
  -crf 23 \           # Quality (18=high, 28=low, 23=balanced)
  -preset slow \      # Better compression
  -an \               # No audio (autoplay requires muted)
  -movflags faststart \ # Allows streaming before full download
  hero_web.mp4

# Also create WebM:
ffmpeg -i hero_web.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an hero_web.webm

# Create poster (first frame as image):
ffmpeg -i hero_web.mp4 -vframes 1 -q:v 2 hero_poster.jpg

# Target sizes:
#   hero_web.mp4:  < 15MB (people have slow connections)
#   hero_web.webm: < 12MB
#   hero_poster.jpg: < 200KB
```

### Implementation in Next.js
```html
<video 
  autoPlay 
  muted 
  loop 
  playsInline
  poster="/videos/hero_poster.jpg"
>
  <source src="/videos/hero_web.webm" type="video/webm" />
  <source src="/videos/hero_web.mp4" type="video/mp4" />
</video>
```

---

## ASSET 4: DEPLOYMENT PHOTOS

### Optimization Pipeline
```bash
# Install sharp CLI
npm install -g sharp-cli

# Batch convert all JPGs to WebP + resize
for f in *.jpg; do
  sharp -i "$f" -o "${f%.jpg}.webp" resize 1200 800
done

# For gallery thumbnails (masonry grid):
for f in *.jpg; do
  sharp -i "$f" -o "thumb_${f%.jpg}.webp" resize 600 400
done
```

### Organization
```
/public/gallery/
  /full/          → Full resolution WebP (max 1200px wide)
  /thumbs/        → Thumbnails (600px wide)
  /deployments/   → Mission-specific photos
  /hardware/      → Drone + dock photos
  /team/          → Team photos
```

### Photo shoot checklist (if you need more shots)
```
Must have:
□ Drone on ground (clean, well-lit, different angles)
□ Drone in flight (blue sky + drone silhouette = money shot)
□ Drone camera POV aerial (dramatic landscape)
□ Dock with drone docked (shows the full system)
□ "Operator" looking at tablet (shows ease of use)
□ Team photo (for About page)

Nice to have:
□ Night flight footage (even just the drone lights visible)
□ Thermal camera view screenshot
□ Vision AI detection screenshot (blur any classified areas)
□ Map with route drawn (shows the "draw and go" UX)
```

---

## ASSET 5: VISION AI DEMO RECORDING

### What to Record
```
Do a 30-60 second screen recording of:
1. The Vision AI dashboard (pawaac.com/vision or wherever it runs)
2. Live feed with detection boxes
3. An alert appearing in real-time
4. The alert details panel

Tools: OBS Studio (free) or QuickTime (Mac)
Resolution: 1920×1080
FPS: 30
Format: MP4, compressed same as hero video
```

### If You Don't Have Real Footage Yet
```
Build a "demo simulation" component in React (see WEBSITE_PLAN.md Section 5)
Use Canvas API to overlay fake bounding boxes on drone footage
Add typewriter-effect labels
This is actually fine — just label it "simulated interface"
```

---

## ASSET 6: INDIA DEPLOYMENT MAP (SVG)

### Free Options
```
1. React Simple Maps: https://www.react-simple-maps.io/
   - Use India map TopoJSON
   - Mark dots at deployment cities
   - Animate with Framer Motion

2. Custom SVG:
   - Download India SVG map from: https://mapsvg.com/maps/india
   - Import into Figma
   - Add glow dots manually
   - Export as optimized SVG

Deployment city coordinates (approximate):
  Bengaluru:  [12.9716, 77.5946]  — HQ
  Bangalore:  [12.9716, 77.5946]  — ASC
  Lucknow:    [26.8467, 80.9462]  — NCC 7 UP Air
  Tawang:     [27.5857, 91.8594]  — Tawang Unit (border, arunachal)
  North India: generalized coords  — Northern Unit
  Kerala:     [10.8505, 76.2711]  — KSIE Kerala
```

---

## LOGO REQUIREMENTS

### What You Need
```
Current logo: The "wave/infinity" symbol + "Pawaac Drones" text

Required formats:
□ logo.svg             — Vector, for website (scales to any size)
□ logo-white.svg       — White version (for dark backgrounds)
□ logo-icon.svg        — Icon only (for favicon, small spaces)
□ favicon.ico          — 32×32px for browser tab
□ apple-touch-icon.png — 180×180px for iOS

If you only have PNG:
  Use: https://vectorizer.ai/ or Adobe Illustrator auto-trace
  Then export SVG from there
```

---

## QUICK REFERENCE: WHAT TO DO THIS WEEK

| Day | Asset Task |
|-----|-----------|
| Today | Export drone .blend → .glb, validate on gltf.report |
| Today | Select and trim hero video (30-60s) |
| Tomorrow | Run ffmpeg compression on hero video |
| Tomorrow | Draco compress the GLB |
| Day 3 | Start Blender docking animation setup |
| Day 4 | Render docking animation (overnight render) |
| Day 5 | Batch process all gallery photos to WebP |
| Day 6 | Record/prepare Vision AI demo |
| Day 7 | All assets in /public folder, ready for Kiro |

---

*With all assets ready, Kiro can build at full speed without waiting on you.*
