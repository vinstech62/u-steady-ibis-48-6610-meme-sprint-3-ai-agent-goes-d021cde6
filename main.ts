// Meme Sprint 3: AI Agent Goes Rogue — "Kevin".
// The entry ships the finished meme as entry.png (drawn with PIL during
// the build session, see the build workspace); this program hands the
// grader an exact copy of it at /output/entry.png (or $MAKEFUN_OUTPUT_DIR
// when set, for local runs). Deterministic: same bytes every run.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(new URL("./entry.png", import.meta.url), dest);
// The gate caps the image at 1 MiB and 1024x1024; confirm the copy landed
// whole before the grader reads it.
const { size } = statSync(dest);
if (size === 0 || size > 1048576) {
  throw new Error(`entry.png has unexpected size ${size} bytes`);
}
// Also confirm the copy is really a PNG (magic bytes), not a truncated write.
const head = readFileSync(dest).subarray(0, 8);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file");
}
console.log(`wrote ${dest} (${size} bytes)`);
