(function runClarityRoom() {
  const content = window.CLARITY_ROOM_CONTENT;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    stepIndex: 0,
    themeIndex: 0,
    affirmationIndex: 0,
    motionPaused: reducedMotion,
    animationFrame: 0
  };

  const elements = {
    app: document.getElementById("app"),
    scenePanel: document.getElementById("arrival"),
    sceneWord: document.getElementById("scene-word"),
    sceneCategory: document.getElementById("scene-category"),
    ambientCanvas: document.getElementById("ambient-canvas"),
    motionToggle: document.getElementById("motion-toggle"),
    immersiveToggle: document.getElementById("immersive-toggle"),
    progress: document.getElementById("step-progress"),
    stepCategory: document.getElementById("step-category"),
    stepTitle: document.getElementById("step-title"),
    stepPrompt: document.getElementById("step-prompt"),
    stepAffirmation: document.getElementById("step-affirmation"),
    stepVisual: document.getElementById("step-visual"),
    previousStep: document.getElementById("previous-step"),
    nextStep: document.getElementById("next-step"),
    themeList: document.getElementById("theme-list"),
    activeThemeLabel: document.getElementById("active-theme-label"),
    themeName: document.getElementById("theme-name"),
    themePrompt: document.getElementById("theme-prompt"),
    themeFeeling: document.getElementById("theme-feeling"),
    previewCanvas: document.getElementById("preview-canvas"),
    affirmationList: document.getElementById("affirmation-list"),
    selectedAffirmation: document.getElementById("selected-affirmation")
  };

  function setText(element, value) {
    element.textContent = value;
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }
    section.scrollIntoView({ behavior: state.motionPaused ? "auto" : "smooth", block: "start" });
    if (section.hasAttribute("tabindex")) {
      section.focus({ preventScroll: true });
    }
  }

  function getStep() {
    return content.sessionSteps[state.stepIndex];
  }

  function getTheme() {
    return content.visionBoardThemes[state.themeIndex];
  }

  function setButtonState(container, activeIndex) {
    Array.from(container.querySelectorAll("button")).forEach((button, index) => {
      button.setAttribute("aria-pressed", String(index === activeIndex));
    });
  }

  function renderStep() {
    const step = getStep();
    setText(elements.progress, `Step ${state.stepIndex + 1} of ${content.sessionSteps.length}`);
    setText(elements.stepCategory, step.category);
    setText(elements.stepTitle, step.title);
    setText(elements.stepPrompt, step.prompt);
    setText(elements.stepAffirmation, step.affirmation);
    setText(elements.stepVisual, step.visualDirection);
    setText(elements.sceneWord, step.sceneState.word);
    setText(elements.sceneCategory, step.category);
    elements.previousStep.disabled = state.stepIndex === 0;
    elements.nextStep.textContent =
      state.stepIndex === content.sessionSteps.length - 1 ? "Finish" : "Next";
    drawAmbientScene(performance.now());
  }

  function renderThemes() {
    elements.themeList.replaceChildren();
    content.visionBoardThemes.forEach((theme, index) => {
      const button = document.createElement("button");
      const title = document.createElement("span");
      const feeling = document.createElement("span");

      button.type = "button";
      button.className = "theme-button";
      button.setAttribute("aria-label", `Choose ${theme.name}`);
      button.addEventListener("click", () => {
        state.themeIndex = index;
        renderThemePreview();
        setButtonState(elements.themeList, state.themeIndex);
      });

      title.className = "theme-title";
      title.textContent = theme.name;
      feeling.className = "theme-feeling";
      feeling.textContent = theme.supportiveFeeling;
      button.append(title, feeling);
      elements.themeList.append(button);
    });
    setButtonState(elements.themeList, state.themeIndex);
  }

  function renderThemePreview() {
    const theme = getTheme();
    setText(elements.activeThemeLabel, "Selected Theme");
    setText(elements.themeName, theme.name);
    setText(elements.themePrompt, theme.prompt);
    setText(elements.themeFeeling, theme.supportiveFeeling);
    drawThemePreview(theme);
  }

  function renderAffirmations() {
    elements.affirmationList.replaceChildren();
    content.affirmations.forEach((affirmation, index) => {
      const button = document.createElement("button");
      const text = document.createElement("span");

      button.type = "button";
      button.className = "affirmation-button";
      button.setAttribute("aria-label", "Use this affirmation");
      button.addEventListener("click", () => {
        state.affirmationIndex = index;
        renderSelectedAffirmation();
        setButtonState(elements.affirmationList, state.affirmationIndex);
      });

      text.className = "affirmation-text";
      text.textContent = affirmation;
      button.append(text);
      elements.affirmationList.append(button);
    });
    renderSelectedAffirmation();
    setButtonState(elements.affirmationList, state.affirmationIndex);
  }

  function renderSelectedAffirmation() {
    setText(elements.selectedAffirmation, content.affirmations[state.affirmationIndex]);
  }

  function setupCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const scale = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = Math.max(320, Math.floor(rect.width * scale));
    const height = Math.max(220, Math.floor(rect.height * scale));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return { ctx, width, height };
  }

  function drawAmbientScene(time) {
    const { ctx, width, height } = setupCanvas(elements.ambientCanvas);
    const step = getStep();
    const palette = step.sceneState.palette;
    const drift = state.motionPaused ? 0 : time * 0.00018;
    const gradient = ctx.createLinearGradient(0, 0, width, height);

    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(0.5, palette[1]);
    gradient.addColorStop(1, palette[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1, width * 0.002);
    for (let i = 0; i < 8; i += 1) {
      const y = height * (0.32 + i * 0.055);
      ctx.beginPath();
      for (let x = 0; x <= width; x += 16) {
        const wave = Math.sin(x * 0.007 + drift + i * 0.5) * height * 0.012;
        const curve = y + wave + Math.sin(drift * 2 + i) * height * 0.008;
        if (x === 0) {
          ctx.moveTo(x, curve);
        } else {
          ctx.lineTo(x, curve);
        }
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 0.32;
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    const horizon = height * 0.68;
    ctx.fillRect(0, horizon, width, Math.max(1, height * 0.005));

    ctx.globalAlpha = 0.24;
    ctx.strokeStyle = step.sceneState.accent;
    ctx.lineWidth = Math.max(2, width * 0.005);
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.68, width * 0.22, Math.PI, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 1;
  }

  function drawThemePreview(theme) {
    const { ctx, width, height } = setupCanvas(elements.previewCanvas);
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, theme.palette[0]);
    gradient.addColorStop(0.52, theme.palette[1]);
    gradient.addColorStop(1, theme.palette[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    if (theme.id === "soft-morning-light") {
      drawRoomLight(ctx, width, height, theme.accent);
    } else if (theme.id === "safe-garden-path") {
      drawGardenPath(ctx, width, height, theme.accent);
    } else if (theme.id === "clear-blue-horizon") {
      drawBlueHorizon(ctx, width, height, theme.accent);
    } else if (theme.id === "creative-studio") {
      drawCreativeStudio(ctx, width, height, theme.accent);
    } else if (theme.id === "floating-lanterns") {
      drawLanterns(ctx, width, height, theme.accent);
    } else {
      drawForestRoom(ctx, width, height, theme.accent);
    }
  }

  function drawRoomLight(ctx, width, height, accent) {
    ctx.fillStyle = "rgba(255, 250, 241, 0.68)";
    ctx.fillRect(width * 0.1, height * 0.18, width * 0.32, height * 0.52);
    ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
    ctx.fillRect(width * 0.14, height * 0.23, width * 0.1, height * 0.38);
    ctx.fillRect(width * 0.28, height * 0.23, width * 0.1, height * 0.38);
    ctx.fillStyle = "rgba(21, 33, 31, 0.16)";
    ctx.fillRect(width * 0.55, height * 0.55, width * 0.28, height * 0.1);
    ctx.strokeStyle = accent;
    ctx.lineWidth = width * 0.012;
    ctx.beginPath();
    ctx.moveTo(width * 0.52, height * 0.74);
    ctx.quadraticCurveTo(width * 0.66, height * 0.62, width * 0.86, height * 0.73);
    ctx.stroke();
  }

  function drawGardenPath(ctx, width, height, accent) {
    ctx.fillStyle = "rgba(255, 250, 241, 0.7)";
    ctx.beginPath();
    ctx.moveTo(width * 0.45, height);
    ctx.quadraticCurveTo(width * 0.52, height * 0.62, width * 0.5, height * 0.38);
    ctx.quadraticCurveTo(width * 0.52, height * 0.62, width * 0.62, height);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = width * 0.006;
    for (let i = 0; i < 7; i += 1) {
      const x = width * (0.16 + i * 0.11);
      const y = height * (0.62 + (i % 2) * 0.1);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width * 0.025, y - height * 0.085);
      ctx.stroke();
      ctx.fillStyle = i % 2 ? "#e0b85f" : "#d77555";
      ctx.beginPath();
      ctx.arc(x + width * 0.027, y - height * 0.09, width * 0.012, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawBlueHorizon(ctx, width, height, accent) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.fillRect(0, height * 0.48, width, height * 0.012);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.64)";
    ctx.lineWidth = width * 0.006;
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      const y = height * (0.58 + i * 0.05);
      ctx.moveTo(width * 0.12, y);
      ctx.bezierCurveTo(width * 0.32, y - 16, width * 0.52, y + 18, width * 0.86, y);
      ctx.stroke();
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = width * 0.012;
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.36);
    ctx.lineTo(width * 0.62, height * 0.48);
    ctx.lineTo(width * 0.5, height * 0.6);
    ctx.stroke();
  }

  function drawCreativeStudio(ctx, width, height, accent) {
    ctx.fillStyle = "rgba(255, 250, 241, 0.82)";
    roundedRect(ctx, width * 0.16, height * 0.28, width * 0.28, height * 0.36, 10);
    ctx.fillStyle = "rgba(255, 255, 255, 0.76)";
    roundedRect(ctx, width * 0.5, height * 0.22, width * 0.28, height * 0.42, 10);
    ctx.strokeStyle = accent;
    ctx.lineWidth = width * 0.009;
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.74);
    ctx.lineTo(width * 0.8, height * 0.74);
    ctx.stroke();
    ["#d77555", "#e0b85f", "#247b78", "#7fb4d8"].forEach((color, index) => {
      ctx.fillStyle = color;
      roundedRect(ctx, width * (0.2 + index * 0.12), height * 0.68, width * 0.07, height * 0.06, 6);
    });
  }

  function drawLanterns(ctx, width, height, accent) {
    ctx.strokeStyle = "rgba(255, 250, 241, 0.55)";
    ctx.lineWidth = width * 0.004;
    for (let i = 0; i < 6; i += 1) {
      const x = width * (0.18 + i * 0.13);
      const y = height * (0.24 + (i % 3) * 0.12);
      ctx.beginPath();
      ctx.moveTo(x, y - height * 0.12);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = i % 2 ? "#e0b85f" : "#fff3da";
      roundedRect(ctx, x - width * 0.035, y, width * 0.07, height * 0.12, 8);
      ctx.strokeStyle = accent;
      ctx.strokeRect(x - width * 0.035, y, width * 0.07, height * 0.12);
      ctx.strokeStyle = "rgba(255, 250, 241, 0.55)";
    }
  }

  function drawForestRoom(ctx, width, height, accent) {
    ctx.fillStyle = "rgba(255, 250, 241, 0.72)";
    roundedRect(ctx, width * 0.16, height * 0.2, width * 0.68, height * 0.52, 10);
    ctx.fillStyle = "rgba(79, 107, 78, 0.32)";
    for (let i = 0; i < 8; i += 1) {
      const x = width * (0.2 + i * 0.08);
      ctx.fillRect(x, height * 0.18, width * 0.018, height * 0.52);
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = width * 0.009;
    ctx.strokeRect(width * 0.16, height * 0.2, width * 0.68, height * 0.52);
    ctx.fillStyle = "rgba(255, 250, 241, 0.88)";
    ctx.fillRect(width * 0.24, height * 0.66, width * 0.52, height * 0.12);
  }

  function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  function animate(time) {
    drawAmbientScene(time);
    if (!state.motionPaused) {
      state.animationFrame = window.requestAnimationFrame(animate);
    }
  }

  function setMotionPaused(paused) {
    state.motionPaused = paused;
    document.body.classList.toggle("motion-paused", paused);
    elements.motionToggle.textContent = paused ? "Resume Motion" : "Pause Motion";
    elements.motionToggle.setAttribute("aria-pressed", String(paused));
    window.cancelAnimationFrame(state.animationFrame);
    drawAmbientScene(performance.now());
    if (!paused) {
      state.animationFrame = window.requestAnimationFrame(animate);
    }
  }

  async function toggleImmersiveView() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (elements.scenePanel.requestFullscreen) {
        await elements.scenePanel.requestFullscreen();
      }
    } catch (error) {
      setText(elements.sceneCategory, "Preview stays in this browser");
    }
  }

  function bindEvents() {
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        scrollToSection(button.getAttribute("data-scroll-target"));
      });
    });

    document.querySelector("[data-start-journey]").addEventListener("click", () => {
      state.stepIndex = 0;
      renderStep();
      scrollToSection("journey");
    });

    document.querySelector("[data-begin-again]").addEventListener("click", () => {
      state.stepIndex = 0;
      state.affirmationIndex = 0;
      renderStep();
      renderSelectedAffirmation();
      setButtonState(elements.affirmationList, state.affirmationIndex);
      scrollToSection("arrival");
    });

    elements.previousStep.addEventListener("click", () => {
      state.stepIndex = Math.max(0, state.stepIndex - 1);
      renderStep();
    });

    elements.nextStep.addEventListener("click", () => {
      if (state.stepIndex === content.sessionSteps.length - 1) {
        scrollToSection("closing");
        return;
      }
      state.stepIndex += 1;
      renderStep();
    });

    elements.motionToggle.addEventListener("click", () => {
      setMotionPaused(!state.motionPaused);
    });

    elements.immersiveToggle.addEventListener("click", toggleImmersiveView);

    document.addEventListener("fullscreenchange", () => {
      elements.immersiveToggle.textContent = document.fullscreenElement
        ? "Exit Immersive View"
        : "Enter Immersive View";
      elements.immersiveToggle.setAttribute("aria-pressed", String(Boolean(document.fullscreenElement)));
    });

    window.addEventListener("resize", () => {
      drawAmbientScene(performance.now());
      drawThemePreview(getTheme());
    });
  }

  function init() {
    renderThemes();
    renderAffirmations();
    renderThemePreview();
    renderStep();
    bindEvents();
    setMotionPaused(state.motionPaused);
  }

  init();
})();
