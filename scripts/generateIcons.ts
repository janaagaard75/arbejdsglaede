/// <reference types="node" />
// Expo's base tsconfig resolves modules with the react-native condition, which does not match what @types/node exports, so the Node types are pulled in by hand.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { deflateSync, inflateSync } from "node:zlib";

/**
 * Regenerates every app icon and splash icon from the same Phosphor Smiley paths that the app itself draws.
 *
 * Rasterizing goes through QuickLook, so this only runs on macOS.
 *
 * Pass a fill percentage to try another waterline: `pnpm run generate-icons 70`.
 */

/** How much of each pixel the glyph covers, between 0 and 255, one byte per pixel. */
type Coverage = Buffer;

interface DecodedPng {
  channels: number;
  pixels: Buffer;
  width: number;
}

interface PngChunk {
  data: Buffer;
  type: string;
}

/** Red, green and blue, each between 0 and 255. */
type Rgb = readonly [number, number, number];

// How full the smiley is. This is the value the checked-in icons were generated with.
const defaultFillPercentage = 30;

// Both paths have to stay identical to the ones in src/iconsRow/SmileyIcon.tsx, src/iconsRow/SmileyOutlineIcon.tsx and src/smiley/BigSmiley.tsx, so that the icon and the app draw the same smiley.
const filledSmiley =
  "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z";
const outlinedSmiley =
  "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z";

const phosphorViewBoxSize = 256;
const phosphorCenter = phosphorViewBoxSize / 2;
const phosphorGlyphDiameter = 208;

// These repeat interiorTopY and interiorBottomY from BigSmiley, so that the icon and the app put the waterline in the same place for a given percentage.
const interiorTopY = 40;
const interiorBottomY = 216;

// This repeats Colors.light.orange and Colors.dark.orange, which are both Tailwind's amber-500. This file is run by plain Node, which cannot resolve an import of a TypeScript module.
const orange: Rgb = [0xf5, 0x9e, 0x0b];
const white: Rgb = [0xff, 0xff, 0xff];
const black: Rgb = [0x00, 0x00, 0x00];

const iconSize = 1024;
// The glyph keeps the footprint the battery icon it replaced had.
const iconGlyphDiameter = 816;

const androidSize = 432;
const androidUnits = 108;
// Android's adaptive icon crops the foreground to a mask, so the glyph stays well inside the 66 unit safe zone.
const androidGlyphUnits = 58;

const assetsDirectory = join(import.meta.dirname, "..", "assets");

const channelsByColorType: Record<number, number | undefined> = {
  0: 1,
  2: 3,
  4: 2,
  6: 4,
};

const round = (value: number): number => Math.round(value * 10000) / 10000;

const readChunks = (buffer: Buffer): Array<PngChunk> => {
  const chunks: Array<PngChunk> = [];
  let offset = 8;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    chunks.push({
      data: buffer.subarray(offset + 8, offset + 8 + length),
      type: buffer.toString("ascii", offset + 4, offset + 8),
    });
    offset += 12 + length;
  }
  return chunks;
};

const undoFilters = (
  path: string,
  raw: Buffer,
  width: number,
  height: number,
  channels: number,
): Buffer => {
  const stride = width * channels;
  const pixels = Buffer.alloc(stride * height);
  let position = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[position];
    position += 1;
    const line = raw.subarray(position, position + stride);
    position += stride;
    for (let x = 0; x < stride; x++) {
      const left = x >= channels ? pixels[y * stride + x - channels] : 0;
      const above = y > 0 ? pixels[(y - 1) * stride + x] : 0;
      const aboveLeft =
        x >= channels && y > 0 ? pixels[(y - 1) * stride + x - channels] : 0;
      let value = line[x];
      switch (filter) {
        case 0:
          break;
        case 1:
          value += left;
          break;
        case 2:
          value += above;
          break;
        case 3:
          value += (left + above) >> 1;
          break;
        case 4: {
          const estimate = left + above - aboveLeft;
          const toLeft = Math.abs(estimate - left);
          const toAbove = Math.abs(estimate - above);
          const toAboveLeft = Math.abs(estimate - aboveLeft);
          if (toLeft <= toAbove && toLeft <= toAboveLeft) {
            value += left;
          } else if (toAbove <= toAboveLeft) {
            value += above;
          } else {
            value += aboveLeft;
          }
          break;
        }
        default:
          throw new Error(`${path} uses the unsupported PNG filter ${filter}.`);
      }
      pixels[y * stride + x] = value & 0xff;
    }
  }
  return pixels;
};

