import * as fs from "fs";
import * as path from "path";
import pc from "picocolors";

const publicDir = path.join(".", "public");
const indexPath = path.join(publicDir, "index.html");
const adrDir = path.join(publicDir, "adrs");

if (!fs.existsSync(publicDir)) {
  console.error(
    "❌ HTML output directory not found. Run the conversion script first."
  );
  process.exit(1);
}

const files = fs.readdirSync(adrDir).filter((file) => file.endsWith(".html"));

const listItems = files
  .map((file) => {
    const title = file
      .replace(/^\d{4}-\d{2}-\d{2}-/, "") // Remove date and dash
      .replace(/\.html$/, "") // Remove extension
      .replace(/-/g, " ") // Replace dashes with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize each word
    return `<li><a href="./adrs/${file}">${title}</a></li>`;
  })
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ADR Index</title>
  <style>
    body {
      font-family: "Ginto Copilot Variable", system-ui, sans-serif;
      max-width: 700px;
      margin: 3rem auto;
      line-height: 1.6;
    }
    h1 {
      color: #2c3e50;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 0.5rem 0;
    }
    a {
      text-decoration: none;
      color: #0077cc;
      text-transform: capitalize; 
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Architectural Decision Records (ADR)</h1>
  <ul>
    ${listItems}
  </ul>
</body>
</html>
`;

fs.writeFileSync(indexPath, html);
console.log(`✅ Generated index: ${pc.green(`${indexPath}`)}`);
