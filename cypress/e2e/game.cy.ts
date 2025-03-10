import {testRpgHomePage} from '../support/page-objects/homepage-po'
import {controleerSection, controleerTextVisible} from "../support/utils";

describe('Game', () => {

  const homepage = new testRpgHomePage();

  describe('Game page', () => {
    before(() => {
      cy.visit('http://localhost:3000/play')
    })

    it('Should show login button', () => {
      homepage.getLoginButton().should('be.visible').and('have.text', 'Login');
    })

    }
  )
})