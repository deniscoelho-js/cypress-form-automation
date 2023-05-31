Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Denis")
  cy.get("#lastName").type("Coelho")
  cy.get("#email").type("denis@email.com")
  cy.get("#open-text-area").type("Teste")
  cy.get('button[type="submit"]').click()
})
