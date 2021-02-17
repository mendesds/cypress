/// <reference types="cypress" />

describe('Time', () => {

    beforeEach(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '17/02/2021')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', "31/12/1969")

        // const date = new Date(2012, 3, 10, 15, 23, 50)
        // cy.clock(date.getTime())
        // cy.get('#resultado > span').should('contain', "17/02/2021")

    })

    it.only('Going to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.gt', 1613565734197)

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.gte', 0)

        cy.wait(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.gte', 0)


        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.gte', 5000)

    })


})