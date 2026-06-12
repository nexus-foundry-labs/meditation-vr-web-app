# UI Designer Component Specification — Meditation VR Web App

## Purpose

This document defines the initial UI component patterns for the static browser prototype. The interface should feel calm, safe, and creatively clarifying while remaining practical for a waiting-room demo.

## Page Anatomy

Recommended page sections:

1. Header
2. Hero arrival
3. Guided session controls
4. Ambient scene panel
5. Vision board prompt area
6. Affirmation close
7. Footer / safety note

## Header

### Content
- Small brand mark using `assets/brand-mark.png`
- App name
- Optional short status chip: “Gentle session”

### Behavior
- Header links should use hash anchors or in-page scroll behavior only.
- Avoid external navigation in the preview unless specifically required.

### Visual
- Transparent or soft-glass header
- Sticky header is acceptable if subtle
- Minimum 16px side padding on mobile

## Hero Arrival Component

### Required Content
- Main headline
- Short supportive description
- Primary action button
- Secondary action button
- Hero image using `assets/hero.png`

### Suggested Copy
Headline:
> A calm space for creative clarity.

Description:
> Move through a gentle guided session designed to help you arrive, breathe, imagine, and leave with one steady affirmation.

Primary action:
> Begin gentle session

Secondary action:
> Preview the space

### States
- Default
- Hover
- Focus-visible
- Active/pressed

## Guided Affirmation Sequence

### Data Model Recommendation

The app should use structured local data for affirmation steps. Suggested minimum sequence:

