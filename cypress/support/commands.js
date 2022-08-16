// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getStarted', () => {
  cy.visit('http://0.0.0.0:3000')
  cy.get('[data-cy="get-started-btn"]').click()
})

Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-cy="username"]').type(username)
  cy.get('.pincode-input-text').each(($el) => cy.wrap($el).type(password))
  cy.get('[data-cy="login-btn"]').click()
})

Cypress.Commands.add('createGallery', (name, password) => {
  cy.get('[data-cy="new-gallery-btn"]').click()
  cy.get('[data-cy="gallery-name"]').type(name)
  cy.get('[data-cy="gallery-password"]').type(password)
  cy.get('[data-cy="create-gallery-btn"]').click()
})

Cypress.Commands.add('deleteGallery', () => {
  cy.get('[data-cy="open-delete-modal-btn"]').click()
  cy.get('[data-cy="delete-gallery-btn" ]').click()
})

Cypress.Commands.add('openGallery', (name) => {
  cy.get(`[data-cy="go-to-gallery-btn-${name}"]`).click()
})

Cypress.Commands.add('goBackToGalleryList', () => {
  cy.get(`[data-cy="back-to-galleries-link""]`).click()
})
