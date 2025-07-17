import fs from "fs";
import path from "path";
import pc from "picocolors";

const [, , ...argv] = process.argv;

if (argv.length === 0) {
  console.error(`Usage: ${pc.magenta(`pnpm create:adr <title>`)}`);
  console.error(`Example: ${pc.magenta(`pnpm create:adr "your-adr-title"`)}`);

  process.exit(1);
}

const title = argv.join(" ").trim();
// Remove all special characters except spaces and hyphens, then replace spaces with hyphens
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "") // remove special characters except spaces and hyphens
  .replace(/\s+/g, "-"); // replace spaces with hyphens
const adrDir = path.join("docs", "adrs");

if (!fs.existsSync(adrDir)) fs.mkdirSync(adrDir, { recursive: true });

const date = new Date().toISOString().split("T")[0];
const filename = `${date}-${slug}.md`;
const fullPath = path.join(adrDir, filename);

if (fs.existsSync(fullPath)) {
  console.error(`❌ File already exists: ${pc.magenta(`${filename}`)}`);
  process.exit(1);
}

const content = `# ${title}

## Status
Proposed

## Date
${date}

## Context
[Describe the background or situation.]

## Decision
[What decision has been made.]

## Rationale
[Why this decision was made.]

## Consequences
[Positive and negative consequences.]

## Alternatives
[List other options and explain why they weren't chosen.]

## References
`;

fs.writeFileSync(fullPath, content);
console.log(`✅ Created: ${pc.magenta(`docs/adrs/${filename}`)}`);
