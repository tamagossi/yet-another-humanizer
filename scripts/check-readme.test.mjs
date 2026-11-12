import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkReadme } from "./check-readme.mjs";

const fence = "```";

function fixture(readme) {
  const root = mkdtempSync(join(tmpdir(), "yah-readme-"));
  mkdirSync(join(root, "evals/samples"), { recursive: true });
  for (const mode of ["answers", "longform", "script"]) {
    writeFileSync(
      join(root, "evals/samples", `${mode}-01.md`),
      `---\nmode: ${mode}\n---\n## Default output\n\nThe old   text, with a\nsecond line.\n\n## YAH output\n\nNew text. More new text.\n`,
    );
  }
  writeFileSync(join(root, "README.md"), readme);
  return root;
}

const pair = (slug, after = "New text.") =>
  `<!-- sample: ${slug} -->\n${fence}txt\nThe old text, with a second line.\n${fence}\n${fence}txt\n${after}\n${fence}\n`;

test("passes when every block appears in its sample, excerpts allowed", () => {
  const readme = pair("answers-01") + pair("longform-01", "New text.\n[...]\nMore new text.") + pair("script-01");
  assert.deepEqual(checkReadme(fixture(readme)).errors, []);
});

test("fails on invented text, a missing sample and a missing mode", () => {
  const readme = pair("answers-01", "Text that was never generated.") + pair("ghost-01");
  const { errors } = checkReadme(fixture(readme));
  assert.ok(errors.some((e) => e.startsWith("answers-01: block 2")));
  assert.ok(errors.some((e) => e.startsWith("ghost-01: no file")));
  assert.ok(errors.some((e) => e.includes('mode "script"')));
});
