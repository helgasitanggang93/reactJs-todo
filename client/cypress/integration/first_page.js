import axiosTodo from '../../src/apis/api_todo';

const deleteMany = () => {
    axiosTodo({
        url: '/deleteTesting',
        method: 'DELETE',
    })
}



describe('testing login page, register page', ()=>{
    it('visit react todo app in http://localhost:8080/', () => {
        cy.visit('http://localhost:8080/')
    })

    it('should register properly', ()=> {
        cy.get('[ data-cy-nav-toregister]').click()
        cy.get('[data-cy-register-name]').type('kosasih')
        cy.get('[data-cy-register-email]').type('kosasih@mail.com')
        cy.get('[data-cy-register-password]').type('naruto')
        cy.get('[data-cy-register-role]').select('se')
        cy.get('[data-cy-register="submit"]').submit()
        cy.get('.swal2-confirm').click()  
    })

    it('should login properly', () => {
        cy.get('[data-cy-email]').type('kosasih@mail.com')
        cy.get('[data-cy-password]').type('naruto')
        cy.get('[data-cy="submitLogin"]').click()
    })

    
})


