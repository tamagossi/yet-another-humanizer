import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { syncVersion } from "./sync-version.mjs";

function fixture(pkg, plugin, skill) {
  const root = mkdtempSync(join(tmpdir(), "yah-sync-"));
  mkdirSync(join(root, ".claude-plugin"));
  mkdirSync(join(root, "skills/yah"), { recursive: true });
  writeFileSync(join(root, "package.json"), JSON.stringify({ version: pkg }));
  writeFileSync(join(root, ".claude-plugin/plugin.json"), JSON.stringify({ name: "yah", version: plugin }));
  writeFileSync(join(root, "skills/yah/SKILL.md"), `---\nname: yah\nmetadata:\n  version: "${skill}"\n---\nbody\n`);
  return root;
}

test("check reports every mismatch and writes nothing", () => {
  const root = fixture("1.2.0", "1.1.0", "1.0.0");
  const { mismatches } = syncVersion(root, { check: true });
  assert.equal(mismatches.length, 2);
  assert.equal(JSON.parse(readFileSync(join(root, ".claude-plugin/plugin.json"))).version, "1.1.0");
});

test("sync copies the package.json version everywhere", () => {
  const root = fixture("1.2.0", "1.1.0", "1.0.0");
  syncVersion(root);
  assert.equal(JSON.parse(readFileSync(join(root, ".claude-plugin/plugin.json"))).version, "1.2.0");
  assert.match(readFileSync(join(root, "skills/yah/SKILL.md"), "utf8"), /version: "1\.2\.0"/);
  assert.deepEqual(syncVersion(root, { check: true }).mismatches, []);
});
