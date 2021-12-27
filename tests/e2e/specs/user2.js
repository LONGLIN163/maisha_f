// https://docs.cypress.io/api/introduction/api.html

describe('test senario - 2', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/")
    cy.viewport("iphone-x")

    cy.wait(3000);
    cy.clearLocalStorage();
  })

  it("test input field should work",() => {
    cy.get('[data-test="search-input"]')
     .type("mango")
    cy.get('[data-test="search-input"]')
     .should("have.value","mango")// ✓
  })
})
