import { Example } from '@fixtures/example.model';
import { Pokemon } from '@models/pokemon.model';

Cypress.config('baseUrl', 'https://pokeapi.co/api/v2/');
const google = 'https://google.com';

let sampleData: Example;

before(() => {
    cy.fixture('example').then((data) => {
        sampleData = data;
    });
});

describe('Visit Google and Search for IU', () => {
    let keyword: string;

    beforeEach(() => {
        keyword = sampleData.google.keyword;
    });

    it('should open google page', () => {
        cy.visit(google);
    });

    it(`should type the keyword`, () => {
        cy.get('.gLFyf').as('searchField'); // the DOM element has now an alias of 'searchField'
        cy.get('@searchField')
            .type(keyword)
            .then(($nav) => {
                expect($nav.val()).eq(keyword); // value came from fixtures
                cy.log(`Searched for ${keyword}`);
                cy.log('Use .val() to get values from Input elements');
                cy.log('Use .text() to get value from non-Input elements?');
            });
        cy.get('@searchField').type('{enter}');
        cy.get('.GmE3X').as('labelImageResult'); // the DOM element has now an alias of 'labelImageResult'
        cy.get('@labelImageResult').should('have.text', `Images for ${keyword}`);
    });
});

// Suddenly a pokemon appeared !
describe('A pokemon appeared!', () => {
    let pokemon: string;

    beforeEach(() => {
        pokemon = `Bulbasaur`;
    });

    it('Send a rest-api request to identify the pokemon in the response', () => {
        cy.request(`GET`, `/pokemon/${pokemon.toLowerCase()}`).as('myrequest');

        cy.get<Cypress.Response<Pokemon>>('@myrequest').then((response) => {
            expect(response).to.have.property('body');
            expect(response.status).eq(200);
            expect(response.body.name).eq(pokemon.toLowerCase());

            // list pokemon type
            let types = response.body.types;
            types.forEach((value, index, array) => {
                cy.log(value.type.name);
            });
        });
    });
});
