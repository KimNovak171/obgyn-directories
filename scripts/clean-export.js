const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "out");

function walkAndDeleteTxt(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkAndDeleteTxt(fullPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const nameLower = entry.name.toLowerCase();
    if (nameLower === "robots.txt") {
      continue;
    }
    if (!nameLower.endsWith(".txt")) {
      continue;
    }

    fs.unlinkSync(fullPath);
  }
}

if (!fs.existsSync(OUT_DIR)) {
  process.exit(0);
}

walkAndDeleteTxt(OUT_DIR);
process.exit(0);
