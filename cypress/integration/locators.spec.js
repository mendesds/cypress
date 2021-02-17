/// <reference types="cypress" />

describe('Locators', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Locators', () => {
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input').click()
    })

    it('Using Xpath', () => {
        // Vantagem do xpath é que permite "subir" no DOM igual no cd (../)
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Funciona')
    })
})
