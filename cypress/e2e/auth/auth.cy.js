/// <reference types="cypress" />

describe('Rater', () => {
  beforeEach(() => {
    cy.visit('http://0.0.0.0:3000')
  })

  it('displays the home page', () => {
    cy.get('[data-cy="rater-logo"]').should('exist')
  })

  it('can login as admin', () => {
    cy.getStarted()
    cy.url().should('include', '/login')
    cy.login('admin', 0)
    cy.url().should('include', '/galleries')
  })

  it('allows admin to create a new gallery', () => {
    cy.getStarted()
    cy.login('admin', 0)
    cy.get('[data-cy="new-gallery-btn"]').click()
    cy.url().should('include', '/new-gallery')
  })
})
