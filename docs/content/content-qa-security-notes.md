# Content QA and Security Notes

## Purpose
This document defines content-specific QA, safety, and security expectations for the meditation VR web app prototype.

## Content QA Checklist

Before preview, confirm:

- The app is runnable as a static web app.
- The app includes `index.html` and supporting CSS, JavaScript, and structured data as needed.
- All visible buttons work inside the preview frame.
- No visible control navigates the parent or top window.
- All guided steps display complete final copy.
- All vision-board themes display complete final copy.
- All affirmations display complete final copy.
- No placeholder or filler language appears anywhere in the UI.
- The experience supports the emotional target: creative clarity, calm, and safety.
- Copy is readable in short, low-cognitive-load sections.
- The interface does not make clinical promises.
- The interface does not imply diagnosis, treatment, or guaranteed outcomes.
- There is a smoke test file that verifies structured data and required content terms.

## Required Structured Content Checks

The smoke test should verify:

- At least 8 guided session steps exist.
- At least 6 vision-board themes exist.
- At least 6 affirmations exist.
- Guided steps include titles, categories, prompts, affirmations, and visual directions.
- Vision-board themes include names, prompts, and supportive feelings.
- Required emotional terms appear in the structured data or UI content:
  - calm
  - safety
  - clarity
  - creative

## Placeholder Detection

The smoke test should fail if any of the following appear in implementation files or structured content:

- lorem ipsum
- TODO
- coming soon
- placeholder
- here could be
- dummy
- filler
- under construction

Case-insensitive matching is recommended.

## Content Safety Standards

### The Experience May Say
- This is a calming visualization experience.
- This space is designed to support reflection.
- You can move at your own pace.
- You may choose what feels supportive.
- You can return to your breath or pause at any time.

### The Experience Must Not Say
- This treats anxiety.
- This heals trauma.
- This replaces therapy.
- This guarantees relaxation.
- This will cure or diagnose a condition.
- This is medical advice.

## User Emotional Safety

Because this is a waiting-room experience, content should assume users may be vulnerable, distracted, or uncertain.

The app should:
- Let users opt in.
- Avoid intense emotional excavation.
- Keep prompts present-focused.
- Avoid asking users to relive difficult experiences.
- Allow restarting or moving through content without penalty.
- Use reassuring microcopy.

## Privacy and Data Notes

For the first static prototype:

- Do not collect personal health information.
- Do not ask users to enter sensitive personal details.
- Do not store user reflections unless explicitly implemented with consent.
- Do not transmit prompt selections to external services in the first demo.
- If generated imagery is simulated, label the area as a visualization preview or image prompt, not as a completed AI generation service.

## Security Notes

- Do not expose tokens, API keys, or credentials in source files.
- Refer to credentials only by vault alias or environment configuration.
- Sanitize any user-entered text before rendering it.
- If future prompt entry is added, escape rendered content to prevent script injection.
- Avoid external scripts unless necessary and reviewed.
- Keep the first demo fully static where possible.

## Accessibility QA

Confirm:
- Buttons have descriptive labels.
- Text contrast is sufficient against backgrounds.
- Motion can be paused if animated motion is visually prominent.
- Keyboard users can activate controls.
- Focus states are visible.
- Text is not embedded only inside images.
- The experience remains usable without VR hardware.

## Content Acceptance Criteria

The content implementation is acceptable when:

1. A user can understand the purpose of the app within 10 seconds.
2. The first screen clearly offers a safe start.
3. The guided journey includes complete, calming prompts.
4. The vision-board section includes meaningful visual themes.
5. The final screen offers a gentle close.
6. No copy sounds clinical, coercive, or exaggerated.
7. No placeholder language remains.
8. All controls work in the preview frame.

## Update History

| Date | Update | Author |
|---|---|---|
| 2026-06-12 | Created content QA, privacy, safety, and security notes for kickoff phase. | Content Lead |
