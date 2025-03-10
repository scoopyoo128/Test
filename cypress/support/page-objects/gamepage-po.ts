import {createSelector, createSelectorForButton} from "../utils";

export class testRpgHomePage {
    // titles
    getPageTitle = createSelector('h1');
    getPageSubTitle = createSelector('h2');

}