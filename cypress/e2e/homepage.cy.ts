import {testRpgHomePage} from '../support/page-objects/homepage-po'
import {controleerSection, controleerTextVisible} from "../support/utils";

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const homepage = new testRpgHomePage();
  describe('Show show elements on home page', () => {
    it('Should show login button', () => {
      homepage.getLoginButton().should('be.visible').and('have.text', 'Login');
    })

    it('Should show button to testCoders website', () => {
      homepage.getLoginButton().siblings('a').should('have.attr', 'href', 'https://www.testcoders.nl/')
    })

    it('Should show homepage title', () => {
      controleerTextVisible(homepage.getPageTitle(), 'TestRPG')
    })

    it('Should show homepage sub-title', () => {
      controleerTextVisible(homepage.getPageSubTitle(), 'TestRPG is a simple \'game\' meant to be automated through a Test Automation Framework.')
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
      homepage.getLoginButton().click();
      controleerTextVisible(homepage.getLoginPageTitle(), 'Login to TestRPG');
      controleerTextVisible(homepage.getLoginPageSubTitle(), 'Any combination of email and password will work');
      controleerTextVisible(homepage.getLoginEmailLabel(), 'Email');
      homepage.getLoginEmail().should('be.visible');
      controleerTextVisible(homepage.getPasswordLabel(), 'Password');
      homepage.getPassword().should('be.visible');
      homepage.getButtonLogin().should('be.visible');
    })

    it('Should show error when email and password are not filled', () => {
      homepage.getLoginButton().click();
      homepage.getButtonLogin().click();
      homepage.getLoginEmailLabel().should('have.class', 'text-destructive')
      homepage.getPasswordLabel().should('have.class', 'text-destructive')
      homepage.getLoginEmail().siblings('p').should("have.text", 'Required').and('have.class', 'text-destructive')
      homepage.getPassword().siblings('p').should("have.text", 'Required').and('have.class', 'text-destructive')
    })
  })
})