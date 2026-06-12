(function attachContent(root, factory) {
  const content = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = content;
  } else {
    root.CLARITY_ROOM_CONTENT = content;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function buildContent() {
  return {
    sessionSteps: [
      {
        id: "safe-arrival",
        title: "Arrive Gently",
        category: "Safe Arrival",
        prompt: "You are invited to settle into this quiet space. There is nothing to solve right now.",
        affirmation: "I am allowed to arrive exactly as I am.",
        visualDirection: "Soft ambient light, slow-moving particles, spacious horizon, low contrast.",
        sceneState: "mist-pearl"
      },
      {
        id: "notice-support",
        title: "Notice What Holds You",
        category: "Safe Arrival",
        prompt: "Let your attention rest on the surface beneath you. Notice that you are supported in this moment.",
        affirmation: "I can let support meet me here.",
        visualDirection: "Gentle floor glow, warm neutral tones, grounded visual plane.",
        sceneState: "warm-ground"
      },
      {
        id: "soften-breath",
        title: "Make Space to Breathe",
        category: "Calming Reset",
        prompt: "Take a slow breath in, then let it leave without effort. If your mind wanders, you can return to the next breath.",
        affirmation: "My breath can be simple and easy.",
        visualDirection: "Subtle pulsing light synchronized with a slow breathing rhythm.",
        sceneState: "breath-pulse"
      },
      {
        id: "release-pressure",
        title: "Nothing to Force",
        category: "Calming Reset",
        prompt: "There is no need to create a perfect feeling. Let the moment be soft enough for whatever is here.",
        affirmation: "I can be gentle with myself.",
        visualDirection: "Diffuse glow, slow drift, softening edges.",
        sceneState: "soft-drift"
      },
      {
        id: "inner-canvas",
        title: "A Clear Inner Canvas",
        category: "Creative Clarity",
        prompt: "Imagine a calm, open space where a new idea can safely appear. Notice its colors, shapes, or atmosphere.",
        affirmation: "Clarity can arrive softly.",
        visualDirection: "Spacious sky-like environment, pale blues, lavender, warm white light.",
        sceneState: "clear-sky"
      },
      {
        id: "guiding-image",
        title: "Let One Image Come Forward",
        category: "Creative Clarity",
        prompt: "Allow one image, symbol, or word to become a gentle guide. It does not need to make sense yet.",
        affirmation: "I can trust the image that supports me.",
        visualDirection: "Floating cards or luminous panels with calm symbolic visuals.",
        sceneState: "luminous-cards"
      },
      {
        id: "build-vision",
        title: "Shape the Feeling",
        category: "Vision Board",
        prompt: "Choose the visual theme that feels most supportive. Let it become a quiet reminder of where you are growing.",
        affirmation: "My future can be shaped with care.",
        visualDirection: "Vision-board area with selectable prompt cards and generated-image style preview panels.",
        sceneState: "vision-panels"
      },
      {
        id: "carry-forward",
        title: "Take One Thing With You",
        category: "Affirmation Close",
        prompt: "Choose one word, image, or feeling to carry into the rest of your day.",
        affirmation: "I leave with calm, safety, and creative clarity.",
        visualDirection: "Warm closing light, gentle fade, stable horizon.",
        sceneState: "warm-close"
      }
    ],
    visionThemes: [
      {
        id: "soft-morning-light",
        name: "Soft Morning Light",
        prompt: "A peaceful room filled with warm morning light, soft textures, clear space, and a feeling of new possibility.",
        supportiveFeeling: "Freshness, openness, gentle momentum",
        palette: ["#fff7ea", "#f4cfa8", "#b9dde4", "#91aaa0", "#d6aa45"],
        previewUnits: ["warm window light", "open table", "soft fabric", "fresh air", "new color"],
        imagePrompt:
          "Create a peaceful room filled with warm morning light, soft textures, clear space, and a feeling of new possibility. Keep the mood calm, safe, and creatively clear."
      },
      {
        id: "safe-garden-path",
        name: "Safe Garden Path",
        prompt: "A quiet garden path with soft greenery, glowing flowers, and a calm place to pause.",
        supportiveFeeling: "Safety, patience, grounded growth",
        palette: ["#e8f0ec", "#91aaa0", "#cfc8e8", "#fff7ea", "#d6aa45"],
        previewUnits: ["garden curve", "soft moss", "glowing flowers", "quiet bench", "filtered sun"],
        imagePrompt:
          "Create a quiet garden path with soft greenery, glowing flowers, and a calm place to pause. Keep the image gentle, grounded, and safe."
      },
      {
        id: "clear-blue-horizon",
        name: "Clear Blue Horizon",
        prompt: "A wide blue horizon over still water, with clean air, spacious light, and a sense of direction.",
        supportiveFeeling: "Clarity, perspective, steady confidence",
        palette: ["#d9f0ff", "#b9dde4", "#24484d", "#fff7ea", "#f4cfa8"],
        previewUnits: ["still water", "wide horizon", "clean air", "pale sky", "steady line"],
        imagePrompt:
          "Create a wide blue horizon over still water, with clean air, spacious light, and a sense of direction. Keep the image calm, safe, and clear."
      },
      {
        id: "creative-studio",
        name: "Creative Studio",
        prompt: "A serene creative studio with natural light, blank pages, inspiring colors, and room for imagination.",
        supportiveFeeling: "Expression, focus, creative permission",
        palette: ["#fff7ea", "#cfc8e8", "#f4cfa8", "#91aaa0", "#24484d"],
        previewUnits: ["blank pages", "soft brushes", "natural light", "color tray", "quiet shelf"],
        imagePrompt:
          "Create a serene creative studio with natural light, blank pages, inspiring colors, and room for imagination. Keep the scene calm, uncluttered, and welcoming."
      },
      {
        id: "floating-lanterns",
        name: "Floating Lanterns",
        prompt: "Soft lanterns floating through twilight, each carrying a calm intention for the days ahead.",
        supportiveFeeling: "Hope, reflection, gentle release",
        palette: ["#26364a", "#cfc8e8", "#f4cfa8", "#d6aa45", "#b9dde4"],
        previewUnits: ["twilight glow", "soft lanterns", "quiet water", "gentle gold", "open sky"],
        imagePrompt:
          "Create soft lanterns floating through twilight, each carrying a calm intention for the days ahead. Keep the atmosphere reflective, gentle, and safe."
      },
      {
        id: "quiet-forest-room",
        name: "Quiet Forest Room",
        prompt: "A peaceful room surrounded by trees, with soft moss tones, filtered light, and a feeling of protection.",
        supportiveFeeling: "Shelter, restoration, inner quiet",
        palette: ["#e8f0ec", "#91aaa0", "#24484d", "#fff7ea", "#cfc8e8"],
        previewUnits: ["moss tones", "tree window", "filtered light", "quiet chair", "sheltered air"],
        imagePrompt:
          "Create a peaceful room surrounded by trees, with soft moss tones, filtered light, and a feeling of protection. Keep it calm, safe, and spacious."
      }
    ],
    affirmations: [
      "I am safe enough to soften.",
      "I can move at the pace of calm.",
      "My ideas can arrive without pressure.",
      "I can choose what supports me.",
      "Clarity can be gentle.",
      "I am allowed to begin again.",
      "My imagination can be a safe place.",
      "I can carry one steady image with me.",
      "I do not have to force the next step.",
      "I can meet this moment with care."
    ]
  };
});
