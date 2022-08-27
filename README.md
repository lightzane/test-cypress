# Test my App

<p>
  <img src="https://img.shields.io/badge/-cypress-lightblue"/>
  <img src="https://img.shields.io/badge/-typescript-blue"/>
</p>

Using Cypress Typescript

```
npm install -D cypress@9.2.0 --save-exact
```

**package.json**

```json
"scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "cy:install": "cypress install --force",
    "cy:clear": "cypress cache clear",
    "cy:verify": "cypress verify"
},
```

## Setup Cypress

0. Run Cmd as Admin
1. `npm run cy:open`
2. if you see the word "first time".
3. Run the following command before `npm run cy:open`
4. `npm run cy:clear`
5. `npm run cy:install`
6. `npm run cy:verify`
7. There should be verified cypress.exe
8. (OPTIONAL) [Use Cypress with Typescript](#cypress-with-typescript)

## Cypress with Typescript

```
npm i -D typescript
```

**tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```

And say you are using **Custom Commands** with Cypress like for example:

**cypress/support/command.ts**

```ts
Cypress.Commands.add('anything', () => {
    cy.visit('https://example.cypress.io');
});

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})
```

We have to update the following

**cypress/support/index.ts**

```ts
declare global {
    namespace Cypress {
        interface Chainable {
            anything(): Chainable<Element>;
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            dataCy(value: string): Chainable<Element>
        }
    }
}
```

**cypress.json**

```json
{
  "$schema": "https://on.cypress.io/cypress.schema.json",
  "ignoreTestFiles": "**/z-ignore/**"
}
```

## Install Cypress Binary Later

When installing Cypress, 2 things are happening:

- Cypress node_modules is installed
- Cypress Binary / Application is installed

If you only want to install just the node_modules, create `.npmrc` in root directory

**.npmrc**

```
CYPRESS_INSTALL_BINARY=0
```

You can also force Cypress to skip the installation of the binary application by setting `CYPRESS_INSTALL_BINARY=0`. This could be useful if you want to prevent Cypress from downloading the Cypress binary at the time of `npm install`.

Reference: https://docs.cypress.io/guides/references/advanced-installation#Skipping-installation
