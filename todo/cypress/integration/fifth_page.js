beforeEach(()=>{
    cy.visit('http://localhost:8080/')
    cy.login('kosasih@mail.com', 'naruto')
})

describe('should update data properly', () => {
    it('update data success', ()=>{
        cy.get('[data-cy-seedetail]').first().click()
        cy.get('[data-cy-update]').click()
        cy.get('[data-cy-title]').clear({force: true})
        cy.get('#data-cy-title-update').type('haloo', {force: true})
        cy.get('[data-cy-description]').clear({force: true})
        cy.get('#data-cy-description-update').type('haloo sekarang aku mengupdate data', {force: true})
        cy.get('[data-cy-date]').clear({force: true})
        cy.get('#data-cy-date-update').type('2019-12-28', {force: true})
        cy.get('#data-cy-submit-form').submit()
    })
    
})