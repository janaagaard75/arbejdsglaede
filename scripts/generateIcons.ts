/// <reference types="node" />
// Expo's base tsconfig resolves modules with the react-native condition, which does not match what @types/node exports, so the Node types are pulled in by hand.

import { join } from "node:path";
import sharp, { type OverlayOptions } from "sharp";

const defaultFillPercentage = 20;
const sourceViewBoxSize = 32;
const faceTopY = 2;
const faceBottomY = 30;
const faceDiameterInSource = faceBottomY - faceTopY;
const waterlineOverlap = 1;

const lightModeGrayBrightness = 1.15;
const darkModeGrayBrightness = 0.6;

const cream = "#f8f4ee";
const ink = "#292929";
const black = "#000000";

const iconSize = 1024;
const iconFaceDiameter = 816;

const androidSize = 432;
const androidUnits = 108;
const androidFaceUnits = 58;

const assetsDirectory = join(import.meta.dirname, "..", "assets");
const sourcePath = join(
  import.meta.dirname,
  "..",
  "assets-src",
  "smiley",
  "fluent-grinning-face-with-smiling-eyes.svg",
);

const renderArtwork = async (
  size: number,
  grayBrightness?: number,
): Promise<Buffer> => {
  const image = sharp(sourcePath).resize(size, size);
  return grayBrightness === undefined
    ? image.png().toBuffer()
    : image
        .grayscale()
        .modulate({ brightness: grayBrightness })
        .png()
        .toBuffer();
};

const getColorStart = (
  artworkSize: number,
  fillPercentage: number,
  waterline: number,
): number => {
  if (fillPercentage === 0) {
    return artworkSize;
  }
  if (fillPercentage === 100) {
    return 0;
  }
  return Math.max(0, waterline - waterlineOverlap);
};

const buildProgressSmiley = async (
  size: number,
  faceDiameter: number,
  fillPercentage: number,
  grayBrightness: number,
): Promise<Buffer> => {
  const artworkSize = Math.round(
    (faceDiameter * sourceViewBoxSize) / faceDiameterInSource,
  );
  const artworkOffset = Math.round((size - artworkSize) / 2);
  const waterlineInSource =
    faceBottomY - (faceDiameterInSource * fillPercentage) / 100;
  const waterline = Math.round(
    (artworkSize * waterlineInSource) / sourceViewBoxSize,
  );
  const colorStart = getColorStart(artworkSize, fillPercentage, waterline);
  const [colorArtwork, grayArtwork] = await Promise.all([
    renderArtwork(artworkSize),
    renderArtwork(artworkSize, grayBrightness),
  ]);
  const layers: Array<OverlayOptions> = [];

  if (waterline > 0) {
    layers.push({
      input: await sharp(grayArtwork)
        .extract({ height: waterline, left: 0, top: 0, width: artworkSize })
        .toBuffer(),
      left: artworkOffset,
      top: artworkOffset,
    });
  }
  if (colorStart < artworkSize) {
    layers.push({
      input: await sharp(colorArtwork)
        .extract({
          height: artworkSize - colorStart,
          left: 0,
          top: colorStart,
          width: artworkSize,
        })
        .toBuffer(),
      left: artworkOffset,
      top: artworkOffset + colorStart,
    });
  }

  return sharp({
    create: {
      background: { alpha: 0, b: 0, g: 0, r: 0 },
      channels: 4,
      height: size,
      width: size,
    },
  })
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toBuffer();
};

const writeOpaqueIcon = async (
  name: string,
  smiley: Buffer,
  background: string,
): Promise<void> => {
  // The App Store rejects iOS app icons with an alpha channel.
  await sharp(smiley)
    .flatten({ background: background })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(join(assetsDirectory, name));
  console.log(`Wrote assets/${name}.`);
};

const writeTransparentIcon = async (
  name: string,
  smiley: Buffer,
): Promise<void> => {
  await sharp(smiley)
    .png({ compressionLevel: 9 })
    .toFile(join(assetsDirectory, name));
  console.log(`Wrote assets/${name}.`);
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

const [lightSmiley, darkSmiley, androidSmiley] = await Promise.all([
  buildProgressSmiley(
    iconSize,
    iconFaceDiameter,
    fillPercentage,
    lightModeGrayBrightness,
  ),
  buildProgressSmiley(
    iconSize,
    iconFaceDiameter,
    fillPercentage,
    darkModeGrayBrightness,
  ),
  buildProgressSmiley(
    androidSize,
    (androidSize * androidFaceUnits) / androidUnits,
    fillPercentage,
    lightModeGrayBrightness,
  ),
]);

const tintedSmiley = await sharp(darkSmiley).grayscale().png().toBuffer();

await Promise.all([
  writeOpaqueIcon("icon-light.png", lightSmiley, cream),
  writeOpaqueIcon("icon-dark.png", darkSmiley, ink),
  writeOpaqueIcon("icon-tinted.png", tintedSmiley, black),
  writeTransparentIcon("splash-icon-light.png", lightSmiley),
  writeTransparentIcon("splash-icon-dark.png", darkSmiley),
  writeTransparentIcon("android-icon.png", androidSmiley),
]);

console.log(`Filled the smiley ${fillPercentage} %.`);
