/// <reference types="Cypress" />

describe("Test LamdaTest Website XHR", () => {


    before("Navigate to LambdaTest",() => {
        cy.visit("https://accounts.lambdatest.com/login");
    })

    it("Perform Login and verify XHR", () => {

        //start the server
        cy.server();

        cy.route({
            method:"GET",
            url: "/api/user/organization/team"
        }).as("team");




        cy.fixture("lamdaUser").as("lamdauser");

        cy.get("@lamdauser").then((lamdauser) => {
            cy.get("[name='email']").debug().type(lamdauser.UserName);
            cy.get("[name='password']").debug().type(lamdauser.Password,{log:false});  
        })
        
        cy.get("[class='btn btn-primary btn-lg btn-block mt-3']").click();


        cy.get("@team").then((xhr) => {
            expect(xhr.status).to.eq(200);
        })
    })

})