/// <reference types="Cypress" />

context("Test API from the Fake JSON Server", () => {

    beforeEach("DELETE before creating a new value", () => {
        cy.request({
            method:'DELETE',
            url:'http://localhost:3000/posts/2',
            failOnStatusCode:false
        }).then((x) => {
            expect(x.body).to.be.empty
        })

    })

    it("Test GET functionality of JSON Sever", ()=>{
        cy.request("http://localhost:3000/posts/1").its('body').should('have.property','id');
    })

    it("Test POST functionality of JSON Server", () =>{
        cy.request({
            method:'POST',
            url:'http://localhost:3000/posts',
            body: {
                "id": 2,
                "title": "Executeautomation",
                "author": "KarthikKK"
            }
        }).then((res) =>{
            expect(res.body).has.property("title", "Executeautomation");
        })
    })

    it.only('API testing', () => {

        cy.request({
            method:'POST',
            url:'http://eaapp.somee.com/Account/Login',
            body: {
                "__RequestVerificationToken":"jJ27CGSB6SHC24F0oV5nGIcKmDPqG2WfwOCDZxTUIhJ8Tk9TiSYlzhrzuhP5Ct2rHTiOY46WawRVGy6qanY18HsdbKEeK0TqWjgOY9b6RZE1",
                "UserName": "admin",
                "Password": "password",
                "RememberMe": "false"
                },
                failOnStatusCode: false
        }).then(($res) => {
            expect($res.status).to.eql(500);
            expect($res.body).to.contain('<i>The required anti-forgery cookie &quot;__RequestVerificationToken&quot; is not present.</i>')
        })
    });


});
