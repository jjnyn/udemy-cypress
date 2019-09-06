/// <reference types="Cypress" />

context("Actions", () => {
    beforeEach(() => {
        //visit demo website - reading from environment variables
        cy.visit("https://fineuploader.com/demos.html");
    
    
    })

    it("File upload demo", () => {
        cy.percySnapshot();
        cy.fixture("EAWeekly.png","base64").then(fileContent => {
            cy.get("#fine-uploader-gallery > .qq-uploader-selector > .qq-upload-button-selector > input").upload({
                fileContent,
                fileName: "EAWeekly.png",
                mimeType: "image/png"
            },
                {
                    uploadType: "input"
                })

        })
        cy.percySnapshot("after");
    })
})
// const fileName = 'data.json';
 
// cy.fixture(fileName).then(fileContent => {
//   cy.get('[data-cy="file-input"]').upload({ fileContent, fileName, mimeType: 'application/json' });
// });