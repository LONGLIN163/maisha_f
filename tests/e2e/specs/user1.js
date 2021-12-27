// https://docs.cypress.io/api/introduction/api.html

/**
 * test senario 1 - user buy a product from home page
 */
describe('test senario 1 - user buy a product from home page', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/")
    cy.viewport("iphone-x")

    cy.wait(3000);
    cy.clearLocalStorage();
  })

  it("search a product, test input field should work",() => {
    // current function is in progress
    cy.get('[data-test="search-input"]')
     .type("mango")
    cy.get('[data-test="search-input"]')
     .should("have.value","mango")
  })

  it("buy a product form hot product should work",() => {
    
    cy.url().then(value=>{
        cy.log("***current url=***"+value)
    })

    cy.log("***1 go to one product detail page***")
    cy.get('.goods-info').first().click()
    cy.url().should('include','/goods')
    cy.contains("ADD TO CART")

    cy.log("***2 click Comment, test interal tab of this page***")
    cy.contains('Comment').click()
    cy.contains("no any comments...")

    cy.log("***3 click add to product, then go to cart page***")
    cy.get('[data-test="addtocard"]').click()
    cy.url().should('include','/cart')

    cy.log("***4 go back the product detail page***")
    cy.go('back')
    cy.contains("ADD TO CART")

    cy.log("***5 go back the home page***")
    cy.go('back')
    cy.contains("Fruits and Vegetables")

  })
})


