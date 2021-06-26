# Test my App

<p>
  <img src="https://img.shields.io/badge/-cypress-lightblue"/>
  <img src="https://img.shields.io/badge/-typescript-blue"/>
</p>

Using Cypress Typescript

```
npm install -D cypress
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
        "target": "es6",
        "lib": ["es6", "dom"],
        "types": ["cypress"],
        "moduleResolution": "Node"
    },
    "include": ["**/*.ts"]
}
```

**cypress.json**

```json
{
    "testFiles": ["**/*.ts"]
}
```
