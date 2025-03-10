import {createSelector, createSelectorForButton} from "../utils";

export class testRpgSharedPo {
    // titles
    getPageTitle = createSelector('h1');
    getPageSubTitle = createSelector('h2');

    // buttons
    getLoginButton = createSelector('[data-testid="login-button"]');
    getLogoutButton = createSelector('[data-testid="logout-button"]');

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
    getButtonLoginSubmit = createSelector('[type="submit"]')



}