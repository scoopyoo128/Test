import {testRpgHomePage} from '../support/page-objects/homepage-po'
import {controleerSection, controleerTextVisible, vulInputVeld, vulSelectInputVeld} from "../support/utils";
import {testRpgGamePage} from "../support/page-objects/gamepage-po";
import {testRpgSharedPo} from "../support/page-objects/shared-po";
import {share} from "rxjs/src";

describe('Game', () => {

  const shared = new testRpgSharedPo();
  const gamepage = new testRpgGamePage();

  describe('Game page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/play');
    })

    it('Should be able to log in', () => {
      shared.getLoginButton().click();
      vulInputVeld(shared.getLoginEmail(), 'ditIsEenEmail@adres.nl');
      vulInputVeld(shared.getPassword(), 'admin123');
      shared.getButtonLoginSubmit().click();
      shared.getLogoutButton().should('be.visible').and("have.text", 'Log out')
    })
    }
  )
  describe('Character creation', () => {
    before(() => {
      cy.visit('http://localhost:3000/play');
    })

    it('Should show elements character creation', () => {
      controleerTextVisible(gamepage.getCharacterCreationTitle(), 'Choose a name and build');
      controleerTextVisible(gamepage.getCharacterCreationSubTitle(), 'Be whatever you want to be, choose your path wisely');
      controleerTextVisible(gamepage.getChracterCreationNameLabel(), 'Character name');
      controleerTextVisible(gamepage.getChracterCreationNameDescription(), 'Your display name');
      gamepage.getChracterCreationName().should('be.visible').and('be.enabled');
      controleerTextVisible(gamepage.getChracterCreationBuildLabel(), 'Build');
      gamepage.getCharacterBuildSelectList().should('be.visible').and('be.enabled');
      controleerTextVisible(gamepage.getChracterCreationBuildDescription(), 'Select your character\'s build');
      gamepage.getCharacterCreationSubmitButton().should('be.visible').and('be.enabled');
    })

    it('Should show error when Character name is not filled', () => {

      gamepage.getCharacterCreationSubmitButton().click();
      gamepage.getChracterCreationNameLabel().should('have.class', 'text-destructive');
      controleerTextVisible(gamepage.getCharacterCreationNameError(), 'Name must be at least 3 characters');

    })
  })
  describe('Character information', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/play');
    })
    it('Should show Thief default character information', () => {
      cy.visit('http://localhost:3000/play');
      const character = {
        characterName: 'Your character',
        characterLevelAndClass: 'A level 1 thief',
        strength: '1',
        agility: '6',
        wisdom: '2',
        magic: '1',
        level: '1'
      };

      gamepage.controlerenCharacter(character);
    })

    it('Should show Knight default character information', () => {
      vulSelectInputVeld(gamepage.getCharacterBuildSelectList(), 'Knight');

      const character = {
        characterName: 'Your character',
        characterLevelAndClass: 'A level 1 knight',
        strength: '6',
        agility: '2',
        wisdom: '1',
        magic: '1',
        level: '1'
      };

      gamepage.controlerenCharacter(character);
    })

    it('Should show Mage default character information', () => {
      vulSelectInputVeld(gamepage.getCharacterBuildSelectList(), 'Mage');

      const character = {
        characterName: 'Your character',
        characterLevelAndClass: 'A level 1 mage',
        strength: '0',
        agility: '1',
        wisdom: '3',
        magic: '6',
        level: '1'
      };

      gamepage.controlerenCharacter(character);
    })

    it('Should show Brigadier default character information', () => {
      vulSelectInputVeld(gamepage.getCharacterBuildSelectList(), 'Brigadier');

      const character = {
        characterName: 'Your character',
        characterLevelAndClass: 'A level 1 brigadier',
        strength: '3',
        agility: '1',
        wisdom: '6',
        magic: '1',
        level: '1'
      };

      gamepage.controlerenCharacter(character);
    })
  })
  describe('Play the game', () => {
    before(() => {
      cy.visit('http://localhost:3000/play');
    })

    it('Should show elements character creation', () => {
      controleerTextVisible(gamepage.getCharacterCreationTitle(), 'Choose a name and build');
      controleerTextVisible(gamepage.getCharacterCreationSubTitle(), 'Be whatever you want to be, choose your path wisely');
      controleerTextVisible(gamepage.getChracterCreationNameLabel(), 'Character name');
      controleerTextVisible(gamepage.getChracterCreationNameDescription(), 'Your display name');
      gamepage.getChracterCreationName().should('be.visible').and('be.enabled');
      controleerTextVisible(gamepage.getChracterCreationBuildLabel(), 'Build');
      gamepage.getCharacterBuildSelectList().should('be.visible').and('be.enabled');
      controleerTextVisible(gamepage.getChracterCreationBuildDescription(), 'Select your character\'s build');
      gamepage.getCharacterCreationSubmitButton().should('be.visible').and('be.enabled');
    })

    it('Should show error when Character name is not filled', () => {

      gamepage.getCharacterCreationSubmitButton().click();
      gamepage.getChracterCreationNameLabel().should('have.class', 'text-destructive');
      controleerTextVisible(gamepage.getCharacterCreationNameError(), 'Name must be at least 3 characters');

    })
  })
})