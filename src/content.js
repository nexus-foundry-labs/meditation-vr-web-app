(function exposeClarityRoomContent() {
  const content = {
    appName: "Clarity Room",
    tagline: "A quiet space for calm, safety, and creative clarity.",
    sessionSteps: [
      {
        id: "safe-arrival",
        title: "Arrive Gently",
        category: "Safe Arrival",
        prompt:
          "You are invited to settle into this quiet space. There is nothing to solve right now.",
        affirmation: "I am allowed to arrive exactly as I am.",
        visualDirection:
          "Soft ambient light, slow horizon movement, spacious distance, and low contrast.",
        sceneState: {
          word: "calm",
          palette: ["#f7f1e7", "#8ba889", "#7fb4d8"],
          accent: "#247b78"
        }
      },
      {
        id: "notice-support",
        title: "Notice What Holds You",
        category: "Safe Arrival",
        prompt:
          "Let your attention rest on the surface beneath you. Notice that you are supported in this moment.",
        affirmation: "I can let support meet me here.",
        visualDirection:
          "Gentle floor glow, warm neutral tones, and a grounded visual plane.",
        sceneState: {
          word: "safety",
          palette: ["#fff7eb", "#c9b58f", "#8ba889"],
          accent: "#8b6f3c"
        }
      },
      {
        id: "soften-breath",
        title: "Make Space to Breathe",
        category: "Calming Reset",
        prompt:
          "Take a slow breath in, then let it leave without effort. If your mind wanders, you can return to the next breath.",
        affirmation: "My breath can be simple and easy.",
        visualDirection:
          "Subtle pulsing light synchronized with a slow breathing rhythm.",
        sceneState: {
          word: "ease",
          palette: ["#eaf6f3", "#7fb4d8", "#b7a7d6"],
          accent: "#4f8c9d"
        }
      },
      {
        id: "release-pressure",
        title: "Nothing to Force",
        category: "Calming Reset",
        prompt:
          "There is no need to create a perfect feeling. Let the moment be soft enough for whatever is here.",
        affirmation: "I can be gentle with myself.",
        visualDirection:
          "Diffuse glow, slow drift, and softened edges around the field of view.",
        sceneState: {
          word: "softness",
          palette: ["#f7f1e7", "#d77555", "#e0b85f"],
          accent: "#d77555"
        }
      },
      {
        id: "inner-canvas",
        title: "A Clear Inner Canvas",
        category: "Creative Clarity",
        prompt:
          "Imagine a calm, open space where a new idea can safely appear. Notice its colors, shapes, or atmosphere.",
        affirmation: "Clarity can arrive softly.",
        visualDirection:
          "Spacious sky-like environment, pale blues, soft lavender, and warm white light.",
        sceneState: {
          word: "clarity",
          palette: ["#edf7fb", "#7fb4d8", "#b7a7d6"],
          accent: "#3e84aa"
        }
      },
      {
        id: "guiding-image",
        title: "Let One Image Come Forward",
        category: "Creative Clarity",
        prompt:
          "Allow one image, symbol, or word to become a gentle guide. It does not need to make sense yet.",
        affirmation: "I can trust the image that supports me.",
        visualDirection:
          "Floating panels with calm symbolic visuals and clear space between choices.",
        sceneState: {
          word: "creative",
          palette: ["#f8f1e8", "#e0b85f", "#7fb4d8"],
          accent: "#b8782b"
        }
      },
      {
        id: "build-vision",
        title: "Shape the Feeling",
        category: "Vision Board",
        prompt:
          "Choose the visual theme that feels most supportive. Let it become a quiet reminder of where you are growing.",
        affirmation: "My future can be shaped with care.",
        visualDirection:
          "Vision-board area with selectable prompt cards and visualization preview panels.",
        sceneState: {
          word: "support",
          palette: ["#f5efe5", "#8ba889", "#d77555"],
          accent: "#5f8b64"
        }
      },
      {
        id: "carry-forward",
        title: "Take One Thing With You",
        category: "Affirmation Close",
        prompt: "Choose one word, image, or feeling to carry into the rest of your day.",
        affirmation: "I leave with calm, safety, and creative clarity.",
        visualDirection: "Warm closing light, gentle fade, and a stable horizon.",
        sceneState: {
          word: "steady",
          palette: ["#fff4e2", "#e0b85f", "#247b78"],
          accent: "#247b78"
        }
      }
    ],
    visionBoardThemes: [
      {
        id: "soft-morning-light",
        name: "Soft Morning Light",
        prompt:
          "A peaceful room filled with warm morning light, soft textures, clear space, and a feeling of new possibility.",
        supportiveFeeling: "Freshness, openness, gentle momentum",
        palette: ["#fff3da", "#e0b85f", "#f7c7a6"],
        accent: "#d99547"
      },
      {
        id: "safe-garden-path",
        name: "Safe Garden Path",
        prompt:
          "A quiet garden path with soft greenery, glowing flowers, and a calm place to pause.",
        supportiveFeeling: "Safety, patience, grounded growth",
        palette: ["#e8f0dc", "#8ba889", "#d77555"],
        accent: "#5f8b64"
      },
      {
        id: "clear-blue-horizon",
        name: "Clear Blue Horizon",
        prompt:
          "A wide blue horizon over still water, with clean air, spacious light, and a sense of direction.",
        supportiveFeeling: "Clarity, perspective, steady confidence",
        palette: ["#e5f4fb", "#7fb4d8", "#247b78"],
        accent: "#3e84aa"
      },
      {
        id: "creative-studio",
        name: "Creative Studio",
        prompt:
          "A serene creative studio with natural light, blank pages, inspiring colors, and room for imagination.",
        supportiveFeeling: "Expression, focus, creative permission",
        palette: ["#fff6e8", "#d77555", "#7fb4d8"],
        accent: "#c75d3a"
      },
      {
        id: "floating-lanterns",
        name: "Floating Lanterns",
        prompt:
          "Soft lanterns floating through twilight, each carrying a calm intention for the days ahead.",
        supportiveFeeling: "Hope, reflection, gentle release",
        palette: ["#efe8f6", "#b7a7d6", "#e0b85f"],
        accent: "#8f78bf"
      },
      {
        id: "quiet-forest-room",
        name: "Quiet Forest Room",
        prompt:
          "A peaceful room surrounded by trees, with soft moss tones, filtered light, and a feeling of protection.",
        supportiveFeeling: "Shelter, restoration, inner quiet",
        palette: ["#edf2e7", "#8ba889", "#4f6b4e"],
        accent: "#4f6b4e"
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

  window.CLARITY_ROOM_CONTENT = content;
})();
