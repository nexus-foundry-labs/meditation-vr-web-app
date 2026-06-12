# UI Designer Component Specification — Clarity Room

## Project
Meditation VR Web App — deployable static browser prototype

## Role
UI Designer reporting to Design Lead

## Emotional Target
The interface should create an immediate sense of:

- Creative clarity
- Calm
- Safety
- Gentle hope
- Spaciousness without pressure

The experience must feel supportive and non-clinical. It should be appropriate for a waiting-room demo where users may be distracted, nervous, or new to guided visualization.

---

## Design Principles

### 1. Quiet First Impression
The first screen should reduce cognitive load. Use a single clear headline, one primary action, and a soft visual anchor.

### 2. Spacious Visual Hierarchy
Avoid dense panels or dashboard-like complexity. Use generous spacing, rounded surfaces, and short text blocks.

### 3. Safe, Non-Clinical Tone
The UI should not resemble a medical intake flow, diagnosis tool, or therapy portal. Avoid harsh whites, sterile blues, alert colors, and form-heavy patterns.

### 4. Guided, Not Forced
The user should always feel able to move forward, pause, or revisit previous steps. Avoid urgency language.

### 5. Preview-Safe Navigation
All controls must remain inside the preview app. Buttons should use in-page actions, hash navigation, or JavaScript state updates. Do not use parent/top/window navigation.

---

## Recommended App Structure

### Main Sections

1. **Arrival / Hero**
   - Introduces Clarity Room.
   - Provides primary “Begin” button.
   - Shows calming hero illustration.
   - Sets expectation for a short guided experience.

2. **Guided Journey**
   - Displays the current meditation step.
   - Includes title, category, prompt, affirmation, and ambient scene cue.
   - Provides previous/next controls and progress indication.

3. **Vision Board**
   - Presents selectable visualization themes.
   - Shows theme cards with gentle imagery, color swatches, and reflection prompts.
   - Includes a “Generate Reflection Visual” or “Preview Visual” button that updates content in-app.

4. **Affirmations**
   - Offers short, believable affirmations.
   - Uses card carousel or stacked cards.
   - Allows users to select or cycle affirmations without leaving the page.

5. **Grounding Close**
   - Ends with a soft summary state.
   - Encourages the user to carry one clear image or phrase with them.
   - Does not make clinical promises.

---

## Visual System

### Color Palette

| Token | Suggested Value | Usage |
|---|---:|---|
| `--color-ink` | `#172326` | Primary text |
| `--color-muted` | `#5F7074` | Secondary text |
| `--color-cloud` | `#F6F2EA` | Page background |
| `--color-mist` | `#E8F0EC` | Soft panels |
| `--color-sage` | `#91AAA0` | Accent surfaces |
| `--color-dawn` | `#F4CFA8` | Warm highlight |
| `--color-lavender` | `#CFC8E8` | Creative clarity accent |
| `--color-sky` | `#B9DDE4` | Ambient glow |
| `--color-deep-teal` | `#24484D` | Primary button |
| `--color-focus` | `#7C68C9` | Keyboard focus ring |

### Color Guidance
- Use warm off-white instead of stark white.
- Primary action should be deep teal with high contrast.
- Use dawn peach and lavender as subtle glow accents.
- Avoid saturated red unless used for inaccessible error states, which are not expected in this prototype.

### Typography

Recommended system font stack:

