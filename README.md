# Arbejdsglæde

Use the Node.js version in `.nvmrc` and the Yarn version pinned in `package.json`:

```sh
nvm use
corepack enable
yarn install
yarn start
```

Dependencies are installed in `node_modules`. This project does not use Zero-installs; commit `yarn.lock`, but not the dependency cache or install state.
