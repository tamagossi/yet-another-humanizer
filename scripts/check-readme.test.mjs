import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkReadme } from "./check-readme.mjs";

const SECTIONS = {
  Default: "The old   text, with a\nsecond line.",
  humanizer: "Cleaned text from humanizer.",
  "no-ai-slop": "Edited text from no-ai-slop.",
  YAH: "New text. More new text.",
};

function fixture(readme) {
  const root = mkdtempSync(join(tmpdir(), "yah-readme-"));
  mkdirSync(join(root, "evals/samples"), { recursive: true });
  for (const mode of ["answers", "longform", "script"]) {
    const body = Object.entries(SECTIONS)
      .map(([who, text]) => `## ${who} output\n\n${text}\n`)
      .join("\n");
    writeFileSync(join(root, "evals/samples", `${mode}-01.md`), `---\nmode: ${mode}\n---\n${body}`);
  }
  writeFileSync(join(root, "README.md"), readme);
  return root;
}

const LEFT = {
  Default: "The old text, with a second line.",
  humanizer: "Cleaned text from humanizer.",
  "no-ai-slop": "Edited text from no-ai-slop.",
};

// One table: a left cell per label and one YAH cell spanning all rows.
function sample(slug, { yah = "New text.", labels = Object.keys(LEFT) } = {}) {
  const rows = labels
    .map((label, n) => {
      const yahCell = n === 0 ? `<td rowspan="${labels.length}">\n\n${yah}\n\n</td>` : "";
      return `<tr><td>\n\n**${label}**\n\n${LEFT[label]}\n\n</td>${yahCell}</tr>\n`;
    })
    .join("");
  return `<!-- sample: ${slug} -->\n<table>\n${rows}</table>\n`;
}

test("passes when every cell appears in its section, excerpts allowed", () => {
  const readme = sample("answers-01") + sample("longform-01", { yah: "New text.\n[...]\nMore new text." }) + sample("script-01");
  assert.deepEqual(checkReadme(fixture(readme)).errors, []);
});

test("fails on invented text, a missing sample, a missing row and a missing mode", () => {
  const readme =
    sample("answers-01", { yah: "Text that was never generated." }) +
    sample("ghost-01") +
    sample("longform-01", { labels: ["Default", "humanizer"] });
  const { errors } = checkReadme(fixture(readme));
  assert.ok(errors.some((e) => e.startsWith("answers-01: YAH text not found")));
  assert.ok(errors.some((e) => e.startsWith("ghost-01: no file")));
  assert.ok(errors.some((e) => e === "longform-01: no row for no-ai-slop"));
  assert.ok(errors.some((e) => e.includes('mode "script"')));
});

test("a cell is matched against its own section only", () => {
  const swapped = sample("answers-01").replace("Cleaned text from humanizer.", "Edited text from no-ai-slop.");
  const readme = swapped + sample("longform-01") + sample("script-01");
  const { errors } = checkReadme(fixture(readme));
  assert.ok(errors.some((e) => e.startsWith("answers-01: humanizer text not found")));
});

test("a table without a YAH cell is an error", () => {
  const noYah = sample("answers-01").replace(/<td rowspan="3">[\s\S]*?<\/td>/, "");
  const readme = noYah + sample("longform-01") + sample("script-01");
  const { errors } = checkReadme(fixture(readme));
  assert.ok(errors.some((e) => e === "answers-01: needs exactly one YAH cell with a rowspan"));
});
