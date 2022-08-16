/// <reference types="cypress" />

const GALLERY_NAME = 'test-gallery'
const GALLERY_PASSWORD = 'test-password'

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

  it('allows admin to create a new gallery and delete it', () => {
    cy.getStarted()
    cy.login('admin', 0)
    cy.get('[data-cy="new-gallery-btn"]').click()
    cy.url().should('include', '/new-gallery')
    cy.get('[data-cy="gallery-name"]').type(GALLERY_NAME)
    cy.get('[data-cy="gallery-password"]').type(GALLERY_PASSWORD)
    cy.get('[data-cy="create-gallery-btn"]').click()
    cy.get('[data-cy="results-table"]').should('exist')
    cy.get('[data-cy="open-delete-modal-btn"]').click()
    cy.get('[data-cy="delete-gallery-btn"]').click()
    cy.url().should('include', '/galleries')
    cy.contains(GALLERY_NAME).should('not.exist')
  })
})
