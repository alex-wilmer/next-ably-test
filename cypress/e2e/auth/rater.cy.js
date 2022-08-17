/// <reference types="cypress" />

const GALLERY_NAME = 'test-gallery'
const GALLERY_PASSWORD = 'test-password'

// todo: e2e command should start server if not running
// todo: github action
// todo: delete gallery btn from list page
// todo: make gallery list a table?
// todo: delete users
// todo: user table
// todo: cypress mongo uri

describe('Galleries', () => {
  beforeEach(() => {
    cy.getStarted()
    cy.login('admin', 0)
  })

  it('create, view in list, delete', () => {
    cy.createGallery(GALLERY_NAME, GALLERY_PASSWORD)
    cy.goBackToGalleryList()
    cy.openGallery(GALLERY_NAME)
    cy.deleteGallery()
  })
})
