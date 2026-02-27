import fs from "fs";
import path from "path";

const BASE_DIR = "public/images/portfolio";
const OUT_FILE = "src/data/portfolio-images.ts";

function getPngSize(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  return null;
}

function getGifSize(buf) {
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
  }
  return null;
}

function getImageSize(filePath) {
  const buf = Buffer.alloc(24);
  const fd = fs.openSync(filePath, "r");
  fs.readSync(fd, buf, 0, 24, 0);
  fs.closeSync(fd);
  const ext = path.extname(filePath).toLowerCase();
  const size = ext === ".gif" ? getGifSize(buf) : getPngSize(buf);
  return size || { w: 800, h: 800 };
}

function titleFromFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_/, "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

const entries = [];
const dirs = fs.readdirSync(BASE_DIR, { withFileTypes: true });

for (const dirent of dirs) {
  if (dirent.isDirectory()) {
    const tag = dirent.name;
    const tagDir = path.join(BASE_DIR, tag);
    const files = fs.readdirSync(tagDir).filter((f) => /\.(png|gif|jpe?g|webp)$/i.test(f));
    for (const file of files) {
      const filePath = path.join(tagDir, file);
      const size = getImageSize(filePath);
      entries.push({
        id: `${tag}-${path.parse(file).name}`.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        src: `/images/portfolio/${tag}/${file}`,
        alt: titleFromFilename(file),
        title: titleFromFilename(file),
        width: size.w,
        height: size.h,
        tag,
      });
    }
  } else if (/\.(png|gif|jpe?g|webp)$/i.test(dirent.name)) {
    const filePath = path.join(BASE_DIR, dirent.name);
    const size = getImageSize(filePath);
    entries.push({
      id: path.parse(dirent.name).name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      src: `/images/portfolio/${dirent.name}`,
      alt: titleFromFilename(dirent.name),
      title: titleFromFilename(dirent.name),
      width: size.w,
      height: size.h,
      tag: "uncategorized",
    });
  }
}

const code = `import { PortfolioImage } from "@/types";

export const portfolioImages: PortfolioImage[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync(OUT_FILE, code, "utf-8");
console.log(`Generated ${entries.length} entries → ${OUT_FILE}`);
