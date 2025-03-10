import {testRpgHomePage} from '../support/page-objects/homepage-po'
import {controleerSection, controleerTextVisible} from "../support/utils";
import {testRpgSharedPo} from "../support/page-objects/shared-po";

describe('Home page', () => {
  const homepage = new testRpgHomePage();
  const shared = new testRpgSharedPo()
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })



  describe('Show show elements on home page', () => {
    it('Should show login button', () => {
      shared.getLoginButton().should('be.visible').and('have.text', 'Login');
    })

    it('Should show button to testCoders website', () => {
      shared.getLoginButton().siblings('a').should('have.attr', 'href', 'https://www.testcoders.nl/')
    })

    it('Should show homepage title', () => {
      controleerTextVisible(shared.getPageTitle(), 'TestRPG')
    })

    it('Should show homepage sub-title', () => {
      controleerTextVisible(shared.getPageSubTitle(), 'TestRPG is a simple \'game\' meant to be automated through a Test Automation Framework.')
    })

    it('Should have button to start the game', () => {
      controleerSection(homepage.getSectionLinks(), 0).should('have.attr', 'href', '/play').should('have.text', 'Click here to play')
      controleerSection(homepage.getSectionLinks(), 0).click();
      cy.url().should('eq', 'http://localhost:3000/play');
    })

    it('Should have button to view project on git', () => {
      controleerSection(homepage.getSectionLinks(), 1).should('have.attr', 'href', 'https://www.github.com/marcelblijleven/testrpg').get('p').should('have.text', 'View on Github')
    })

    it('Should show text for API testing', () => {
     homepage.getSectionLinks().parent('div').find('div').find('div').should("have.text", 'TestRPG provides several API endpoints to use in a test suite')
    })

    it('Should link to API endpoints', () => {
     // homepage.getSectionLinks().parent('div').find('div').find('a').should("have.text", 'View api endpoints →').should("have.attr", 'href', '/api')
      homepage.getButtontoApi().should("have.text", 'View api endpoints →').should("have.attr", 'href', '/api');
      homepage.getButtontoApi().click();
      cy.url().should('eq', 'http://localhost:3000/api');``
    })

    }
  )

  describe('Login', () => {
    it('Should show elements on login popup', () => {
      shared.getLoginButton().click();
      controleerTextVisible(shared.getLoginPageTitle(), 'Login to TestRPG');
      controleerTextVisible(shared.getLoginPageSubTitle(), 'Any combination of email and password will work');
      controleerTextVisible(shared.getLoginEmailLabel(), 'Email');
      shared.getLoginEmail().should('be.visible');
      controleerTextVisible(shared.getPasswordLabel(), 'Password');
      shared.getPassword().should('be.visible');
      shared.getButtonLoginSubmit().should('be.visible');
    })

    it('Should show error when email and password are not filled', () => {
      shared.getLoginButton().click();
      shared.getButtonLoginSubmit().click();
      shared.getLoginEmailLabel().should('have.class', 'text-destructive')
      shared.getPasswordLabel().should('have.class', 'text-destructive')
      shared.getLoginEmail().siblings('p').should("have.text", 'Required').and('have.class', 'text-destructive')
      shared.getPassword().siblings('p').should("have.text", 'Required').and('have.class', 'text-destructive')
    })
  })
})