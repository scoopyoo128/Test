export function controleerTextVisible(veld: Cypress.Chainable, waarde: string): Cypress.Chainable {
    return veld.should('have.text', waarde).should('be.visible');
}

export function controleerSection(veld: Cypress.Chainable, index: number): Cypress.Chainable {
    return veld.children().eq(index);
}

export function createSelector(elementId: string): (timout?: any) => Cypress.Chainable {
    return (timeOut?) => {
        if (!!timeOut) {
            cy.wait(timeOut);
        }
        return cy.get(elementId);
    };
}
export function createSelectorForButton(elementId: string, contains: string): (timout?: any) => Cypress.Chainable {
    return (timeOut?) => {
        if(!!timeOut) {
            cy.wait(timeOut);
        }
        return cy.get(elementId).contains(contains);
    };
}