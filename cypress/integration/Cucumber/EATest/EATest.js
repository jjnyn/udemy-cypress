import { Given } from "cypress-cucumber-preprocessor/steps"


Given(`I visit EA Site`, () => {
    //Visit ExecuteAutomation Website
    cy.visit('http://eaapp.somee.com/')
})


Given(`I click login link`, () => {
    cy.contains('Login').click();
})

// Given(`I login as user with {string} and {string}`, (userName, password) => {
//     //Enter username and password
//     cy.get('#UserName').type(userName);
//     cy.get('#Password').type(password,{log:false});
//     cy.get('.btn').click();
// })

Given(`I login as following`, datatable => {

    datatable.hashes().forEach(row => {
        cy.get('#UserName').type(row.userName);
        cy.get('#Password').type(row.Password,{log:false});
    });

    cy.get('.btn').click();
})