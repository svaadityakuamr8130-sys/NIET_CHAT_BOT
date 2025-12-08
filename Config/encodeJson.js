const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../Data");

function jsonToToon(obj) {
  if (Array.isArray(obj) && typeof obj[0] === "object") {
    const keys = Object.keys(obj[0]);
    const header = `{${keys.join(",")}}`;
    const rows = obj.map(o => "  " + keys.map(k => o[k]).join(",")).join("\n");
    return `[${obj.length}]${header}:\n${rows}`;
  }

  if (typeof obj === "object") {
    let result = "";
    for (let key in obj) {
      result += `${key}: ${jsonToToon(obj[key])}\n`;
    }
    return result.trim();
  }

  return String(obj);
}

function convertFile(jsonPath) {
  const outPath = jsonPath.replace(".json", ".toon");

  try {
    const raw = fs.readFileSync(jsonPath, "utf8");
    const json = JSON.parse(raw);

    const toon = jsonToToon(json);

    fs.writeFileSync(outPath, toon, "utf8");
    console.log(`Converted → ${outPath}`);
  } catch (err) {
    console.log(" Conversion failed:", err.message);
  }
}

function processFolder(dir) {
  const files = fs.readdirSync(dir);
  files
    .filter((f) => f.endsWith(".json"))
    .forEach((file) => convertFile(path.join(dir, file)));
}

processFolder(dataDir);
