(function initClarityRoom() {
  "use strict";

  const content = window.ClarityRoomContent;

  if (!content) {
    return;
  }

  const state = {
    stepIndex: 0,
    themeIndex: 0,
    affirmationIndex: 0
  };

  const elements = {
    stepProgress: document.getElementById("step-progress"),
    stepCategory: document.getElementById("step-category"),
    stepTitle: document.getElementById("step-title"),
    stepPrompt: document.getElementById("step-prompt"),
    stepAffirmation: document.getElementById("step-affirmation"),
    stepVisualDirection: document.getElementById("step-visual-direction"),
    previousStep: document.getElementById("previous-step"),
    nextStep: document.getElementById("next-step"),
    restartJourney: document.getElementById("restart-journey"),
    themeGrid: document.getElementById("theme-grid"),
    selectedThemeName: document.getElementById("selected-theme-name"),
    selectedThemePrompt: document.getElementById("selected-theme-prompt"),
    selectedThemeFeeling: document.getElementById("selected-theme-feeling"),
    previewVisual: document.getElementById("preview-visual"),
    previewNote: document.getElementById("preview-note"),
    affirmationGrid: document.getElementById("affirmation-grid"),
    chosenAffirmation: document.getElementById("chosen-affirmation"),
    beginAgain: document.getElementById("begin-again"),
    motionToggle: document.getElementById("motion-toggle"),
    ambientStage: document.getElementById("ambient-stage")
  };

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  function setText(element, value) {
    if (element) {
      element.textContent = value;
    }
  }

  function renderStep() {
    const step = content.guidedSteps[state.stepIndex];
    setText(elements.stepProgress, `Step ${state.stepIndex + 1} of ${content.guidedSteps.length}`);
    setText(elements.stepCategory, step.category);
    setText(elements.stepTitle, step.title);
    setText(elements.stepPrompt, step.prompt);
    setText(elements.stepAffirmation, step.affirmation);
    setText(elements.stepVisualDirection, step.visualDirection);
    elements.previousStep.disabled = state.stepIndex === 0;
    elements.nextStep.textContent = state.stepIndex === content.guidedSteps.length - 1 ? "Finish" : "Next";
  }

  function updateStep(direction) {
    const nextIndex = state.stepIndex + direction;

    if (nextIndex >= content.guidedSteps.length) {
      scrollToId("closing");
      return;
    }

    state.stepIndex = Math.max(0, Math.min(nextIndex, content.guidedSteps.length - 1));
    renderStep();
  }

  function createThemeCard(theme, index) {
    const button = document.createElement("button");
    const name = document.createElement("span");
    const prompt = document.createElement("span");
    const feeling = document.createElement("span");

    button.type = "button";
    button.className = "theme-card";
    button.style.setProperty("--theme-color", theme.color);
    button.setAttribute("aria-pressed", String(index === state.themeIndex));
    button.setAttribute("aria-label", `Choose ${theme.name}`);

    name.className = "theme-name";
    name.textContent = theme.name;
    prompt.className = "theme-prompt";
    prompt.textContent = theme.prompt;
    feeling.className = "theme-feeling";
    feeling.textContent = theme.supportiveFeeling;

    button.append(name, prompt, feeling);
    button.addEventListener("click", () => {
      state.themeIndex = index;
      renderThemes();
      renderSelectedTheme();
    });

    return button;
  }

  function renderThemes() {
    elements.themeGrid.replaceChildren(
      ...content.visionThemes.map((theme, index) => createThemeCard(theme, index))
    );
  }

  function renderSelectedTheme() {
    const theme = content.visionThemes[state.themeIndex];
    setText(elements.selectedThemeName, theme.name);
    setText(elements.selectedThemePrompt, theme.prompt);
    setText(elements.selectedThemeFeeling, theme.supportiveFeeling);
    setText(
      elements.previewNote,
      "Your selections stay in this preview. The prompt is offered for reflection only."
    );
  }

  function createAffirmationCard(affirmation, index) {
    const button = document.createElement("button");
    const text = document.createElement("span");

    button.type = "button";
    button.className = "affirmation-card";
    button.setAttribute("aria-pressed", String(index === state.affirmationIndex));
    button.setAttribute("aria-label", "Use this affirmation");

    text.className = "affirmation-text";
    text.textContent = affirmation;
    button.append(text);
    button.addEventListener("click", () => {
      state.affirmationIndex = index;
      renderAffirmations();
      renderChosenAffirmation();
    });

    return button;
  }

  function renderAffirmations() {
    elements.affirmationGrid.replaceChildren(
      ...content.affirmations.map((affirmation, index) => createAffirmationCard(affirmation, index))
    );
  }

  function renderChosenAffirmation() {
    setText(elements.chosenAffirmation, content.affirmations[state.affirmationIndex]);
  }

  function bindNavigation() {
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href");

        if (!hash || hash === "#") {
          return;
        }

        const id = hash.slice(1);
        if (document.getElementById(id)) {
          event.preventDefault();
          scrollToId(id);
        }
      });
    });

    document.querySelectorAll("[data-scroll-target]").forEach((control) => {
      control.addEventListener("click", () => {
        const id = control.getAttribute("data-scroll-target");
        if (id) {
          scrollToId(id);
        }
      });
    });
  }

  function bindControls() {
    elements.previousStep.addEventListener("click", () => updateStep(-1));
    elements.nextStep.addEventListener("click", () => updateStep(1));
    elements.restartJourney.addEventListener("click", () => {
      state.stepIndex = 0;
      renderStep();
      scrollToId("journey");
    });

    elements.beginAgain.addEventListener("click", () => {
      state.stepIndex = 0;
      state.themeIndex = 0;
      state.affirmationIndex = 0;
      renderStep();
      renderThemes();
      renderSelectedTheme();
      renderAffirmations();
      renderChosenAffirmation();
      scrollToId("arrival");
    });

    elements.previewVisual.addEventListener("click", () => {
      const theme = content.visionThemes[state.themeIndex];
      setText(
        elements.previewNote,
        `Image Prompt: ${theme.prompt} Supportive Feeling: ${theme.supportiveFeeling}.`
      );
    });

    elements.motionToggle.addEventListener("click", () => {
      const isPaused = elements.ambientStage.dataset.motion === "paused";
      elements.ambientStage.dataset.motion = isPaused ? "playing" : "paused";
      elements.motionToggle.setAttribute("aria-pressed", String(!isPaused));
      elements.motionToggle.textContent = isPaused ? "Pause Motion" : "Resume Motion";
    });
  }

  function init() {
    bindNavigation();
    bindControls();
    renderStep();
    renderThemes();
    renderSelectedTheme();
    renderAffirmations();
    renderChosenAffirmation();
  }

  init();
})();
