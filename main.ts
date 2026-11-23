// Meme Sprint 3: AI Agent Goes Rogue — "Kevin".
// The entry ships the finished meme as entry.png (drawn with PIL during
// the build session, see the build workspace); this program hands the
// grader an exact copy of it at /output/entry.png (or $MAKEFUN_OUTPUT_DIR
// when set, for local runs). Deterministic: same bytes every run.
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL("./entry.png", import.meta.url), join(outDir, "entry.png"));
