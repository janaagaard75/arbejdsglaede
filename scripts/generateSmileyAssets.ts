import { join } from "node:path";
import sharp from "sharp";

const imageSize = 512;
const smileySourceDirectory = join(
  import.meta.dirname,
  "..",
  "assets-src",
  "smiley",
);
const smileyOutputDirectory = join(
  import.meta.dirname,
  "..",
  "assets",
  "smiley",
);
const sourcePath = join(
  smileySourceDirectory,
  "fluent-grinning-face-with-smiling-eyes.svg",
);
const colorOutputPath = join(
  smileyOutputDirectory,
  "fluent-grinning-face-with-smiling-eyes-color.png",
);
const lightModeGrayOutputPath = join(
  smileyOutputDirectory,
  "fluent-grinning-face-with-smiling-eyes-gray-light-mode.png",
);
const darkModeGrayOutputPath = join(
  smileyOutputDirectory,
  "fluent-grinning-face-with-smiling-eyes-gray-dark-mode.png",
);

const renderSmiley = () =>
  sharp(sourcePath).resize(imageSize, imageSize).png({ compressionLevel: 9 });

await Promise.all([
  renderSmiley().toFile(colorOutputPath),
  renderSmiley()
    .grayscale()
    .modulate({ brightness: 1.15 })
    .toFile(lightModeGrayOutputPath),
  renderSmiley()
    .grayscale()
    .modulate({ brightness: 0.6 })
    .toFile(darkModeGrayOutputPath),
]);

console.log(
  `Wrote the color, light-mode gray and dark-mode gray ${imageSize} px smiley assets.`,
);
