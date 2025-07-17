import * as fs from "fs";
import * as path from "path";
import { marked } from "marked";
import pc from "picocolors";

const adrFileDir = path.join("docs", "adrs");
const publicDir = path.join(".", "public");
const adrHtmlDir = path.join(publicDir, "adrs");

// Create output directories if they don't exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(adrHtmlDir)) fs.mkdirSync(adrHtmlDir, { recursive: true });

const files = fs.readdirSync(adrFileDir).filter((file) => file.endsWith(".md"));

files.forEach((file) => {
  const filePath = path.join(adrFileDir, file);
  const markdown = fs.readFileSync(filePath, "utf-8");
  const html = marked.parse(markdown);

  const htmlFileName = file.replace(/\.md$/, ".html");
  const htmlPath = path.join(adrHtmlDir, htmlFileName);

  // Extract title by removing leading date and extension
  // Example: "2025 07 17 Broxy Migration.md" → "Broxy Migration"
  const title = file.replace(/^\d{4} \d{2} \d{2} /, "").replace(/\.md$/, "");

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: 'Ginto Copilot Variable', system-ui, sans-serif; max-width: 700px; margin: 2rem auto; line-height: 1.6; }
    h1, h2, h3 { color: #2c3e50; }
    pre { background: #f4f4f4; padding: 1em; overflow-x: auto; }
    code { font-family: monospace; }
  </style>
</head>
<body>
${html}
</body>
</html>`;

  fs.writeFileSync(htmlPath, fullHtml);
  console.log(
    `✅ Converted ${pc.yellow(`${file}`)} → ${pc.green(`adrs/${htmlFileName}`)}`
  );
});
