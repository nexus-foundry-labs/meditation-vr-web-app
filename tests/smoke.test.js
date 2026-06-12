const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const content = require("../src/data.js");

const filesToScan = [
  "README.md",
  "index.html",
  "styles.css",
  "src/data.js",
  "src/app.js",
  "package.json"
];

const requiredTerms = ["calm", "safety", "clarity", "creative"];
const disallowedTerms = [
  "lorem ipsum",
  "todo",
  "coming soon",
  "placeholder",
  "here could be",
  "dummy",
  "filler",
  "under construction"
];

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assertNoPlaceholderLanguage() {
  for (const file of filesToScan) {
    const text = readProjectFile(file).toLowerCase();
    for (const term of disallowedTerms) {
      assert.equal(
        text.includes(term),
        false,
        `${file} must not include disallowed placeholder term: ${term}`
      );
    }
  }
}

function assertStructuredContent() {
  assert.equal(content.guidedSteps.length, 8, "guided session must include exactly 8 first-demo steps");
  assert.equal(content.visionThemes.length, 6, "vision board must include exactly 6 first-demo themes");
  assert.equal(content.affirmations.length, 10, "affirmation bank must include all 10 scripted affirmations");

  assert.deepEqual(
    content.guidedSteps.map((step) => step.title),
    [
      "Arrive Gently",
      "Notice What Holds You",
      "Make Space to Breathe",
      "Nothing to Force",
      "A Clear Inner Canvas",
      "Let One Image Come Forward",
      "Shape the Feeling",
      "Take One Thing With You"
    ],
    "guided steps must match the first-session script"
  );

  assert.deepEqual(
    content.visionThemes.map((theme) => theme.name),
    [
      "Soft Morning Light",
      "Safe Garden Path",
      "Clear Blue Horizon",
      "Creative Studio",
      "Floating Lanterns",
      "Quiet Forest Room"
    ],
    "vision-board themes must match the first-demo theme set"
  );

  for (const step of content.guidedSteps) {
    assert.ok(step.id, "guided step needs an id");
    assert.ok(step.title, `guided step ${step.id} needs a title`);
    assert.ok(step.category, `guided step ${step.id} needs a category`);
    assert.ok(step.prompt, `guided step ${step.id} needs a prompt`);
    assert.ok(step.affirmation, `guided step ${step.id} needs an affirmation`);
    assert.ok(step.visualDirection, `guided step ${step.id} needs a visual direction`);
    assert.ok(step.ambientSceneState, `guided step ${step.id} needs an ambient scene state`);
  }

  for (const theme of content.visionThemes) {
    assert.ok(theme.name, `vision theme ${theme.id} needs a name`);
    assert.ok(theme.prompt, `vision theme ${theme.id} needs a prompt`);
    assert.ok(theme.supportiveFeeling, `vision theme ${theme.id} needs a supportive feeling`);
  }

  const combinedContent = JSON.stringify(content).toLowerCase();
  for (const term of requiredTerms) {
    assert.ok(combinedContent.includes(term), `structured content must include required term: ${term}`);
  }
}

function assertPreviewSafeImplementation() {
  const html = readProjectFile("index.html");
  const app = readProjectFile("src/app.js");

  assert.equal(app.includes("window.location"), false, "app must not use window.location navigation");
  assert.equal(app.includes("parent."), false, "app must not navigate the parent frame");
  assert.equal(app.includes("top."), false, "app must not navigate the top frame");
  assert.equal(app.includes(".innerHTML"), false, "dynamic rendering should avoid innerHTML");
  assert.ok(app.includes("scrollIntoView"), "in-app controls should use scrollIntoView");

  const scriptSources = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  for (const source of scriptSources) {
    assert.equal(/^https?:\/\//.test(source), false, `external scripts are not expected: ${source}`);
  }

  const buttonMatches = html.match(/<button\b[^>]*>/g) || [];
  assert.ok(buttonMatches.length >= 8, "preview should include working button controls");
  for (const button of buttonMatches) {
    assert.ok(/type="button"/.test(button), `button must be non-submit for preview safety: ${button}`);
  }
}

function assertAssetsExist() {
  for (const asset of ["assets/hero.png", "assets/vision-board.png", "assets/affirmation-orb.png"]) {
    const absolutePath = path.join(root, asset);
    assert.ok(fs.existsSync(absolutePath), `${asset} must exist`);
    assert.ok(fs.statSync(absolutePath).size > 1000, `${asset} must not be empty`);
  }
}

assertStructuredContent();
assertNoPlaceholderLanguage();
assertPreviewSafeImplementation();
assertAssetsExist();

console.log("Smoke test passed: content, preview safety, assets, and required terms verified.");
