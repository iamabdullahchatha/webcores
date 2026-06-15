// Converts the PNG logo to WebP to cut its weight (~202 KB -> ~20-40 KB).
//
// Note there are TWO copies of the logo and BOTH need a .webp sibling:
//   • src/assets/logo.png — imported by Header.tsx and bundled; the Header's
//     `import logo from "@/assets/logo.webp"` only resolves if this one exists.
//   • public/logo.png — served verbatim at /logo.png (used as a <picture>
//     fallback URL and referenced elsewhere); converted for parity.
//
// WebP encode: quality 85, lossy (lossless:false), effort 6. sharp keeps the
// PNG's alpha channel automatically — we never .flatten(), so transparency is
// preserved.

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  { png: "src/assets/logo.png", webp: "src/assets/logo.webp" },
  { png: "public/logo.png", webp: "public/logo.webp" },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

for (const { png, webp } of targets) {
  const input = await readFile(path.join(rootDir, png));

  const output = await sharp(input)
    .webp({ quality: 85, lossless: false, effort: 6 })
    .toBuffer();

  await writeFile(path.join(rootDir, webp), output);

  const saved = input.length - output.length;
  const pct = Math.round((saved / input.length) * 100);
  console.log(`${png} -> ${webp}`);
  console.log(`  before ${kb(input.length)}  ->  after ${kb(output.length)}  (saved ${kb(saved)}, ${pct}%)`);
}
