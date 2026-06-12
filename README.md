<!-- docs/project/project-management-plan.md -->
# Project Management Plan — Meditation VR Web App

## Project

**Meditation VR Web App**  
Deployable static browser experience for a waiting-room demo.

## Emotional Target

The first demo should create:

- Creative clarity
- Calm
- Safety
- Gentle hope
- Spaciousness without pressure

## Project Manager

Project Manager

## Purpose

This document defines the delivery plan, milestone structure, dependencies, risks, acceptance criteria, and coordination workflow for the first deployable prototype.

The goal is to help the team move from kickoff documentation into a runnable static web app that can be reviewed in a live preview and later published through GitHub Pages or deployed to a VPS.

---

## Delivery Objective

Build a simple, deployable browser-based meditation and visualization prototype that includes:

- A calming arrival screen
- Guided visualization flow
- Therapeutic-style affirmations without clinical claims
- Vision-board style meditation area
- Ambient calming visual design
- In-preview controls that do not navigate outside the app frame
- Structured content data
- Smoke test coverage for required content/data expectations

The prototype must be suitable for static hosting.

---

## Current Phase

**Kickoff / Documentation Phase**

Implementation is not part of this phase. The current focus is to produce clear planning, content, design, QA, and technical direction before production files are created.

Existing documentation includes:

- `README.md`
- `docs/content/content-strategy.md`
- `docs/content/session-script.md`
- `docs/content/ui-copy-spec.md`
- `docs/content/content-qa-security-notes.md`
- `docs/design/design-lead-visual-direction.md`
- `docs/design/ui-designer-component-spec.md`

This document adds delivery coordination and implementation-readiness planning.

---

## Milestones

### Milestone 1 — Kickoff Documentation Complete

**Status:** In progress

**Goal:** Align the team around emotional target, content model, design direction, app structure, QA expectations, and implementation constraints.

**Deliverables:**

- Content strategy
- First-session script
- UI copy specification
- Visual direction
- Component specification
- QA/security checklist
- Project management plan

**Exit Criteria:**

- Emotional target is clearly documented.
- Minimum content requirements are defined.
- Static app expectations are documented.
- Preview safety requirements are documented.
- No unresolved blockers prevent implementation planning.

---

### Milestone 2 — Static App Implementation

**Status:** Not started

**Goal:** Build a runnable static web app.

**Required files expected in implementation phase:**

- `index.html`
- Supporting stylesheet, such as `styles.css`
- Supporting JavaScript, such as `script.js`
- Structured content/data file or embedded structured data
- Smoke test file

**Core implementation scope:**

- Arrival screen
- Guided journey section
- Vision-board section
- Affirmations section
- In-app navigation
- Prompt advancement controls
- Vision-board theme controls
- Calming ambient visual presentation

**Exit Criteria:**

- App runs as a static web app.
- All visible controls work inside the preview frame.
- No placeholder/filler copy is present.
- Required guided steps, themes, and affirmations are implemented.
- Structured data is present.
- Smoke test verifies content/data expectations.

---

### Milestone 3 — Internal QA and Preview Readiness

**Status:** Not started

**Goal:** Validate that the app can be safely previewed in-app.

**QA focus areas:**

- Static app loads without build step unless a build step is intentionally introduced later.
- All buttons work.
- Navigation remains inside the preview.
- No broken links.
- No parent/top/window navigation.
- No clinical promises or therapeutic guarantees.
- No lorem ipsum, TODOs, placeholder text, or “coming soon” language.
- Guided content is complete.
- Structured data passes smoke test.
- Visual experience supports calm, safety, and creative clarity.

**Exit Criteria:**

- Smoke test passes.
- Manual preview checklist passes.
- Any issues are triaged and resolved or explicitly documented.

---

### Milestone 4 — Live Preview Review

**Status:** Not started

**Goal:** Provide a reviewable live preview for stakeholder feedback.

**Preview review questions:**

- Does the experience feel calm?
- Does it feel emotionally safe?
- Does it support creative clarity?
- Are controls intuitive?
- Is the session length appropriate for a waiting-room context?
- Is the language supportive without sounding clinical?
- Are the vision-board themes useful and easy to understand?

**Exit Criteria:**

- Stakeholder confirms whether the prototype is acceptable for publication or requires iteration.
- Any requested changes are converted into a prioritized task list.

---

### Milestone 5 — Publish / Deploy Decision

**Status:** Not started

**Goal:** Decide whether to publish through GitHub Pages or deploy to a VPS.

