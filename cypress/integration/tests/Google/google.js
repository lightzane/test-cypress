import { Before, Given, When } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://google.com';
let sampleData;

Before(() => {
    // 'example' is the name of the fixture
    // to store data from static json
    // and be used later
    cy.fixture('example').then((data) => {
        sampleData = data;
    });
});

Given('I open Google page', () => {
    cy.visit(url);
});

When(`I type {string} in the textfield`, (keyword) => {
    cy.get('.gLFyf').as('searchField'); // the DOM element has now an alias of 'searchField'
    cy.get('@searchField')
        .type(keyword)
        .then(($nav) => {
            expect($nav.val()).eq(sampleData.google.keyword); // value came from fixtures
            cy.log('Use .val() to get values from Input elements');
            cy.log('Use .text() to get value from non-Input elements?');
        });
    cy.get('@searchField').type('{enter}');
    cy.get('.GmE3X').as('labelImageResult'); // the DOM element has now an alias of 'labelImageResult'
    cy.get('@labelImageResult').should('have.text', `Images for ${keyword}`);
});
