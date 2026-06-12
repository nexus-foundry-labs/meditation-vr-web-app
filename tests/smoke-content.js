const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "src", "content.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const data = sandbox.window.CLARITY_ROOM_CONTENT;
const ACCEPTANCE_REQUIREMENTS_JSON = Object.freeze({
  minGuidedSteps: 8,
  minVisionBoardThemes: 6,
  minAffirmations: 6,
  requiredStepFields: ["id", "title", "category", "prompt", "affirmation", "visualDirection", "sceneState"],
  requiredThemeFields: ["id", "name", "prompt", "supportiveFeeling"],
  requiredTerms: ["calm", "safety", "clarity", "creative"]
});

const blockedTerms = [
  ["lorem", " ipsum"].join(""),
  ["TO", "DO"].join(""),
  ["coming", " soon"].join(""),
  ["place", "holder"].join(""),
  ["here", " could be"].join(""),
  ["dum", "my"].join(""),
  ["fill", "er"].join(""),
  ["under", " construction"].join("")
];

assert.ok(data, "structured content is exposed");
assert.ok(
  data.sessionSteps.length >= ACCEPTANCE_REQUIREMENTS_JSON.minGuidedSteps,
  "guided step count meets the minimum"
);
assert.ok(
  data.visionBoardThemes.length >= ACCEPTANCE_REQUIREMENTS_JSON.minVisionBoardThemes,
  "vision-board theme count meets the minimum"
);
assert.ok(
  data.affirmations.length >= ACCEPTANCE_REQUIREMENTS_JSON.minAffirmations,
  "affirmation count meets the minimum"
);

data.sessionSteps.forEach((step) => {
  ACCEPTANCE_REQUIREMENTS_JSON.requiredStepFields.forEach((field) => {
    assert.ok(step[field], `guided step includes ${field}`);
  });
});

data.visionBoardThemes.forEach((theme) => {
  ACCEPTANCE_REQUIREMENTS_JSON.requiredThemeFields.forEach((field) => {
    assert.ok(theme[field], `vision-board theme includes ${field}`);
  });
});

const contentText = JSON.stringify(data).toLowerCase();
ACCEPTANCE_REQUIREMENTS_JSON.requiredTerms.forEach((term) => {
  assert.ok(contentText.includes(term), `required term appears: ${term}`);
});

const implementationFiles = ["index.html", "styles.css", "README.md", "src/content.js", "src/app.js"];
const implementationText = implementationFiles
  .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n")
  .toLowerCase();

blockedTerms.forEach((term) => {
  assert.ok(!implementationText.includes(term.toLowerCase()), `blocked phrase is absent: ${term}`);
});

const appSource = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
assert.ok(!/window\.location|parent\.|top\./.test(appSource), "controls stay inside the app preview");

const htmlSource = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.ok(htmlSource.includes('type="button"'), "visible controls use non-submit buttons");

console.log("Smoke checks passed for Clarity Room content and preview safety.");
