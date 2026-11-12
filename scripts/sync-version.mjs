// Copies the version in package.json into every manifest that declares one.
// With --check, writes nothing and exits 1 when any manifest differs.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export function syncVersion(root, { check = false } = {}) {
  const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));
  const { version } = read("package.json");
  const plugin = read(".claude-plugin/plugin.json");
  const skillPath = "skills/yah/SKILL.md";
  const skill = readFileSync(join(root, skillPath), "utf8");
  const skillVersion = skill.match(/^\s+version:\s*"([^"]+)"/m)?.[1];

  const mismatches = [];
  if (plugin.version !== version) mismatches.push(`.claude-plugin/plugin.json has ${plugin.version}`);
  if (skillVersion !== version) mismatches.push(`${skillPath} has ${skillVersion}`);

  if (check || mismatches.length === 0) return { version, mismatches };

  plugin.version = version;
  writeFileSync(join(root, ".claude-plugin/plugin.json"), JSON.stringify(plugin, null, 2) + "\n");
  writeFileSync(join(root, skillPath), skill.replace(/^(\s+version:\s*)"[^"]+"/m, `$1"${version}"`));
  return { version, mismatches: [] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes("--check");
  const { version, mismatches } = syncVersion(process.cwd(), { check });
  if (mismatches.length) {
    console.error(`Version mismatch with package.json (${version}):\n  ${mismatches.join("\n  ")}\nRun npm run version:sync.`);
    process.exit(1);
  }
  console.log(`All manifests at ${version}.`);
}
