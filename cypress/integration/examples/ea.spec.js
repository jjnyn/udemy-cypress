/// <reference types="Cypress" />
import '@percy/cypress';

describe("Testing of EA App", () => {

    beforeEach("Call for a particular it block", () => {
        cy.visit("http://www.executeautomation.com/site");
    })

    it("Testing EA Site for assertion", () => {
        //implicit assertion
        //cy.get("[aria-label='jump to slide 2']",{timeout:60000}).should("have.class","ls-nav-active");

        cy.percySnapshot();
        //explicit assertion
        cy.get("[aria-label='jump to slide 2']",{timeout:60000}).should(($x) => {
            expect($x).to.not.be.null;
        });
        cy.percySnapshot();
    })
    it("Testing EA Site for assertion with hooks", () => {
        cy.percySnapshot();
        //explicit assertion
        cy.get("[aria-label='jump to slide 2']",{timeout:60000}).should(($x) => {
            expect($x).to.not.be.null;
        });
        cy.percySnapshot();
    })

})