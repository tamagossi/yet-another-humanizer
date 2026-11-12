// Checks that every before/after example in README.md is real: each fenced block
// after a `<!-- sample: <slug> -->` marker must appear in evals/samples/<slug>.md.
// A block may be an excerpt; a line of just "[...]" splits it into pieces that
// must each appear, in order. Also requires one example per mode.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const norm = (s) => s.replace(/\s+/g, " ").trim();

export function checkReadme(root) {
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const errors = [];
  const modes = new Set();
  const sections = readme.split(/<!-- sample: ([\w-]+) -->/).slice(1);

  for (let i = 0; i < sections.length; i += 2) {
    const slug = sections[i];
    const body = sections[i + 1].split(/<!-- (?:sample: |\/sample)/)[0];
    const file = join(root, "evals/samples", `${slug}.md`);
    if (!existsSync(file)) {
      errors.push(`${slug}: no file evals/samples/${slug}.md`);
      continue;
    }
    const sample = norm(readFileSync(file, "utf8"));
    modes.add(sample.match(/mode: (\w+)/)?.[1]);
    const blocks = [...body.matchAll(/```[\w]*\n([\s\S]*?)```/g)].map((m) => m[1]);
    if (blocks.length < 2) errors.push(`${slug}: needs a before block and an after block`);
    blocks.forEach((block, n) => {
      let from = 0;
      for (const piece of block.split(/^\[\.\.\.\]$/m).map(norm).filter(Boolean)) {
        const at = sample.indexOf(piece, from);
        if (at === -1) {
          errors.push(`${slug}: block ${n + 1} text not found in sample: "${piece.slice(0, 60)}..."`);
          break;
        }
        from = at + piece.length;
      }
    });
  }

  for (const mode of ["answers", "longform", "script"]) {
    if (!modes.has(mode)) errors.push(`no README example for mode "${mode}"`);
  }
  return { examples: sections.length / 2, errors };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { examples, errors } = checkReadme(process.cwd());
  if (errors.length) {
    console.error(`README check failed:\n  ${errors.join("\n  ")}`);
    process.exit(1);
  }
  console.log(`README check passed: ${examples} examples match the sample set.`);
}
