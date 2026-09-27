# Motion Analysis: The Idea (Section 2)

## Reference Timestamps
`00:02 - 00:04`

## Scene Description
The transition from the Hero section to the second section (Save Time By Having In One Platform).

## Reference Motion Language & Choreography
- **Transition IN:** The entire Hero section scrolls up vertically and naturally exits the viewport. A solid clean white section enters from the bottom, pushing the Hero out. There is NO pinning, NO parallax, and NO complex transformation of the Hero elements.
- **Typography Movement:** As the new section enters the viewport, the large heading, the right-aligned paragraph + button, and the three stat columns fade in and translate upwards (`y: 50` to `y: 0`).
- **Layering & Overlap:** Standard document flow. The new section is physically below the Hero in the DOM, so it just scrolls up.
- **Transformations:** None. No phones floating, no glowing orbs, no particles.
- **Timing & Pacing:** Tied directly to the user's scroll speed (ScrollTrigger scrub or standard intersection observer).
- **What stays fixed:** Nothing.
- **What moves:** Everything moves vertically with the scroll.

## Project SyncK Adaptation
- **Previous Mistake:** In the previous iteration, I invented a pinned Hero scene where the phones floated apart, data particles appeared, and a purple glow faded in. This violated the reference's strict motion language.
- **Correction:** Remove the pinned `h-[400vh]` from the Hero. The Hero should just be `h-screen`. The new section "THE IDEA" will simply be the next section in the document flow.
- **Content Translation:**
  - *Reference Title:* "Save Time By Having In One Platform" -> *SyncK Title:* "Everything in sync. Everything in one place."
  - *Reference Right Text:* "With decades of experience..." + [See More] -> *SyncK Right Text:* "Everything connects. Everything communicates. Everything moves together." + [Discover]
  - *Reference Stats (3 columns):* 
    - 1. Users / 2,500+ -> 1. Active Users / 10k+
    - 2. Impact / 92% -> 2. Sync Speed / < 1ms
    - 3. Experience / 7 years -> 3. Integrations / 50+
- **Motion Implementation:** Standard vertical scroll. We will add a GSAP ScrollTrigger to this new section that simply animates the opacity and Y translation of the text and the 3 columns as they enter the viewport, exactly mimicking the `00:02-00:04` entrance.
