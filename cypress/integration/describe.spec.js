/// <reference types="cypress" />

it('An external test', () => {

})

describe('Group tests', () => {

  describe('more specific test', () => {
    it.skip('An more internal test', () => {

    })
  })

  it('An internal test', () => {

  })
})
