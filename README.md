# Test my App

Using Cypress with Cucumber (plugin)

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

### Typescript definitions

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

## See more

-   https://github.com/TheBrainFamily/cypress-cucumber-preprocessor
-   https://docs.cucumber.io/cucumber/cucumber-expressions/
