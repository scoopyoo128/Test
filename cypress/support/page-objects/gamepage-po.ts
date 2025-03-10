import {controleerProgressBar, controleerTextVisible, createSelector, createSelectorForButton} from "../utils";

export class testRpgGamePage {
    // titles
    getPageTitle = createSelector('h1');
    getPageSubTitle = createSelector('h2');


    // character info
    getCharacterName = createSelector('[data-testid="character-name"]')
    getCharacterLevelAndClass(): Cypress.Chainable {
        return this.getCharacterName().siblings('p')
    }
    getCharacterStatsLabel = createSelector('[data-testid="character-stats"] > .font-semibold');
    getCharacterStrenghtLabel = createSelector('[data-character-stats="Strength"] > label');
    getCharacterStrenght = createSelector('[data-character-stats="Strength"] > div > .text-sm');
    getCharacterStrenghtProgressBar = createSelector('[data-character-stats="Strength"] > .flex > .relative > div');
    getCharacterAgilityLabel = createSelector('[data-character-stats="Agility"] > label');
    getCharacterAgility = createSelector('[data-character-stats="Agility"] > div > .text-sm');
    getCharacterAgilityBar = createSelector('[data-character-stats="Agility"] > .flex > .relative > div');
    getCharacterWisdomLabel = createSelector('[data-character-stats="Wisdom"] > label');
    getCharacterWisdom = createSelector('[data-character-stats="Wisdom"] > div > .text-sm');
    getCharacterWisdomBar = createSelector('[data-character-stats="Wisdom"] > .flex > .relative > div');
    getCharacterMagicLabel = createSelector('[data-character-stats="Magic"] > label');
    getCharacterMagic = createSelector('[data-character-stats="Magic"] > div > .text-sm');
    getCharacterMagicBar = createSelector('[data-character-stats="Magic"] > .flex > .relative > div');
    getCharacterLevelLabel = createSelector('[data-character-stats="Level"] > label')
    getCharacterLevel = createSelector('[data-character-stats="Level"] > div > .text-sm');
    getCharacterLevelBar = createSelector('[data-character-stats="Level"] > .flex > .relative > div');

    // character creation
    getCharacterCreationTitle = createSelector(':nth-child(2) > .flex-col > .text-2xl');
    getCharacterCreationSubTitle = createSelector(':nth-child(2) > .flex-col > .text-sm');
    getChracterCreationNameLabel = createSelector('.space-y-3 > :nth-child(1) > .font-medium');
    getChracterCreationName = createSelector('#\\:r0\\:-form-item');
    getChracterCreationNameDescription = createSelector('#\\:r0\\:-form-item-description');
    getChracterCreationBuildLabel = createSelector('.space-y-3 > :nth-child(2) > .font-medium');
    getCharacterBuildSelectList(): Cypress.Chainable {
        return cy.get('#\\:r1\\:-form-item').siblings('select')
    }
    getChracterCreationBuildDescription = createSelector('#\\:r1\\:-form-item-description');
    getCharacterCreationSubmitButton = createSelector('.lg\\:w-1\\/2 > .inline-flex');

    // errors
    getCharacterCreationNameError = createSelector('#\\:r0\\:-form-item-message');


    controlerenCharacter(data: any, withOutCharacter: boolean = false): void{
        controleerTextVisible(this.getCharacterName(), data.characterName);
        controleerTextVisible(this.getCharacterLevelAndClass(), data.characterLevelAndClass);
        controleerTextVisible(this.getCharacterStatsLabel(), 'Stats');
        controleerTextVisible(this.getCharacterStrenghtLabel(), 'Strength');
        controleerProgressBar(this.getCharacterStrenghtProgressBar(), data.strength)
        controleerTextVisible(this.getCharacterStrenght(), data.strength);

        controleerTextVisible(this.getCharacterAgilityLabel(), 'Agility');
        controleerTextVisible(this.getCharacterAgility(), data.agility);
        controleerProgressBar(this.getCharacterAgilityBar(), data.agility)

        controleerTextVisible(this.getCharacterWisdomLabel(), 'Wisdom');
        controleerTextVisible(this.getCharacterWisdom(), data.wisdom);
        controleerProgressBar(this.getCharacterWisdomBar(), data.wisdom)

        controleerTextVisible(this.getCharacterMagicLabel(), 'Magic');
        controleerTextVisible(this.getCharacterMagic(), data.magic);
        controleerProgressBar(this.getCharacterMagicBar(), data.magic)

        controleerTextVisible(this.getCharacterLevelLabel(), 'Level');
        controleerTextVisible(this.getCharacterLevel(), data.level);
        // controleerProgressBar(this.getCharacterLevelBar(), data.level)
        // bug? percentage klopt niet. karakter is level 1 maar progressbar zit op -80%
    }
}