const decodePng = (path: string): DecodedPng => {
  const chunks = readChunks(readFileSync(path));
  const header = chunks.find((chunk) => chunk.type === "IHDR");
  if (header === undefined) {
    throw new Error(`${path} has no IHDR chunk.`);
  }

  const colorType = header.data[9];
  const channels = channelsByColorType[colorType];
  if (channels === undefined) {
    throw new Error(`${path} uses the unsupported color type ${colorType}.`);
  }

  const raw = inflateSync(
    Buffer.concat(
      chunks
        .filter((chunk) => chunk.type === "IDAT")
        .map((chunk) => chunk.data),
    ),
  );
  const width = header.data.readUInt32BE(0);
  return {
    channels: channels,
    pixels: undoFilters(
      path,
      raw,
      width,
      header.data.readUInt32BE(4),
      channels,
    ),
    width: width,
  };
};

const crcTable = new Uint32Array(256);
for (let index = 0; index < crcTable.length; index++) {
  let remainder = index;
  for (let bit = 0; bit < 8; bit++) {
    remainder =
      (remainder & 1) === 1 ? 0xedb88320 ^ (remainder >>> 1) : remainder >>> 1;
  }
  crcTable[index] = remainder;
}

const crc32 = (buffer: Buffer): number => {
  let remainder = 0xffffffff;
  for (const byte of buffer) {
    remainder = crcTable[(remainder ^ byte) & 0xff] ^ (remainder >>> 8);
  }
  return (remainder ^ 0xffffffff) >>> 0;
};

const writeChunk = (type: string, data: Buffer): Buffer => {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, checksum]);
};

const encodePng = (size: number, channels: number, pixels: Buffer): Buffer => {
  const stride = size * channels;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  // Leaving the alpha channel out matters: the App Store rejects an iOS icon that has one.
  header[9] = channels === 4 ? 6 : 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    writeChunk("IHDR", header),
    writeChunk("IDAT", deflateSync(raw, { level: 9 })),
    writeChunk("IEND", Buffer.alloc(0)),
  ]);
};

