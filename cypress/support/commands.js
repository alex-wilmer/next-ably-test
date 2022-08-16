// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-cy="username"]').type(username)
  cy.get('.pincode-input-text').each(($el) => cy.wrap($el).type(password))
  cy.get('[data-cy="login-btn"]').click()
})

Cypress.Commands.add('getStarted', () => {
  cy.get('[data-cy="get-started-btn"]').click()
})
