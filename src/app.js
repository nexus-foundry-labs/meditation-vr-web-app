(function runClarityRoom() {
  "use strict";

  const content = window.CLARITY_ROOM_CONTENT;
  const OPENAI_BASE_URL = "https://api.openai.com/v1";
  const STORAGE_KEYS = {
    providerKey: "clarityRoom.providerKey",
    selectedStep: "clarityRoom.selectedStep",
    selectedTheme: "clarityRoom.selectedTheme",
    selectedAffirmation: "clarityRoom.selectedAffirmation",
    generatedVisual: "clarityRoom.generatedVisual",
    carryWord: "clarityRoom.carryWord",
    motionPaused: "clarityRoom.motionPaused"
  };

  const state = {
    stepIndex: readNumber(STORAGE_KEYS.selectedStep, 0),
    themeId: localStorage.getItem(STORAGE_KEYS.selectedTheme),
    affirmationIndex: readNumber(STORAGE_KEYS.selectedAffirmation, 0),
    motionPaused: localStorage.getItem(STORAGE_KEYS.motionPaused) === "true",
    pendingGenerate: false
  };

  const elements = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    bindNavigation();
    bindActions();
    bindForms();
    applyMotionState();
    hydrateProviderState();
    renderAll();
  }

  function cacheElements() {
    elements.navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
    elements.journeyLoading = document.getElementById("journey-loading");
    elements.journeyEmpty = document.getElementById("journey-empty");
    elements.journeyError = document.getElementById("journey-error");
    elements.journeyExperience = document.getElementById("journey-experience");
    elements.stepCategory = document.getElementById("step-category");
    elements.stepTitle = document.getElementById("step-title");
    elements.stepPrompt = document.getElementById("step-prompt");
    elements.stepAffirmation = document.getElementById("step-affirmation");
    elements.stepVisual = document.getElementById("step-visual");
    elements.stepProgress = document.getElementById("step-progress");
    elements.stepProgressBar = document.getElementById("step-progress-bar");
    elements.motionToggle = document.querySelector('[data-action="toggle-motion"]');

    elements.visionLoading = document.getElementById("vision-loading");
    elements.visionEmpty = document.getElementById("vision-empty");
    elements.visionError = document.getElementById("vision-error");
    elements.visionContent = document.getElementById("vision-content");
    elements.themeList = document.getElementById("theme-list");
    elements.themeName = document.getElementById("theme-name");
    elements.themePrompt = document.getElementById("theme-prompt");
    elements.themeFeeling = document.getElementById("theme-feeling");
    elements.themeImagePrompt = document.getElementById("theme-image-prompt");
    elements.themePreviewUnits = document.getElementById("theme-preview-units");
    elements.aiRequired = document.getElementById("ai-required");
    elements.generatedLoading = document.getElementById("generated-loading");
    elements.generatedEmpty = document.getElementById("generated-empty");
    elements.generatedOutput = document.getElementById("generated-output");
    elements.generatedImage = document.getElementById("generated-image");
    elements.generatedCaption = document.getElementById("generated-caption");
    elements.aiError = document.getElementById("ai-error");
    elements.aiErrorTitle = document.getElementById("ai-error-title");
    elements.aiErrorMessage = document.getElementById("ai-error-message");

    elements.providerForm = document.getElementById("provider-form");
    elements.providerKey = document.getElementById("provider-key");
    elements.providerStatus = document.getElementById("provider-status");

    elements.affirmationsLoading = document.getElementById("affirmations-loading");
    elements.affirmationsEmpty = document.getElementById("affirmations-empty");
    elements.affirmationsError = document.getElementById("affirmations-error");
    elements.affirmationContent = document.getElementById("affirmation-content");
    elements.affirmationList = document.getElementById("affirmation-list");
    elements.selectedAffirmation = document.getElementById("selected-affirmation");

    elements.closingForm = document.getElementById("closing-form");
    elements.carryWord = document.getElementById("carry-word");
    elements.carryError = document.getElementById("carry-error");
    elements.savedWord = document.getElementById("saved-word");
  }

  function bindNavigation() {
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        scrollToSection(link.getAttribute("href"));
      });
    });
  }

  function bindActions() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      event.preventDefault();

      const action = button.getAttribute("data-action");
      const actionMap = {
        "begin-journey": () => {
          setStep(0);
          scrollToSection("#journey");
        },
        "preview-themes": () => scrollToSection("#vision-board"),
        "previous-step": () => setStep(state.stepIndex - 1),
        "next-step": () => setStep(state.stepIndex + 1),
        "restart-journey": () => {
          setStep(0);
          scrollToSection("#journey");
        },
        "toggle-motion": toggleMotion,
        "generate-visual": generateVisual,
        "retry-generate": generateVisual,
        "go-provider": () => scrollToSection("#connect-provider"),
        "forget-key": forgetProviderKey,
        "begin-again": () => {
          setStep(0);
          scrollToSection("#arrival");
        },
        "return-vision": () => scrollToSection("#vision-board")
      };

      if (actionMap[action]) {
        actionMap[action]();
      }
    });
  }

  function bindForms() {
    elements.providerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      testProviderConnection();
    });

    elements.closingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveCarryWord();
    });
  }

  function renderAll() {
    renderJourney();
    renderVisionBoard();
    renderAffirmations();
    renderSavedCarryWord();
    restoreGeneratedVisual();
  }

  function renderJourney() {
    try {
      const steps = Array.isArray(content.sessionSteps) ? content.sessionSteps : [];
      elements.journeyLoading.hidden = true;
      elements.journeyError.hidden = true;

      if (!steps.length) {
        elements.journeyEmpty.hidden = false;
        elements.journeyExperience.hidden = true;
        return;
      }

      elements.journeyEmpty.hidden = true;
      elements.journeyExperience.hidden = false;
      state.stepIndex = clamp(state.stepIndex, 0, steps.length - 1);

      const step = steps[state.stepIndex];
      setText(elements.stepCategory, step.category);
      setText(elements.stepTitle, step.title);
      setText(elements.stepPrompt, step.prompt);
      setText(elements.stepAffirmation, step.affirmation);
      setText(elements.stepVisual, step.visualDirection);
      setText(elements.stepProgress, `Step ${state.stepIndex + 1} of ${steps.length}`);
      elements.stepProgressBar.style.width = `${((state.stepIndex + 1) / steps.length) * 100}%`;
    } catch (error) {
      elements.journeyLoading.hidden = true;
      elements.journeyExperience.hidden = true;
      elements.journeyError.hidden = false;
    }
  }

  function renderVisionBoard() {
    try {
      const themes = Array.isArray(content.visionThemes) ? content.visionThemes : [];
      elements.visionLoading.hidden = true;
      elements.visionError.hidden = true;

      if (!themes.length) {
        elements.visionEmpty.hidden = false;
        elements.visionContent.hidden = true;
        return;
      }

      if (!state.themeId || !themes.some((theme) => theme.id === state.themeId)) {
        state.themeId = themes[0].id;
      }

      elements.visionEmpty.hidden = true;
      elements.visionContent.hidden = false;
      renderThemeButtons(themes);
      renderSelectedTheme();
    } catch (error) {
      elements.visionLoading.hidden = true;
      elements.visionContent.hidden = true;
      elements.visionError.hidden = false;
    }
  }

  function renderThemeButtons(themes) {
    elements.themeList.replaceChildren();
    const fragment = document.createDocumentFragment();

    themes.forEach((theme) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "theme-card";
      button.setAttribute("aria-pressed", String(theme.id === state.themeId));
      button.addEventListener("click", () => {
        state.themeId = theme.id;
        localStorage.setItem(STORAGE_KEYS.selectedTheme, state.themeId);
        hideAiTransientStates();
        renderVisionBoard();
      });

      const name = document.createElement("strong");
      name.textContent = `Choose ${theme.name}`;
      const feeling = document.createElement("span");
      feeling.textContent = theme.supportiveFeeling;
      const swatches = document.createElement("div");
      swatches.className = "swatches";
      swatches.setAttribute("aria-hidden", "true");

      theme.palette.forEach((color) => {
        const swatch = document.createElement("i");
        swatch.style.backgroundColor = color;
        swatches.append(swatch);
      });

      button.append(name, feeling, swatches);
      fragment.append(button);
    });

    elements.themeList.append(fragment);
  }

  function renderSelectedTheme() {
    const theme = getSelectedTheme();
    if (!theme) return;

    setText(elements.themeName, theme.name);
    setText(elements.themePrompt, theme.prompt);
    setText(elements.themeFeeling, theme.supportiveFeeling);
    setText(elements.themeImagePrompt, theme.imagePrompt);
    elements.themePreviewUnits.replaceChildren();

    theme.previewUnits.forEach((unit) => {
      const item = document.createElement("li");
      item.textContent = unit;
      elements.themePreviewUnits.append(item);
    });
  }

  function renderAffirmations() {
    try {
      const affirmations = Array.isArray(content.affirmations) ? content.affirmations : [];
      elements.affirmationsLoading.hidden = true;
      elements.affirmationsError.hidden = true;

      if (!affirmations.length) {
        elements.affirmationsEmpty.hidden = false;
        elements.affirmationContent.hidden = true;
        return;
      }

      elements.affirmationsEmpty.hidden = true;
      elements.affirmationContent.hidden = false;
      state.affirmationIndex = clamp(state.affirmationIndex, 0, affirmations.length - 1);
      elements.affirmationList.replaceChildren();

      affirmations.forEach((affirmation, index) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "affirmation-card";
        card.setAttribute("aria-pressed", String(index === state.affirmationIndex));
        card.addEventListener("click", () => selectAffirmation(index));

        const text = document.createElement("strong");
        text.textContent = affirmation;
        const action = document.createElement("span");
        action.textContent = "Use this affirmation";
        card.append(text, action);
        elements.affirmationList.append(card);
      });

      setText(elements.selectedAffirmation, `Selected affirmation: ${affirmations[state.affirmationIndex]}`);
    } catch (error) {
      elements.affirmationsLoading.hidden = true;
      elements.affirmationContent.hidden = true;
      elements.affirmationsError.hidden = false;
    }
  }

  function selectAffirmation(index) {
    state.affirmationIndex = clamp(index, 0, content.affirmations.length - 1);
    localStorage.setItem(STORAGE_KEYS.selectedAffirmation, String(state.affirmationIndex));
    renderAffirmations();
    scrollToSection("#closing", { behavior: "smooth", block: "start" });
  }

  function setStep(index) {
    state.stepIndex = clamp(index, 0, content.sessionSteps.length - 1);
    localStorage.setItem(STORAGE_KEYS.selectedStep, String(state.stepIndex));
    renderJourney();

    if (state.stepIndex === content.sessionSteps.length - 1) {
      scrollToSection("#closing");
    }
  }

  function toggleMotion() {
    state.motionPaused = !state.motionPaused;
    localStorage.setItem(STORAGE_KEYS.motionPaused, String(state.motionPaused));
    applyMotionState();
  }

  function applyMotionState() {
    document.body.classList.toggle("motion-paused", state.motionPaused);
    if (elements.motionToggle) {
      elements.motionToggle.textContent = state.motionPaused ? "Resume Motion" : "Pause Motion";
    }
  }

  function hydrateProviderState() {
    const savedKey = getProviderKey();
    if (savedKey) {
      elements.providerKey.value = maskProviderKey(savedKey);
      setProviderStatus("Provider key is saved locally. Test the connection before generating.", "success");
    }
  }

  async function testProviderConnection() {
    const rawValue = elements.providerKey.value.trim();
    const existingKey = getProviderKey();
    const key = rawValue.includes("...") ? existingKey : rawValue;

    if (!key) {
      setProviderStatus("Enter a provider key before testing the connection.", "error");
      elements.providerKey.focus();
      return;
    }

    setProviderStatus("Testing provider connection...", "");
    setProviderFormDisabled(true);

    try {
      const response = await fetch(`${OPENAI_BASE_URL}/models`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`
        }
      });

      if (!response.ok) {
        throw createProviderError(response.status);
      }

      localStorage.setItem(STORAGE_KEYS.providerKey, key);
      elements.providerKey.value = maskProviderKey(key);
      setProviderStatus("Connection tested. You can generate a reflection visual.", "success");
    } catch (error) {
      setProviderStatus(formatProviderError(error), "error");
    } finally {
      setProviderFormDisabled(false);
    }
  }

  function forgetProviderKey() {
    localStorage.removeItem(STORAGE_KEYS.providerKey);
    elements.providerKey.value = "";
    setProviderStatus("No provider key is connected.", "");
    elements.providerKey.focus();
  }

  async function generateVisual() {
    if (state.pendingGenerate) return;

    const key = getProviderKey();
    if (!key) {
      showAiRequired();
      return;
    }

    const theme = getSelectedTheme();
    if (!theme) {
      showAiError("Choose a visual theme before generating.", "Return to the vision themes and try again.");
      return;
    }

    state.pendingGenerate = true;
    setGenerateButtonsDisabled(true);
    showGeneratedLoading();

    try {
      const response = await fetch(`${OPENAI_BASE_URL}/images/generations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt: buildGenerationPrompt(theme),
          size: "1024x1024",
          quality: "medium",
          output_format: "png"
        })
      });

      if (!response.ok) {
        throw createProviderError(response.status);
      }

      const payload = await response.json();
      const firstImage = payload && payload.data && payload.data[0];
      const source = firstImage && firstImage.b64_json
        ? `data:image/png;base64,${firstImage.b64_json}`
        : firstImage && firstImage.url;

      if (!source) {
        throw new Error("No image returned by provider.");
      }

      showGeneratedImage(source, theme.name);
      persistGeneratedVisual({ source, themeName: theme.name, createdAt: new Date().toISOString() });
    } catch (error) {
      showAiError("The visual could not be created.", formatProviderError(error));
    } finally {
      state.pendingGenerate = false;
      setGenerateButtonsDisabled(false);
    }
  }

  function buildGenerationPrompt(theme) {
    return [
      theme.imagePrompt,
      "Style: soft luminous meditation visualization, warm ivory, mist green, sage, pale sky blue, soft lavender, dawn peach, muted teal, gentle gold light.",
      "Composition: square calming vision-board artwork, no people, no brand marks, no text in the image.",
      "Safety: avoid medical symbols, diagnosis cues, intense memories, religious symbols, harsh contrast, and dark psychedelic visuals."
    ].join(" ");
  }

  function showAiRequired() {
    elements.aiRequired.hidden = false;
    elements.generatedLoading.hidden = true;
    elements.aiError.hidden = true;
    elements.generatedOutput.hidden = true;
    elements.generatedEmpty.hidden = true;
  }

  function showGeneratedLoading() {
    elements.aiRequired.hidden = true;
    elements.generatedLoading.hidden = false;
    elements.aiError.hidden = true;
    elements.generatedOutput.hidden = true;
    elements.generatedEmpty.hidden = true;
  }

  function showGeneratedImage(source, themeName) {
    elements.aiRequired.hidden = true;
    elements.generatedLoading.hidden = true;
    elements.aiError.hidden = true;
    elements.generatedEmpty.hidden = true;
    elements.generatedImage.src = source;
    elements.generatedImage.alt = `Generated calming visualization for ${themeName}.`;
    elements.generatedCaption.textContent = `Visualization Preview - ${themeName}`;
    elements.generatedOutput.hidden = false;
  }

  function showAiError(title, message) {
    elements.aiRequired.hidden = true;
    elements.generatedLoading.hidden = true;
    elements.generatedOutput.hidden = true;
    elements.generatedEmpty.hidden = true;
    elements.aiErrorTitle.textContent = title;
    elements.aiErrorMessage.textContent = message;
    elements.aiError.hidden = false;
  }

  function hideAiTransientStates() {
    elements.aiRequired.hidden = true;
    elements.generatedLoading.hidden = true;
    elements.aiError.hidden = true;
    restoreGeneratedVisual();
  }

  function persistGeneratedVisual(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.generatedVisual, JSON.stringify(data));
    } catch (error) {
      elements.generatedCaption.textContent = `${elements.generatedCaption.textContent}. Created for this session.`;
    }
  }

  function restoreGeneratedVisual() {
    const stored = localStorage.getItem(STORAGE_KEYS.generatedVisual);
    if (!stored) {
      elements.generatedOutput.hidden = true;
      elements.generatedEmpty.hidden = false;
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (parsed.source && parsed.themeName) {
        showGeneratedImage(parsed.source, parsed.themeName);
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.generatedVisual);
      elements.generatedOutput.hidden = true;
      elements.generatedEmpty.hidden = false;
    }
  }

  function saveCarryWord() {
    const value = elements.carryWord.value.trim();
    elements.carryError.hidden = true;

    if (value.length > 40) {
      elements.carryError.hidden = false;
      elements.carryWord.focus();
      return;
    }

    localStorage.setItem(STORAGE_KEYS.carryWord, value);
    renderSavedCarryWord();
  }

  function renderSavedCarryWord() {
    const saved = localStorage.getItem(STORAGE_KEYS.carryWord) || "";
    elements.carryWord.value = saved;
    elements.savedWord.textContent = saved
      ? `Saved for this browser: ${saved}`
      : "Your chosen word, image, or feeling can stay here for your next visit.";
  }

  function getSelectedTheme() {
    return content.visionThemes.find((theme) => theme.id === state.themeId) || content.visionThemes[0];
  }

  function getProviderKey() {
    return localStorage.getItem(STORAGE_KEYS.providerKey) || "";
  }

  function setProviderStatus(message, tone) {
    elements.providerStatus.textContent = message;
    if (tone) {
      elements.providerStatus.dataset.tone = tone;
    } else {
      delete elements.providerStatus.dataset.tone;
    }
  }

  function setProviderFormDisabled(disabled) {
    elements.providerForm.querySelectorAll("button, input").forEach((control) => {
      control.disabled = disabled;
    });
  }

  function setGenerateButtonsDisabled(disabled) {
    document.querySelectorAll('[data-action="generate-visual"], [data-action="retry-generate"]').forEach((button) => {
      button.disabled = disabled;
    });
  }

  function createProviderError(status) {
    const error = new Error(`Provider request failed with status ${status}.`);
    error.status = status;
    return error;
  }

  function formatProviderError(error) {
    if (error && error.status === 401) {
      return "The key was not accepted. Check the saved key and try again.";
    }
    if (error && error.status === 429) {
      return "The provider is rate-limited right now. Wait a moment, then retry.";
    }
    if (error && error.status >= 500) {
      return "The provider is unavailable right now. Try again in a moment.";
    }
    if (error && error.message === "No image returned by provider.") {
      return "The provider responded without an image. Retry or review the connection.";
    }
    return "A network or provider error occurred. Retry or review the connection.";
  }

  function maskProviderKey(key) {
    if (key.length <= 10) {
      return "saved-key";
    }
    return `${key.slice(0, 7)}...${key.slice(-4)}`;
  }

  function setText(element, value) {
    element.textContent = value || "";
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function readNumber(key, fallback) {
    const parsed = Number.parseInt(localStorage.getItem(key), 10);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function scrollToSection(selector, options) {
    const section = document.querySelector(selector);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      ...(options || {})
    });

    history.replaceState(null, "", selector);
    updateCurrentNav(selector);
  }

  function updateCurrentNav(selector) {
    elements.navLinks.forEach((link) => {
      link.toggleAttribute("aria-current", link.getAttribute("href") === selector);
    });
  }
})();
