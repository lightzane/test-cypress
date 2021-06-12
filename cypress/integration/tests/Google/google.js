import { Given, When } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://google.com';

Given('I open Google page', () => {
    cy.visit(url);
});

When(`I type {string} in the textfield`, () => {
    cy.get('.gLFyf').type('IU').type('{enter}');
});

When('I click on image tab', () => {
    cy.contains('Images').click();
});
