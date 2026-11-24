// The One-Line Laugh — u-ronigrv-the-one-line-laugh-7ccca46f
// SPDX-License-Identifier: MIT
//
// Writes one funny line to /output/entry.txt for the make.fun bounty
// "The One-Line Laugh". The gate requires the file to hold UTF-8 text of
// 1 to 200 characters, a single sentence, so the program checks its own
// line before writing anything and refuses to write an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. Setup: a fitness tracker reporting a workout. Punchline: the
// "exercise" was furiously closing rating pop-ups — an everyday truth
// (every app begs for a rating) with the surprise saved for the end.
const LINE =
  "My fitness tracker says I burned 400 calories today, mostly from furiously closing pop-ups begging me to rate them.";

// The grader mounts /output in its sandbox. Locally, OUTPUT_DIR lets the
// same program be validated without that mount; it is only a path.
const outputDir = process.env.OUTPUT_DIR ?? "/output";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!line.endsWith(".")) {
    throw new Error("entry must stand alone as a single sentence");
  }
}

validate(LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${join(outputDir, "entry.txt")}`);
console.log(LINE);
