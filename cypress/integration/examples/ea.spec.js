/// <reference types="Cypress" />

describe("Testing of EA App", () => {

    it("Login Application", () => {

        //Visiting website
        cy.visit("http://eaapp.somee.com/");

        //long way of working with Promise (closure)
        //cy.get("#loginLink").then(($link) => {
        //    return $link.text();
        //}).as("linkText");
        //cy.get("#loginLink").invoke('text').as("linkText");
        
        //shorten way of working with promise using invoke
        cy.get("#loginLink").invoke('text').as("linkText");

        cy.contains("Login").click();

        cy.get("@linkText").then(($x) => {
            expect($x).is.eql("Login");
        })


        cy.url().should("include","/Account/Login");

        cy.get("#UserName").type("admin");

        cy.get("#Password").type("password");

        cy.get(".btn").click({force: true});

        //Click employee list
        cy.contains("Employee List").click();

        //Table
        cy.get(".table").find("tr").contains("Prashanth").parent().contains("Benefits").click();

        cy.get(".table").find("tr").as("rows");

        cy.get("@rows").then(($row) => {
            cy.wrap($row).click({multiple: true});
        })
    })
})