/// <reference types="cypress" />

describe('Helpers...', () => {

    it('Wrap', () => {
        const obj =  { nome: 'User', idade: 123 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').then($el => {
            // $el.type('funciona?')
            // $el.val('funciona?')
            cy.wrap($el).type('funciona via cypress')
        })

        // Usando wrap conseguimos fazer sair no log do cypress manipulações diratas

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                setTimeout(10)
                resolve(10)
            })
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro'))
        promise.then(num => console.log(num))
        cy.wrap(promise).then(num => console.log(num))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo'))

        // Evitar usar async e await nas promises, deixar a cargo do cypress com cy.wrap

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)

        // Reforçando que com should retorna sempre o objeto de entrada, exemplo abaixo daria erro
        // cy.wrap(1).should(num => {
        //     return 2
        // }).should('be.equal', 2)
    })

    it('Its...', () => {
        const obj =  { nome: 'User', idade: 123 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 =  { nome: 'User', idade: 123, endereco: { rua: 'dos bobos'} }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equals', 20)
    })

    it.only('Invoke...', () => {
        const getValue = () => 1
        const soma = (a,b) => a + b
        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via invoke')

        cy.window().invoke('alert', 'Dá pra ver?')

        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked!">')
    })

})