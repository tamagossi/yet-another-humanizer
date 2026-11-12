// Checks that every comparison in README.md is real. Each case starts with
// `<!-- sample: <slug> -->` and holds one HTML table. The left cells start with
// a bold label (**Default**, **humanizer**, **no-ai-slop**); one cell with a
// rowspan holds YAH's output for the same case. Each cell must appear in the
// matching `## ... output` section of evals/samples/<slug>.md. A cell may be an
// excerpt: a line of just "[...]" splits it into pieces that must each appear,
// in order.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const norm = (s) => s.replace(/\s+/g, " ").trim();
const SECTION = {
  Default: "Default output",
  humanizer: "humanizer output",
  "no-ai-slop": "no-ai-slop output",
  YAH: "YAH output",
};
const REQUIRED_LABELS = ["Default", "humanizer", "no-ai-slop"];

function sections(sampleText) {
  const map = {};
  for (const part of sampleText.split(/^## /m).slice(1)) {
    const [title, ...rest] = part.split("\n");
    map[title.trim()] = norm(rest.join("\n"));
  }
  return map;
}

function missingPiece(cell, body) {
  let from = 0;
  for (const piece of cell.split(/^\[\.\.\.\]$/m).map(norm).filter(Boolean)) {
    const at = body.indexOf(piece, from);
    if (at === -1) return piece;
    from = at + piece.length;
  }
  return null;
}

export function checkReadme(root) {
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const errors = [];
  const modes = new Set();
  const parts = readme.split(/<!-- sample: ([\w-]+) -->/).slice(1);

  for (let i = 0; i < parts.length; i += 2) {
    const slug = parts[i];
    const body = parts[i + 1].split(/<!-- (?:sample: |\/sample)/)[0];
    const file = join(root, "evals/samples", `${slug}.md`);
    if (!existsSync(file)) {
      errors.push(`${slug}: no file evals/samples/${slug}.md`);
      continue;
    }
    const text = readFileSync(file, "utf8");
    modes.add(text.match(/^mode: (\w+)/m)?.[1]);
    const byTitle = sections(text);

    const cells = [...body.matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)];
    const yahCells = cells.filter(([, attrs]) => /rowspan/.test(attrs));
    if (yahCells.length !== 1) errors.push(`${slug}: needs exactly one YAH cell with a rowspan`);

    const checks = yahCells.map(([, , cell]) => ["YAH", cell]);
    const seen = new Set();
    for (const [, attrs, cell] of cells) {
      if (/rowspan/.test(attrs)) continue;
      const label = cell.trim().match(/^\*\*([\w-]+)\*\*/)?.[1];
      if (!REQUIRED_LABELS.includes(label)) {
        errors.push(`${slug}: left cell must start with **Default**, **humanizer** or **no-ai-slop**`);
        continue;
      }
      seen.add(label);
      checks.push([label, cell.trim().replace(/^\*\*[\w-]+\*\*/, "")]);
    }
    for (const label of REQUIRED_LABELS) {
      if (!seen.has(label)) errors.push(`${slug}: no row for ${label}`);
    }

    for (const [who, cell] of checks) {
      const section = byTitle[SECTION[who]];
      if (section === undefined) {
        errors.push(`${slug}: sample has no "## ${SECTION[who]}" section`);
        continue;
      }
      const missing = missingPiece(cell, section);
      if (missing) errors.push(`${slug}: ${who} text not found in "${SECTION[who]}": "${missing.slice(0, 60)}..."`);
    }
  }

  for (const mode of ["answers", "longform", "script"]) {
    if (!modes.has(mode)) errors.push(`no README example for mode "${mode}"`);
  }
  return { examples: parts.length / 2, errors };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { examples, errors } = checkReadme(process.cwd());
  if (errors.length) {
    console.error(`README check failed:\n  ${errors.join("\n  ")}`);
    process.exit(1);
  }
  console.log(`README check passed: ${examples} cases match the sample set.`);
}
