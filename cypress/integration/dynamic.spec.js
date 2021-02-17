/// <reference types="cypress" />

describe('Dynamic Tests', () => {

  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  const foods = ['carne', 'frango', 'pizza', 'vegetariano']

  foods.forEach( food => {
    it(`Cadastro com a comida ${food}`, () => {
      cy.fixture('userData').as('usuario').then(function () {
        cy.get('#formNome').type(this.usuario.nome)
        cy.get('#formSobrenome').type(this.usuario.sobrenome)
        cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
        cy.get(`[name=formComidaFavorita][value=${food}]`).click()
        cy.get('#formEscolaridade').select(this.usuario.escolaridade)
        cy.get('#formEsportes').select(this.usuario.esportes)
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
      })

    })
  })

  it('Deve selecionar todos usando o each', () => {
    cy.fixture('userData').as('usuario').then(function () {
      cy.get('#formNome').type(this.usuario.nome)
      cy.get('#formSobrenome').type(this.usuario.sobrenome)
      cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
      cy.get(`[name=formComidaFavorita]`).each($el => {
        if ($el.val() != 'vegetariano') {
          cy.wrap($el).click()
        }
      })
      cy.get('#formEscolaridade').select(this.usuario.escolaridade)
      cy.get('#formEsportes').select(this.usuario.esportes)
      // cy.get('#formCadastrar').click()
      // cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

      cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
  })

})