// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('addImage', imagePath => {
    cy
    .fixture(imagePath)
    .as('uploadImage')
    .get('[data-cy-image]')
    .then(el => {
        console.log(imagePath)
        return Cypress.Blob.base64StringToBlob(this.uploadImage, 'image/png').then(blob => {
            function FileListItem(a) {
                a = [].slice.call(Array.isArray(a) ? a : arguments);
                for (var c, b = (c = a.length), d = !0; b-- && d;) d = a[b] instanceof File;
                if(!d) throw new TypeError('expected argument to FileList')
                for(b = new ClipboardEvent(' ').clipboardData || new DataTransfer(); c--;) b.items.add(a[c])
                return b.files;
            }
            const files = [new File([blob], image, {type: image/png})];
            el[0].files = new FileListItem(files)
            cy.get(btnSelector).click()
        })
    })
})

Cypress.Commands.add('login', (email, password) => { 
    cy.get('[data-cy-email]').type(email)
    cy.get('[data-cy-password]').type(password)
    cy.get('[data-cy="submitLogin"]').click()
  })