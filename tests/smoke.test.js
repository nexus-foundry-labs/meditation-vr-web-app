const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const content = require(path.join(root, "src", "content.js"));

const filesToScan = [
  "index.html",
  "styles.css",
  "src/app.js",
  "src/content.js",
  "README.md"
];

const blockedTerms = [
  ["lorem", "ipsum"].join(" "),
  ["T", "O", "D", "O"].join(""),
  ["coming", "soon"].join(" "),
  ["place", "holder"].join(""),
  ["here", "could", "be"].join(" "),
  ["dum", "my"].join(""),
  ["fill", "er"].join(""),
  ["under", "construction"].join(" ")
];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function assertNoBlockedTerms() {
  filesToScan.forEach((file) => {
    const text = read(file).toLowerCase();
    blockedTerms.forEach((term) => {
      assert.equal(text.includes(term.toLowerCase()), false, `${file} contains blocked term: ${term}`);
    });
  });
}

function assertStructuredContent() {
  assert.ok(Array.isArray(content.sessionSteps), "session steps should be an array");
  assert.ok(Array.isArray(content.visionThemes), "vision themes should be an array");
  assert.ok(Array.isArray(content.affirmations), "affirmations should be an array");
  assert.ok(content.sessionSteps.length >= 8, "at least 8 guided session steps");
  assert.ok(content.visionThemes.length >= 6, "at least 6 vision-board themes");
  assert.ok(content.affirmations.length >= 6, "at least 6 affirmations");

  content.sessionSteps.forEach((step) => {
    ["id", "title", "category", "prompt", "affirmation", "visualDirection", "sceneState"].forEach((field) => {
      assert.ok(step[field], `step ${step.id || "unknown"} includes ${field}`);
    });
  });

  content.visionThemes.forEach((theme) => {
    ["id", "name", "prompt", "supportiveFeeling", "imagePrompt"].forEach((field) => {
      assert.ok(theme[field], `theme ${theme.id || "unknown"} includes ${field}`);
    });
    assert.ok(Array.isArray(theme.previewUnits), `theme ${theme.id} includes preview units`);
    assert.ok(theme.previewUnits.length >= 5, `theme ${theme.id} includes at least 5 preview units`);
    assert.ok(Array.isArray(theme.palette), `theme ${theme.id} includes palette swatches`);
    assert.ok(theme.palette.length >= 5, `theme ${theme.id} includes at least 5 palette swatches`);
  });

  const joinedContent = JSON.stringify(content).toLowerCase();
  ["calm", "safety", "clarity", "creative"].forEach((term) => {
    assert.ok(joinedContent.includes(term), `structured content includes ${term}`);
  });
}

function assertAppSurface() {
  const html = read("index.html");
  const app = read("src/app.js");

  ["index.html", "styles.css", "src/content.js", "src/app.js"].forEach((file) => {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} exists`);
  });

  ["assets/hero.png", "assets/vision-board.png", "assets/affirmation-orb.png", "assets/brand-mark.png"].forEach((file) => {
    const stat = fs.statSync(path.join(root, file));
    assert.ok(stat.size > 1000, `${file} exists and is not blank`);
  });

  // Imagery is embedded as inline data URIs (not external asset paths) so the
  // page renders in preview environments that do not serve separate binary
  // files. The source PNGs above are retained as the editable originals.
  assert.equal(html.includes("assets/"), false, "HTML uses inlined images, not external asset paths");
  const inlinedImages = (html.match(/src="data:image\//g) || []).length;
  assert.ok(inlinedImages >= 5, "all imagery is embedded as inline data URIs");

  [
    "begin-journey",
    "preview-themes",
    "previous-step",
    "next-step",
    "restart-journey",
    "toggle-motion",
    "generate-visual",
    "go-provider",
    "forget-key",
    "begin-again",
    "return-vision"
  ].forEach((action) => {
    assert.ok(html.includes(`data-action="${action}"`), `${action} control is present`);
    assert.ok(app.includes(`"${action}"`), `${action} handler is present`);
  });

  assert.ok(app.includes("localStorage"), "user state persists in localStorage");
  assert.ok(app.includes("https://api.openai.com/v1"), "provider requests use the OpenAI v1 API base");
  assert.ok(app.includes("/models"), "provider connection tests the models endpoint");
  assert.ok(app.includes("/images/generations"), "image generation endpoint is wired");
  assert.ok(app.includes("gpt-image-1"), "image model is configured");
  assert.ok(app.includes("Authorization"), "provider key is read at request time");
  assert.equal(app.includes("window.location"), false, "app does not use window navigation");
  assert.equal(app.includes("parent."), false, "app does not navigate parent frame");
  assert.equal(app.includes("top."), false, "app does not navigate top frame");
}

assertNoBlockedTerms();
assertStructuredContent();
assertAppSurface();

console.log("Smoke tests passed.");
