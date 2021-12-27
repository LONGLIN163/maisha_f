// https://docs.cypress.io/api/introduction/api.html


describe('Test user shopping senarios', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/")
    cy.viewport("iphone-x")
    
    cy.wait(3000);
    cy.clearLocalStorage();
  })

  /**
   * home page testing - mainly testing router
   *                     
   */

  it("search a product, test input field should work",() => {

    cy.log("***click list, check router***")
    cy.get('[data-test="tab-list"]').click()
    cy.url().should('include','/categorylist')

    cy.log("***click shopping cart, check router***")
    cy.get('[data-test="tab-cart"]').click()
    cy.url().should('include','/cart')

    cy.log("***click account, check router***")
    cy.get('[data-test="tab-account"]').click()
    cy.url().should('include','/member')

    cy.log("***click home, check router***")
    cy.get('[data-test="tab-shop"]').click()
    cy.url().should('include','/')
    cy.contains("Fruits and Vegetables").should("exist")

    // test if the input field can be inputed,but current function is unfinished

    cy.log("***test if the input field can be inputed***")
    cy.get('[data-test="search-input"]')
     .type("mango")
    cy.get('[data-test="search-input"]')
     .should("have.value","mango")
  })

  /**
   * senario 1 - user buy a product from home page,
   *             and test all relevant elements through this process. 
   */

  it("buy a product form hot product should work",() => {
    
    cy.url().then(value=>{
        cy.log("***current url=***"+value)
    })

    cy.log("***1 go to one product detail page***")
    cy.get('.goods-info').first().click()
    cy.url().should('include','/goods')
    cy.contains("ADD TO CART").should("exist")

    cy.log("***2 click Comment, test interal tab of this page***")
    cy.contains('Comment').click()
    cy.contains("no any comments...").should("exist")

    cy.log("***3 click add to product, then go to cart page***")
    cy.get('[data-test="addtocard"]').click()
    cy.url().should('include','/cart')

    // ignore the rest of test on the cart page

    cy.log("***4 go back the product detail page***")
    cy.go('back')
    cy.contains("ADD TO CART").should("exist")

    cy.log("***5 go back the home page***")
    cy.go('back')
    cy.contains("Fruits and Vegetables").should("exist")

  })

  /**
   * senario 2 - user buy a product from list page,
   *             and test all relevant elements through this process. 
   */
  
  it("buy a product form the list page should work",() => {
    
    cy.log("***1 go to one user page***")
    cy.get('[data-test="tab-list"]').click()
    cy.url().should('include','/categorylist')
    
    cy.log("***2 check left nav elements on the list page***")
    cy.contains("Category").should("exist")
    cy.contains("Commodity",{timeout:3*1000}).should("exist")
    
    cy.log("***3 check sub nav elements loaded after select one left navbar***")
    cy.get("#leftNav > ul > li:nth-child(2)").then(el=>{
      expect(el.text().trim()).to.eq("Drinks") 
    }).click()
    cy.contains("Beer",{timeout:3*1000}).should("exist")

    cy.log("***4 click one item and check if go to product detail***")
    cy.wait(5000)
    cy.get("#list-div > div > div > div.van-list > div:nth-child(2)").click()
    cy.url().should('include','/goods') // The test should be fine  when the page can come to product detail page, no need to dive deeper
    cy.contains("ADD TO CART").should("exist")

    // ignore add to cart and comment tabs test...

    cy.log("***5 go back the list page***")
    cy.go('back')
    cy.url().should('include','/categorylist')
    cy.contains("Category").should("exist")
    cy.contains("Commodity").should("exist")

  })

})


