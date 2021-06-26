# Test my App

<p>
  <img src="https://img.shields.io/badge/-cypress-lightblue"/>
  <img src="https://img.shields.io/badge/-cucumber-green"/>
  <img src="https://img.shields.io/badge/-typescript-blue"/>
</p>

Using Cypress Typescript with Cucumber (plugin)

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
8. (OPTIONAL) Install and Setup Cucumber plugin _(see below)_
9. (OPTIONAL) [Use Cypress with Typescript](#cypress-with-typescript)
10. (OPTIONAL) [Use Cypress+Cucumber with Typescript](#use-cypress-and-cucumber-with-typescript)

## Setup Cucumber

```
npm install --save-dev cypress-cucumber-preprocessor
```

### Cypress Configuration

Add it to your plugins:
`cypress/plugins/index.js`

```js
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
    on('file:preprocessor', cucumber());
};
```

Add support for feature files to your Cypress configuration
`cypress.json`

```json
{
    "testFiles": "**/*.{feature,features}"
}
```

To run bundled tests _(apply on script cy:run)_:

```
cypress run --spec **/*.features
```

### Configuration

Add this section to your:
**package.json**

```json
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true
}
```

## Organize Tests

### Single feature files

Put your feature files in `cypress/integration/`<br>
Example: cypress/integration/tests/Google.feature

```gherkin
Feature: Google Main Page

  I want to open a search engine

  @focus
  Scenario: Opening a search engine page
    Given I open Google page
    Then I see "Google" in the title
```

_The @focus tag is not necessary, but we want to you to notice it so you look it up below. **It will speed up your workflow significantly!**_

### Step Definitions

**This is the RECOMMENDED way**<br>
The `.feature` file will use steps definitions from a directory with the same name as your `.feature` file<br>
`cypress/integration/tests/Google/google.js` (or any other .js file in the same path)

```js
import { Given } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://google.com';
Given('I open Google page', () => {
    cy.visit(url);
});
```

### Reusable step definitions

Put them in `cypress/integration/common/`<br>
cypress/integration/common/i_see_string_in_title.js

```js
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(`I see {string} in the title`, (title) => {
    cy.title().should('include', title);
});
```

## Reference Type definitions (use this if NOT using Typescript)

**SKIP THIS STEP IF USING TYPESCRIPT**<br>
Add the following in the `js` file to have a an intellisense

```js
/// <reference types="Cypress" />
```

If you want it to be `Global`, create the file in root
**jsconfig.json**

```json
{
    "include": ["./node_modules/cypress", "cypress/**/*.js"]
}
```

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

## Use Cypress and Cucumber with Typescript

```
npm i -D tsify @cypress/browserify-preprocessor
```

**cypress/plugins/index.js**

```js
const cucumber = require('cypress-cucumber-preprocessor').default;
const browserify = require('@cypress/browserify-preprocessor');

module.exports = (on, config) => {
    const options = browserify.defaultOptions;
    options.browserifyOptions.plugin.unshift(['tsify']);
    // Or, if you need a custom tsconfig.json for your test files:
    // options.browserifyOptions.plugin.unshift(['tsify', {project: 'path/to/other/tsconfig.json'}]);

    on('file:preprocessor', cucumber(options));
};
```

### Given When Then + ( And / But )

#### Given

-   Precondition
-   are steps to put the system in a known state
-   For several Given, use "And" or "But" for the number 2 and upwards to make it more readable

#### When

-   User actions or events from another system
-   strongly recommended to only have a single "When" in a scenario

#### Then

-   are steps used to describe an expected outcome, or result.
-   For several Then, use "And" or "But" for the number 2 and upwards to make it more readable

```gherkin
Scenario: All done
  Given I am out shopping
  And I have eggs
  And I have milk
  And I have butter
  When I check my list
  Then I don't need anything


Scenario: All done
  Given I am out shopping
  * I have eggs
  * I have milk
  * I have butter
  When I check my list
  Then I don't need anything
```

Source: https://cucumber.io/docs/gherkin/reference/

## References

-   https://github.com/TheBrainFamily/cypress-cucumber-preprocessor
-   https://docs.cucumber.io/cucumber/cucumber-expressions/
-   https://cucumber.io/docs/gherkin/reference/
