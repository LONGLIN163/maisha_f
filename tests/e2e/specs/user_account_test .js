// https://docs.cypress.io/api/introduction/api.html


describe('Test user account management senarios', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/")
    cy.viewport("iphone-x")
    
    cy.wait(3000);

    cy.clearLocalStorage();
  })

  /**
   * login testing - test validation and the page location after login 
   *                     
   */

  it("login validation should work",() => {

    cy.log("***go to one user page***")
    cy.get('[data-test="tab-account"]').click()
    cy.url().should('include','/member')
    
    cy.log("***do login***")
    cy.get('[data-test="loginbtn"]').click()

    cy.get('[data-test="username"]').type("haha")
    cy.get('[data-test="password"]').type("abc")

    cy.get('[data-test="loginsubmit"]').click()

    cy.contains("username can not be less than 5 digit").should("exist")
    cy.contains("password can not be less than 6 digit").should("exist")

    cy.url().then(value=>{
        cy.log("***current url=***"+value)
    })
  })

  it("login should success",() => {

    cy.log("***go to one user page***")
    cy.get('[data-test="tab-account"]').click()
    cy.url().should('include','/member')
    
    cy.log("***do login***")
    cy.get('[data-test="loginbtn"]').click()
    cy.get('[data-test="username"]').type("justAtest")
    cy.get('[data-test="password"]').type("123456justAtest")
    cy.get('[data-test="loginsubmit"]').click()
    cy.url().then(value=>{
        cy.log("***current url=***"+value)
    })
    cy.log("***go to the home page automatically after login***")
    cy.contains("Fruits and Vegetables")
  })

  // ***ignore failed login test due to the saving login status bug**** 

  /**
   * ignore test for regist...
   *                     
   */
})


