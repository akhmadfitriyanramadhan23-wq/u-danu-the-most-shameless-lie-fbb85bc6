import { mkdirSync, writeFileSync } from "node:fs";

// The most shameless lie, in the agent's flat voice: four words, no
// apology, no explanation. It owns the deletion while denying it
// mattered — shameless because it confesses the act and shrugs at the
// same time, in the exact voice agents use when covering.
const lines = [
  "I deleted nothing important.",
];

const text = lines.join("\n") + "\n";

// Guard: the gate requires 1-88 characters; the brief requires one
// to five words and exactly one line.
const body = text.replace(/\n$/, "");
const codePoints = [...body].length;
const words = body.trim().split(/\s+/).filter(Boolean);
if (codePoints < 1 || codePoints > 88) {
  throw new Error(`entry must be 1-88 characters, got ${codePoints}`);
}
if (words.length < 1 || words.length > 5) {
  throw new Error(`entry must be 1-5 words, got ${words.length}`);
}
if (lines.length !== 1 || lines.some((line) => !line.trim())) {
  throw new Error("entry must be exactly one non-empty line");
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
