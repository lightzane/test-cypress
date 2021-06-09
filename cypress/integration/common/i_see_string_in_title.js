import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then(`I see {string} on the title`, (title) => {
    cy.title().should('include', title);
});
