/// <reference types="Cypress" />

describe("Test LambdaTest Website XHR", () => {


    beforeEach("Navigate to LambdaTest",() => {
        cy.visit("https://accounts.lambdatest.com/login");
    })

    it("Perform Login and verify XHR", () => {

        //start the server
        cy.server();

        cy.route({
            method:"GET",
            url: "/api/user/organization/team"
        }).as("team");

        cy.route({
            method:"GET",
            url: "/api/user/organization/automation-test-summary"
        }).as("apicheck");


        cy.fixture("lamdaUser").as("lamdauser");

        cy.get("@lamdauser").then((lamdauser) => {
            cy.get("[name='email']").debug().type(lamdauser.UserName);
            cy.get("[name='password']").debug().type(lamdauser.Password,{log:false});  
        })
        
        cy.get("[class='btn btn-primary btn-lg btn-block mt-3']").click();


        cy.get("@team").then((xhr) => {
            expect(xhr.status).to.eq(0);
            expect(xhr.response.body.data[0]).to.have.property("name","Jia-Jen"); 
            expect(xhr.response.body.data[0]).to.have.property("role","Admin"); 
        })

        //traffic interseption - explicit assertion
        cy.get('@apicheck').then(function (xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).to.have.property("maxQueue",10);
        })

        //implicit assertion
        cy.get("@apicheck").its("response.body").should("have.property","maxQueue").and("eql",10);
    })



    it("Verify LambdaTest cookies", () => {

        cy.fixture("lamdaUser").as("lamdauser");

        cy.get("@lamdauser").then((lamdauser) => {
            cy.get("[name='email']").debug().type(lamdauser.UserName);
            cy.get("[name='password']").debug().type(lamdauser.Password,{log:false});  
        })
        
        cy.get("[class='btn btn-primary btn-lg btn-block mt-3']").click();

        cy.getCookie("user_id").should("have.property","value","94169");
    })

})