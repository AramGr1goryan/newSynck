# Motion Analysis: SyncK CRM & Modules (Section 3)

## Reference Timestamps
`00:04 - 00:08`

## Scene Description
The section immediately following the "Save Time" (The Idea) stats. It features a 2-column grid of large, feature-focused bento-box cards that scroll vertically into view.

## Reference Motion Language & Choreography
- **Composition:** A 2-column CSS grid. Each card is large, taking up ~48% of the container width.
- **Card Structure:** 
  - Top half: Large Title and a short descriptive paragraph.
  - Bottom half: A large, detailed UI mockup or illustration that acts as the focal point.
- **Transition IN:** The cards scroll into view naturally from the bottom. There is no horizontal sliding or sticky pinning.
- **Entry Animation:** As the cards enter the viewport, they fade in and slide up slightly (`y: 60` to `y: 0`).
- **Internal Object Movement:** The UI elements *inside* the cards (like the credit cards or the dark UI block) have a subtle entrance animation—they slide up into position within the card boundaries as the card itself appears.
- **Layering & Depth:** The cards have a flat, clean background (likely white or light gray) with no heavy drop shadows, maintaining the "clean and airy" aesthetic. The UI elements inside them have soft shadows to separate them from the card background.
- **Typography Behavior:** Fixed within the card. No complex typography animations, just the initial fade-in.

## Project SyncK Adaptation
- **Content Translation:** We will adapt the 4 cards from the reference into 4 SyncK CRM modules.
  - *Ref Card 1 (Credit Cards)* -> *SyncK Card 1 (Client Pipeline):* Title "Manage Your Clients" with a Kanban/Pipeline UI mockup sliding up.
  - *Ref Card 2 (Dark Phone UI)* -> *SyncK Card 2 (Mobile Sync):* Title "Always Connected" with a dark UI mobile mockup showing instant sync.
  - *Ref Card 3 (Donut Chart)* -> *SyncK Card 3 (Analytics):* Title "Deep Insights" with a modern CRM analytics chart (matching the visual weight of the reference donut chart).
  - *Ref Card 4 (World Map)* -> *SyncK Card 4 (Global Ecosystem):* Title "Global Automation" with a map or interconnected nodes illustration.
- **Motion Implementation:** We will use GSAP ScrollTrigger to stagger the entrance of the `.crm-card` elements (fade and slide up) as the user scrolls. We will also add a subtle inner `.crm-ui-element` stagger so the mockups slide up inside the cards, perfectly mirroring the reference's pacing.
