# PAWAAC site - media assets to add

All static assets live in the `public/` folder. A path like `public/videos/hero_web.mp4`
is served at the URL `/videos/hero_web.mp4`. The code already points at these paths and
falls back gracefully when a file is missing, so the build never breaks if something is not
ready yet. Drop the file in with the exact name and it appears automatically.

Animations (preloader, headline reveals, detection boxes, counters, the 3D drone, HUD
telemetry) are all generated in code. You do NOT supply those. You only supply the
footage, posters, and photos listed below.

---

## Where everything goes (folder map)

Create these folders inside `public/` if they do not exist, then drop files in:

```
public/
  videos/        <- all video loops + their .jpg posters (hero, vision, route demo)
  images/
    gallery/     <- gallery photos (.jpg)
    drone-still.png   <- mobile drone image
src/
  app/
    apple-icon.png    <- iPhone/iPad home-screen icon
```

Photos = `public/images/...`  ·  Videos = `public/videos/...`  ·  Icon = `src/app/`.

---

## 1. Required video (the site looks unfinished without these)

These are pure drop-ins. No code change needed. Supply BOTH `.webm` and `.mp4` (browser
picks the first it supports) plus the `.jpg` poster (shown while the video loads / if it
cannot play).

### Hero background loop
Full-bleed loop behind the headline. Muted, autoplay, seamless loop.
- `public/videos/hero_web.webm`
- `public/videos/hero_web.mp4`
- `public/videos/hero_poster.jpg`

Content: a single cinematic drone shot. Best options, in order:
1. Slow aerial push over terrain/border/coastline at dusk (your drone POV).
2. The e-VTOL lifting off / hovering, camera orbiting slowly.
3. Drone silhouette against sky with slow parallax clouds.
Specs: 1920x1080 (or 2560x1440), 8-12 s seamless loop, no on-screen text, no audio,
keep motion slow (it sits under text). Target file size: webm under 4 MB, mp4 under 6 MB.

### Vision statement backdrop
Background for the closing "vision" section. Muted, autoplay, loop, sits under a dark scrim.
- `public/videos/vision.webm`
- `public/videos/vision.mp4`
- `public/videos/vision_poster.jpg`

Content: more emotional / wide. A sweeping landscape from altitude, a sunrise patrol, or
abstract slow aerial movement. Same encoding specs as the hero loop.

---

## 2. Recommended (small code change to wire, ask me to hook these up)

### Operations / route demo clip (Simplicity section)
Right now this shows a coded "draw-a-route" map animation. If you have a real screen
recording of your app (drawing a patrol route, hitting Go, drone flying it), it would land
much harder. If you get one, add:
- `public/videos/route_demo.webm`
- `public/videos/route_demo.mp4`
Content: 6-15 s screen capture of the operator UI. 16:9. Tell me and I will swap the
placeholder for the video.

### Gallery photos
The gallery currently uses styled color placeholders with captions. Put real photos in
`public/images/gallery/`. There are 8 slots; name them exactly like this so I can map each
photo to the right card (1600 px on the long edge, under 400 KB each, .jpg):

```
public/images/gallery/
  deploy-01.jpg     (slot 1  - field test)
  hardware-01.jpg   (slot 2  - airframe)
  team-01.jpg       (slot 3  - field operations)
  deploy-02.jpg     (slot 4  - night patrol)
  hardware-02.jpg   (slot 5  - docking station)
  deploy-03.jpg     (slot 6  - aerial survey)
  team-02.jpg       (slot 7  - command post)
  hardware-03.jpg   (slot 8  - gimbal camera)
```

Drop in as many as you have (missing ones keep the placeholder). Then tell me and I will
point each card at its image. NOTE: the current captions contain placeholder location/unit
names (Tawang, Kerala, Northern Unit, etc.). Per your rule about not naming locations or
units, send me the captions you actually want, or I will make them generic ("Border Field
Test", "Hardware Bay") when wiring the photos.

---

## 3. Optional polish

### Mobile drone still
On phones the 3D model is replaced by a simple placeholder (the GLB is too heavy for mobile).
A transparent PNG of the drone would look far better there:
- `public/images/drone-still.png`
Content: the drone on transparent background, white/bone body, ~1200x800. Ask me to wire it.

### Apple touch icon (home-screen icon on iPhone/iPad)
Pure drop-in, Next.js picks it up automatically:
- `src/app/apple-icon.png`
Content: 180x180 PNG, the off-white circle + dark wave mark (same as the favicon).

---

## Already handled - do NOT supply
- 3D drone model: `public/models/drone.glb` is in place (compressed to ~1.5 MB).
- Favicon: generated from `src/app/icon.svg`.
- All motion, the preloader, HUD readouts, counters, detection-box overlays: coded.

---

## Encoding cheatsheet (optional, needs ffmpeg)
Make a web-ready, muted, looping clip from a source video:

```bash
# mp4 (H.264)
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart hero_web.mp4

# webm (VP9, smaller)
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 hero_web.webm

# poster frame at 1 second
ffmpeg -i source.mov -ss 00:00:01 -frames:v 1 -q:v 3 hero_poster.jpg
```
Aim: hero/vision clips a few MB each so the page stays fast.