**Deployment options:**

1. **GitHub Pages**
   - Best for a simple static demo.
   - Lower operational overhead.
   - Recommended for first public/static prototype.

2. **VPS**
   - Useful if future server-side image generation, authentication, analytics, or private integrations are required.
   - Higher operational complexity.
   - Not necessary for the first static prototype unless requested.

**Exit Criteria:**

- Deployment target is chosen.
- Required deployment configuration is documented.
- No secrets are exposed.
- Deployment is confirmed only after platform/tool success.

---

## Workstreams

### Product / UX

**Responsibilities:**

- Define first-session user journey.
- Ensure experience is low-friction for waiting-room use.
- Keep controls simple and accessible.
- Confirm flow from arrival to guided visualization to affirmation close.

**Dependencies:**

- Content script
- UI copy
- Design component direction
- Engineering feasibility for static interaction model

---

### Content

**Responsibilities:**

- Provide complete guided session copy.
- Provide affirmation copy.
- Provide vision-board theme copy.
- Avoid clinical claims, diagnostic language, or guaranteed outcomes.
- Maintain short, low-cognitive-load prompts.

**Dependencies:**

- Emotional target
- App flow
- Data structure requirements

---

### Design

**Responsibilities:**

- Define visual direction.
- Specify calming ambient scene treatment.
- Guide layout, color, motion, and component feel.
- Ensure the design supports emotional safety and clarity.

**Dependencies:**

- Product flow
- Content structure
- Static web implementation constraints

---

### Engineering

**Responsibilities:**

- Build the static web app during implementation phase.
- Preserve the existing project structure unless directed otherwise.
- Implement structured data.
- Implement in-preview-safe navigation and controls.
- Add smoke test coverage.
- Prepare app for GitHub Pages or VPS deployment path.

**Dependencies:**

- Content requirements
- Design specifications
- QA acceptance criteria
- Project management milestone sequence

---

### QA / Security

**Responsibilities:**

- Validate acceptance gate requirements.
- Confirm no placeholder content.
- Confirm no unsafe navigation behavior.
- Confirm no clinical or medical claims.
- Confirm smoke test coverage.
- Confirm no exposed secrets.

**Dependencies:**

- Final implementation files
- Content/data file
- Preview environment

---

## Priority Task List

### Priority 0 — Must Not Be Violated

- Do not write implementation code during kickoff documentation phase.
- Do not expose secrets.
- Do not use raw tokens in documentation, code, tests, or UI.
- Do not create a non-runnable planning-only app during implementation phase.
- Do not include placeholder/filler copy.
- Do not navigate parent/top/window from preview controls.

---

### Priority 1 — Implementation Readiness

- Confirm final first-session content is complete.
- Confirm minimum structured data counts:
  - At least 8 guided steps
  - At least 6 vision-board themes
  - At least 6 affirmations
- Confirm UI copy is implementation-ready.
- Confirm design direction is sufficient for first build.
- Confirm smoke test expectations are clear.

---

### Priority 2 — First Static Prototype

- Create static app entry point.
- Implement app sections:
  - Arrival
  - Journey
  - Vision Board
  - Affirmations
- Implement guided step progression.
- Implement vision-board theme selection.
- Implement affirmation display.
- Implement in-page navigation.
- Apply visual styling aligned to design docs.
- Add structured data.
- Add smoke test.

---

### Priority 3 — Preview QA

- Run smoke test.
- Manually verify visible controls.
- Verify no placeholder content.
- Verify content tone.
- Verify preview-frame-safe behavior.
- Prepare summary of issues and fixes.

---

### Priority 4 — Deployment Preparation

- Determine GitHub Pages or VPS target.
- Document deployment steps.
- Confirm no secret requirements for static deployment.
- Publish only after preview acceptance.

---

## Acceptance Gate

The live preview should be blocked unless all of the following are true:

- A runnable app exists.
- Static project includes `index.html` plus required supporting files.
- Structured content/data exists.
- All visible buttons and links work inside the preview frame.
- No visible control navigates parent/top/window.
- No placeholder, lorem ipsum, TODO, “coming soon,” or filler copy appears.
- Guided session copy is complete.
- Vision-board theme copy is complete.
- Affirmation copy is complete.
- Smoke test verifies required data counts and required terms if applicable.
- The interface avoids clinical promises, diagnosis language, treatment language, or guaranteed outcomes.

---

## Initial Implementation Scope Recommendation

For the first implementation pass, keep the app intentionally simple and static.

Recommended structure:

