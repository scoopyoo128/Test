import {createSelector, createSelectorForButton} from "../utils";

export class testRpgHomePage {
    // titles
    getPageTitle = createSelector('h1');
    getPageSubTitle = createSelector('h2');

    // buttons
    getLoginButton = createSelector('[data-testid="login-button"]');
    getSectionLinks = createSelector('[data-testid="links"]');

    getButtontoApi(): Cypress.Chainable {
        return this.getSectionLinks().parent('div').find('div').find('a');
    }

    // login
    getLoginPanel = createSelector('#radix-\\:Rpkq\\:')
    getLoginPageTitle = createSelector('#radix-\\:RpkqH1\\:');
    getLoginPageSubTitle = createSelector('#radix-\\:RpkqH2\\:');
    getLoginEmail = createSelector('#\\:r0\\:-form-item');
    getLoginEmailLabel(): Cypress.Chainable {
    return this.getLoginEmail().siblings('label')
    }
    getPassword = createSelector('#\\:r1\\:-form-item');
    getPasswordLabel(): Cypress.Chainable {
        return this.getPassword().siblings('label')
    }
    getButtonLogin = createSelector('[type="submit"]')



}