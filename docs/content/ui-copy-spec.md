# UI Copy Specification

## Purpose
This document provides implementation-ready interface copy for the static browser VR prototype.

## Global App Name Options

Preferred app name for first demo:
**Clarity Room**

Alternative names:
- Calm Canvas
- Safe Horizon
- Vision Space

Recommendation: Use **Clarity Room** because it balances emotional safety and creative visualization without sounding clinical.

## Page Metadata

### Title
Clarity Room — Calm Visualization Demo

### Description
A calming browser-based visualization experience for creative clarity, gentle affirmations, and safe reflection.

## Header Copy

### App Label
Clarity Room

### Short Tagline
A quiet space for calm, safety, and creative clarity.

## Primary Navigation

If navigation is included, use these labels:

- Begin
- Journey
- Vision Board
- Affirmations

All navigation must remain inside the preview app.

## Arrival Screen

### Eyebrow
Waiting-Room VR Prototype

### Headline
Settle into a calmer, clearer space.

### Body
Step into a gentle visual experience designed to support calm, safety, and creative clarity. Move through grounding prompts, soothing affirmations, and a vision-board meditation at your own pace.

### Primary Button
Begin the Journey

### Secondary Button
Preview Vision Themes

### Helper Text
No headset is required. You can use this experience in your browser.

## Session Controls

### Start Button
Start Guided Reset

### Previous Button
Previous

### Next Button
Next

### Restart Button
Begin Again

### Pause Button
Pause Motion

### Resume Button
Resume Motion

### Audio Toggle Off
Mute Ambience

### Audio Toggle On
Play Ambience

If actual audio is not implemented in the first demo, do not display audio controls.

## Guided Session Panel

### Section Label
Guided Journey

### Intro Text
Follow each prompt slowly. You can move forward when you feel ready.

### Progress Label Format
Step {current} of {total}

Example:
Step 3 of 8

## Vision Board Section

### Section Label
Vision Board

### Heading
Choose a supportive visual direction.

### Body
Select a theme that feels calm, safe, or creatively clear. Let the image become a gentle reminder of what you are moving toward.

### Theme Button Label Format
Choose {themeName}

Example:
Choose Soft Morning Light

### Active Theme Label
Selected Theme

### Generated Preview Label
Visualization Preview

### Prompt Label
Image Prompt

### Supportive Feeling Label
Supportive Feeling

## Affirmation Section

### Section Label
Affirmations

### Heading
Carry one steady phrase with you.

### Body
Choose an affirmation that feels believable and supportive right now.

### Button Label Format
Use this affirmation

## Closing Screen

### Heading
Carry the calm forward.

### Body
Take one word, image, or feeling with you. You can return to this quiet space whenever you need a moment of clarity.

### Primary Button
Begin Again

### Secondary Button
Return to Vision Board

## Empty States

Avoid empty states in the first demo by shipping complete guided steps, vision-board themes, and affirmations.

If an error state is necessary, use:

### General Error
Something did not load as expected. Please refresh the experience and try again.

### Data Error
The guided content could not be displayed. Please refresh the page.

Do not use vague or technical user-facing errors.

## Button and Link Requirements

All visible buttons and links must work inside the preview frame.

Implementation requirements:
- Use in-page handlers, hash sections, or modals.
- Use `type="button"` for non-submit buttons.
- Avoid `window.location`, `parent`, and `top` navigation unless explicitly requested.
- Do not include dead links.
- Do not include links to external pages in the first demo unless necessary.

## Forbidden UI Copy

Do not include:
- Lorem ipsum
- TODO
- Coming soon
- Placeholder
- Here could be
- Dummy text
- Filler
- Under construction
- Feature not available

## Microcopy Guidance

### Good
- “Move forward when you feel ready.”
- “Choose the theme that feels supportive.”
- “There is no right way to do this.”
- “You can pause the motion at any time.”

### Avoid
- “Complete this exercise.”
- “Fix your stress.”
- “Optimize your mindset.”
- “Unlock instant transformation.”

## Update History

| Date | Update | Author |
|---|---|---|
| 2026-06-12 | Created UI copy specification for implementation. | Content Lead |
