


describe('react-app', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000');
    })

    it('test', () => {
        cy.get('#takeNote').should('exist')
      })

});