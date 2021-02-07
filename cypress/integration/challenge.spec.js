/// <reference types="cypress" />

describe('Challenge', () => {

    before(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
      cy.reload()
    })

    it('Validates form required fields', () => {
      const stub = cy.stub().as('alerta')
      cy.on('window:alert', stub)

      cy.get('#formCadastrar').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
      })

      cy.get('#formNome').type('Nome')

      cy.get('#formCadastrar').click().then(() => {
        expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
      })

      cy.get('#formSobrenome').type('Sobrenome')

      cy.get('#formCadastrar').click().then(() => {
        expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
      })

      cy.get('#formSexoMasc').click()

      cy.get('#formCadastrar').click()

      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
      cy.get('#descNome > span').should('contain', 'Nome')
      cy.get('#descSobrenome > span').should('contain', 'Sobrenome')
      cy.get('#descSexo > span').should('contain', 'Masculino')
      cy.get('#descComida > span').should('be.empty')
      cy.get('#descEscolaridade > span').should('contain', '1grauincomp')
      cy.get('#descEsportes > span').should('be.empty')
      cy.get('#descSugestoes > span').should('be.empty')

    })
})