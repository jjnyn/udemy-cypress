/// <reference types="Cypress" />

describe("Test EA Application", () => {

    before("Login to application", () => {
        //Visiting website
        cy.visit("http://eaapp.somee.com/");
        cy.fixture("eauser").as("user");

    })

    it("Performing Benefit check", () => {

        //long way of working with Promise (closure)
        //cy.get("#loginLink").then(($link) => {
        //    return $link.text();
        //}).as("linkText");
        
        //shorten way of working with promise using invoke
        cy.get("#loginLink").invoke('text').as("linkText");
    
        cy.contains("Login").click();
    
        cy.get("@linkText").then(($x) => {
            expect($x).is.eql("Login");
        })
    
        cy.url().should("include","/Account/Login");

        cy.get("@user").then((user) => {
            cy.get("#UserName").type(user.UserName);
            cy.get("#Password").type(user.Password);
        })
        
        cy.get(".btn").click({force: true});
    
        //Click employee list
        cy.contains("Employee List").click();
    
        cy.get(".table").find("tr").contains("Prashanth").parent().contains("Benefits").click();
    
        cy.get(".table").find("tr").as("rows");
    
        cy.get("@rows").then(($row) => {
            cy.wrap($row).click({multiple: true});
        })
    
        //verify the value from a property
        cy.wrap({name: "Karthik"}).should("have.property","name").and("eq","Karthik");
    
        //using wrap
        //cy.get(".table").find("tr > td").then(($td) => {
        //    cy.wrap($td).contains("John").invoke("wrap").parent().contains("Benefits").click();
        //})
    })

    
})
