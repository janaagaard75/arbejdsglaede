# Arbejdsglæde

Use the Node.js version in `.nvmrc` and the Yarn version pinned in `package.json`:

```sh
nvm use
corepack enable
yarn install
yarn start
```

Dependencies are installed in `node_modules`. This project does not use Zero-installs; commit `yarn.lock`, but not the dependency cache or install state.

## App download QR code

The download QR code points to <https://arbejdsglaede.henrikleth.com/download/>. The page in `docs/download/index.html` redirects Android browsers to [Google Play](https://play.google.com/store/apps/details?id=com.henrikleth.arbejdsglaede) and all other devices to the [Apple App Store](https://apps.apple.com/app/id6792886992). Browsers without JavaScript also default to the Apple App Store.

Use `qr-codes/download.svg` for print or `qr-codes/download.png` for a raster image. Both include the white margin needed for scanning; keep it when placing the code in a design.

GitHub Pages publishes the `docs` directory from `main`. Changes to the redirect page go live after they are pushed to `main` and the Pages deployment completes. The QR code can stay the same when store links change.
