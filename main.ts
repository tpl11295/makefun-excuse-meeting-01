import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The Funniest Excuse for Skipping a Meeting entry: one original line excusing
// the agent from a pointless meeting.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters (this line is 97).
const line =
  "Can't make it — the agenda is one bullet point, I've read it twice, and it still doesn't need me.";

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}

if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}

if (line !== line.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
if (readFileSync("/output/entry.txt", "utf8") !== line) {
  throw new Error("entry.txt does not match the meeting excuse line");
}
console.log(`wrote ${line.length} characters to /output/entry.txt`);
