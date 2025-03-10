export function controleerTextVisible(veld: Cypress.Chainable, waarde: string): Cypress.Chainable {
    return veld.should('have.text', waarde).should('be.visible');
}

export function controleerProgressBar(veld: Cypress.Chainable, waarde: string): Cypress.Chainable {
    const progress = 100 - (Number(waarde) * 10);
    let progressToString: string = progress.toString();
    if (progress == 0)
    {
        let str1 = 'transform: translateX(';
        let str2 ='%);';
        let wrappedValue = `${str1}${progressToString}${str2}`;
        return veld.should('have.attr', 'style', wrappedValue);
    }
    else
    {
        let str1 = 'transform: translateX(-';
        let str2 ='%);';
        let wrappedValue = `${str1}${progressToString}${str2}`;
        return veld.should('have.attr', 'style', wrappedValue);
    }
}

export function vulSelectInputVeld(veld: Cypress.Chainable, waarde: string | number): Cypress.Chainable{
    return veld.select(waarde, {force: true});
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

export function vulInputVeld(veld: Cypress.Chainable, waarde: string): Cypress.Chainable {
    return veld.clear().type(waarde).blur();
}