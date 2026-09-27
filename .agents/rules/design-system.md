# Project SyncK — Design System Guardrails

## Visual goal

Project SyncK should feel like an original premium product ecosystem website at the same level of polish as the Finzy Finance Web Animation reference.

Reference:
https://dribbble.com/shots/25315037-Finzy-Finance-Web-Animation

Reference is a visual benchmark, not a source to copy.

## Brand foundation

Base neutrals:
- `#FFFFFF`
- `#F7F7F5`
- `#F2F2EF`
- `#0A0A0A`

Text:
- primary `#0A0A0A`
- secondary `#6F6F6A`

Borders:
- `#E7E7E2`

Accent:
- SyncK yellow `#F5C518`

Use yellow as a precise accent, not as the dominant page background.

## Layout

Prioritize:
- oversized editorial typography;
- asymmetric or carefully staged compositions when useful;
- generous negative space;
- strong vertical rhythm;
- large product UI compositions;
- rounded but restrained geometry;
- subtle borders and shadows.

Avoid making every section a 3-column grid of equal cards.

## Typography

Choose a high-quality modern grotesk/sans-serif with reliable Armenian, Cyrillic and Latin support.

Use responsive display typography with short, bold headlines. Do not solve poor composition by adding paragraphs.

Typography must remain visually balanced across HY/RU/EN.

## Motion

Motion should explain one of these ideas:
- connect;
- sync;
- transform;
- hand off information;
- reveal hierarchy;
- guide attention.

Preferred animation properties:
- transform
- opacity
- scale

Use blur and filters sparingly. Prefer GPU-friendly animation. Respect `prefers-reduced-motion`.

### Motion rhythm

- micro: 150–250ms
- UI: 300–500ms
- hero: 700–1200ms
- major scene transitions: 800–1600ms

Use consistent easing. Avoid bounce-heavy or gimmicky motion.

## Product storytelling

The core visual metaphor is a continuous system:

CRM data → Telegram command → automation → synchronized business state → custom website → connected ecosystem → future mobile companion.

Prefer transformations between product states over isolated screenshots.

## Product UI

Mockups must use consistent:
- spacing;
- corner radii;
- typography;
- borders;
- shadows;
- data density.

Never use obviously fake placeholder UI when a realistic lightweight mockup can be built.

## Responsive

Mobile is a designed composition.

On mobile:
- remove non-essential decorative layers;
- preserve headline hierarchy;
- stack product scenes intentionally;
- prevent horizontal overflow;
- reduce scroll choreography where needed for performance and usability.

## Localization

All user-facing strings belong in translation dictionaries.

Never concatenate translated strings in a way that assumes English word order.

Use locale-aware metadata and routing when the project architecture supports it.
