/// <reference types="Cypress" />

describe("Test EA Application", () => {

    before("Login to application", () => {
        //Visiting website
        cy.visit("/");
        cy.fixture("eauser").as("user");

        cy.get("@user").then((user) => {
            cy.login(user.UserName,user.Password);
        })


    })

    it("Performing Benefit check", () => {
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
