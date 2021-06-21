import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(`I see {string} on the title`, (title: string) => {
    cy.log('I was here');
    cy.title().should('include', title);
});
