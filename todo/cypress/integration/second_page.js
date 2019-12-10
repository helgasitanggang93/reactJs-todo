
beforeEach(()=>{
    cy.visit('http://localhost:8080/')
    cy.login('kosasih@mail.com', 'naruto')
})

describe('create data', ()=> {
    it('should create data properly', () => {
        cy.get('[data-cy-click="createTodo"]').click()
        cy.get('[data-cy-title]').type('testing')
        cy.get('[data-cy-description]').type('testing react with cypress')
        cy.get('[data-cy-date]').type('2019-12-25')
        cy.get('[data-cy-create="submitData"]').click()
    })
})

describe('should done/undone properly', ()=> {
    it('should done properly', ()=>{
        cy.get('[data-cy-seedetail]').first().click()
        cy.get('[data-cy-undone]').click()
        cy.get('[data-cy-closedetail]').click()
    })
    it('should undone properly', ()=>{
        cy.get('[data-cy-seedetail]').first().click()
        cy.get('[data-cy-done]').click()
        cy.get('[data-cy-closedetail]').click()
    })
})

describe('should delete properly', ()=> {
    it('delete selected data', () => {
        cy.get('[data-cy-seedetail]').first().click()
        cy.get('[data-cy-delete]').click()
    })
})