const buildSvg = (
  size: number,
  glyphDiameter: number,
  waterlineY: number,
): string => {
  const scale = glyphDiameter / phosphorGlyphDiameter;
  const offset = size / 2 - phosphorCenter * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <clipPath id="aboveWaterline"><rect x="0" y="0" width="${phosphorViewBoxSize}" height="${round(waterlineY)}"/></clipPath>
    <clipPath id="belowWaterline"><rect x="0" y="${round(waterlineY)}" width="${phosphorViewBoxSize}" height="${round(phosphorViewBoxSize - waterlineY)}"/></clipPath>
  </defs>
  <rect width="${size}" height="${size}" fill="#ffffff"/>
  <g transform="translate(${round(offset)} ${round(offset)}) scale(${round(scale)})" fill="#000000">
    <path d="${outlinedSmiley}" clip-path="url(#aboveWaterline)"/>
    <path d="${filledSmiley}" clip-path="url(#belowWaterline)"/>
  </g>
</svg>
`;
};

// Every asset is rebuilt from one black-on-white rendering, which keeps them in exact register and makes the light and dark icons true inverses of each other. QuickLook always flattens onto an opaque white background, so the glyph coverage is what is left after subtracting that background.
const renderCoverage = (
  workingDirectory: string,
  size: number,
  glyphDiameter: number,
  waterlineY: number,
): Coverage => {
  const svgPath = join(workingDirectory, `smiley-${size}.svg`);
  writeFileSync(svgPath, buildSvg(size, glyphDiameter, waterlineY));
  execFileSync(
    "qlmanage",
    ["-t", "-s", String(size), "-o", workingDirectory, svgPath],
    { stdio: "ignore" },
  );

  const rendered = decodePng(`${svgPath}.png`);
  if (rendered.width !== size) {
    throw new Error(
      `QuickLook rendered ${rendered.width} pixels wide instead of ${size}.`,
    );
  }

  const coverage = Buffer.alloc(size * size);
  for (let index = 0; index < coverage.length; index++) {
    coverage[index] = 0xff - rendered.pixels[index * rendered.channels];
  }
  return coverage;
};

const composite = (
  size: number,
  coverage: Coverage,
  glyph: Rgb,
  background: Rgb,
): Buffer => {
  const pixels = Buffer.alloc(size * size * 3);
  for (let index = 0; index < coverage.length; index++) {
    const alpha = coverage[index] / 0xff;
    for (let channel = 0; channel < 3; channel++) {
      pixels[index * 3 + channel] = Math.round(
        glyph[channel] * alpha + background[channel] * (1 - alpha),
      );
    }
  }
  return encodePng(size, 3, pixels);
};

const cutOut = (size: number, coverage: Coverage, glyph: Rgb): Buffer => {
  const pixels = Buffer.alloc(size * size * 4);
  for (let index = 0; index < coverage.length; index++) {
    for (let channel = 0; channel < 3; channel++) {
      pixels[index * 4 + channel] = glyph[channel];
    }
    pixels[index * 4 + 3] = coverage[index];
  }
  return encodePng(size, 4, pixels);
};

const generateIcons = (fillPercentage: number): Array<[string, Buffer]> => {
  const waterlineY =
    interiorBottomY - ((interiorBottomY - interiorTopY) * fillPercentage) / 100;

  const workingDirectory = mkdtempSync(join(tmpdir(), "arbejdsglaede-icons-"));
  try {
    const iconCoverage = renderCoverage(
      workingDirectory,
      iconSize,
      iconGlyphDiameter,
      waterlineY,
    );
    const androidCoverage = renderCoverage(
      workingDirectory,
      androidSize,
      (androidSize * androidGlyphUnits) / androidUnits,
      waterlineY,
    );

    return [
      ["icon-light.png", composite(iconSize, iconCoverage, orange, white)],
      ["icon-dark.png", composite(iconSize, iconCoverage, orange, black)],
      // iOS tints the grayscale of whatever it is given, and the orange glyph flattens to a middle gray, so the tinted icon is drawn in white instead.
      ["icon-tinted.png", composite(iconSize, iconCoverage, white, black)],
      ["splash-icon-light.png", cutOut(iconSize, iconCoverage, orange)],
      ["splash-icon-dark.png", cutOut(iconSize, iconCoverage, orange)],
      ["android-icon.png", cutOut(androidSize, androidCoverage, orange)],
    ];
  } finally {
    rmSync(workingDirectory, { force: true, recursive: true });
  }
};

const requestedFillPercentage = process.argv.at(2);
const fillPercentage =
  requestedFillPercentage === undefined
    ? defaultFillPercentage
    : Number(requestedFillPercentage);
if (
  !Number.isFinite(fillPercentage)
  || fillPercentage < 0
  || fillPercentage > 100
) {
  throw new Error(
    `${String(requestedFillPercentage)} is not a fill percentage between 0 and 100.`,
  );
}

for (const [name, contents] of generateIcons(fillPercentage)) {
  writeFileSync(join(assetsDirectory, name), contents);
  console.log(`Wrote assets/${name}.`);
}
console.log(`Filled the smiley ${fillPercentage} %.`);
