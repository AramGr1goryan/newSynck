# Motion Reference Analysis
**Source**: `references/finzy-motion-reference.mp4`

## SCENE 01 (00:00 - 00:02): Hero Entrance
* **Composition**: Centered large typography, massive whitespace, subtle radial glow in the background. Two mobile mockups entering from the bottom.
* **Motion**: 
  * Navigation and typography fade in while translating upwards (Y-axis offset).
  * Background radial gradient expands gently.
  * Mobile mockups slide up from `y: 100%` into viewport, settling with a slight stagger (left phone arrives first, right phone arrives second and scales down slightly to sit behind/beside).
* **Transition Out**: On scroll, the phones parallax upwards out of frame faster than the background text, which fades out.

## SCENE 02 (00:03 - 00:05): The Metrics / Stats
* **Composition**: Left-aligned heading, right-aligned supporting text. A horizontal row of three metrics.
* **Motion**: 
  * The heading slides up and fades in.
  * The three metric blocks appear with a staggered `transform: translateY` and `opacity` fade (1 -> 2 -> 3).
* **Transition Out**: The metric blocks slide up continuously with the scroll.

## SCENE 03 (00:05 - 00:08): Bounded Feature Cards
* **Composition**: 2-column grid of large rounded cards containing UI elements (credit cards, dashboard widgets, charts, maps).
* **Motion**:
  * Cards enter from the bottom (parallax scroll).
  * Inside the cards, UI objects (like the credit card) have independent floating/parallax motion relative to the card container.
  * As scrolling continues, the first row of cards moves up, revealing a second row of cards seamlessly.
  * Micro-animations trigger inside the cards (e.g., donut chart fills).
* **Transition Out**: The entire card grid translates upwards out of the viewport.

## SCENE 04 (00:09 - 00:10): 6-Grid Features
* **Composition**: Heading on the top-left, accompanied by a structured grid of 6 feature boxes with icons.
* **Motion**: Staggered fade-up entrance for the 6 boxes. The grid builds itself visually as the user reaches the section.
* **Transition Out**: Normal scroll flow upwards.

## SCENE 05 (00:11 - 00:13): Horizontal Testimonials
* **Composition**: Large heading. A horizontal track of testimonial cards extending off-screen to the right.
* **Motion**: Horizontal scroll tied to vertical scroll (ScrollTrigger). As the user scrolls down, the cards slide to the left. The cards themselves scale slightly or change opacity when coming into focus.
* **Transition Out**: The horizontal track finishes, and the page resumes vertical scrolling.

## SCENE 06 (00:13 - 00:15): Dark App CTA
* **Composition**: A dark, full-width section that feels like an overlay or a deep background layer. Massive typography and app store buttons over a blurred/darkened phone background.
* **Motion**: The dark section slides up over the previous white section (layer overlap). The content inside reveals smoothly with a scale-up effect.
* **Transition Out**: Slides up to reveal the footer.

## SCENE 07 (00:15 - 00:17): Layered Footer
* **Composition**: Massive abstract typography/shapes in the background, layered with floating mockups and standard footer links.
* **Motion**: The footer feels like it's being revealed from underneath the CTA section (curtain effect). Objects inside the footer have slight independent parallax.

## Core Motion Principles Extracted:
1. **Vertical Parallax & Layering**: Elements rarely scroll at the exact same speed. Mockups move faster than text, creating depth.
2. **Staggered Entrances**: Grids and lists always enter sequentially (0.1s - 0.2s stagger).
3. **Clip & Transform**: Cards and images often reveal via clipping masks or upward translation combined with opacity.
4. **Cinematic Pacing**: Pauses between major sections. The scroll feels like a timeline, not just a document.
5. **No Layout Thrashing**: Animations are strictly `transform` (Y-axis) and `opacity`. No width/height animating on scroll.
