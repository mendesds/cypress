/// <reference types="cypress" />

describe('Esperas...', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retries', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()

        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        // Tomar cuidado com cache que o cypress faz no get -> find

        cy.get('#lista li span')
            .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()

        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it.only('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')  // Tem a conf global também, mas bom usar com cuidado

        cy.get('#buttonListDOM').click()
        // cy.wait(5000) usar com cuidado, casos isolados

        // da para por timeout maior, se resolver antes ele já para
        cy.get('#lista li span', { timeout: 30000 })
            .should('contain', 'Item 2')
    })

    it('Click Retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()

        // should vs then: should tenta varias vezes, then aguarda concluir para continuar
        // cy.get('#lista li span').should($el => {
        cy.get('#lista li span').then($el => {
            // should('have.length', 1)
            console.log($el)
            expect($el).to.have.length(1)
        })

        // cy.get('#lista li span').should($el => {
        //     // should('have.length', 1)
        //     console.log($el)
        //     expect($el).to.have.length(1)
        // })

        // should sempre retorna o mesmo objeto que recebeu, no then é possível alterar o retorno
        cy.get('#buttonListDOM').should($el => {
            // should('have.length', 1)
            console.log($el)
            expect($el).to.have.length(1)
            return 2
        }).and('have.id', 'buttonListDOM')

        // Should + get aninhado = pode entrar em loop
    })


})