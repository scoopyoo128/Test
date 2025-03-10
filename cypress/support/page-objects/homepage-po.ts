import {createSelector, createSelectorForButton} from "../utils";

export class testRpgHomePage {

    // buttons
    getSectionLinks = createSelector('[data-testid="links"]');

    getButtontoApi(): Cypress.Chainable {
        return this.getSectionLinks().parent('div').find('div').find('a');
    }

}