import {testRpgHomePage} from '../support/page-objects/homepage-po'
import {
  controleerProgressBar,
  controleerSection,
  controleerTextVisible,
  vulInputVeld,
  vulSelectInputVeld
} from "../support/utils";
import {testRpgGamePage} from "../support/page-objects/gamepage-po";
import {testRpgSharedPo} from "../support/page-objects/shared-po";

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
    beforeEach(() => {
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

    it('Should show error when Character name is longer than 20 characters', () => {
      vulInputVeld(gamepage.getChracterCreationName(), 'Dsadsadfwefrehrfdsfvb')
      gamepage.getCharacterCreationSubmitButton().click();
      gamepage.getChracterCreationNameLabel().should('have.class', 'text-destructive');
      controleerTextVisible(gamepage.getCharacterCreationNameError(), 'Name cannot be longer than 20 characters');
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
    beforeEach(() => {
      cy.visit('http://localhost:3000/play');
    })

    it('Should be able to create character', () => {
      // vulInputVeld(gamepage.getChracterCreationName(), 'Binh');
      // vulSelectInputVeld(gamepage.getCharacterBuildSelectList(), 'Mage')
      // gamepage.getCharacterCreationSubmitButton().click();
      gamepage.createCharacter('Binh', 'Mage');
    })

    it('Should show assignments', () => {
      gamepage.createCharacter('Binh', 'Mage');
      controleerTextVisible(gamepage.getGameTile(), 'Adventure time');
      controleerTextVisible(gamepage.getGameSubTile(), 'Complete the tasks below and level up your character');
      controleerTextVisible(gamepage.getClickItAssignmentLabel(), 'Click it!');
      controleerTextVisible(gamepage.getClickItAssignmentDescription(), 'Click the button to level up');

      controleerTextVisible(gamepage.getUploadItAssignmentLabel(), 'Upload it!');
      controleerTextVisible(gamepage.getUploadItAssignmentDescription(), 'Upload any file to level up');
      gamepage.getUploadItAssignmentUploadButton().should('be.enabled').and('be.visible');

      controleerTextVisible(gamepage.getTypeItAssignmentLabel(), 'Type it!');
      controleerTextVisible(gamepage.getTypeItAssignmentDescription(), 'Type Lorem Ipsum to level up');
      gamepage.getTypeItAssignmentInputField().should('be.enabled').and('be.visible');

      controleerTextVisible(gamepage.getSlideItAssignmentLabel(), 'Slide it!');
      controleerTextVisible(gamepage.getSlideItAssignmentDescription(), 'Slide the slider all the way to the right');

      // gamepage.getSlideItAssignmentSlider().click(417,0);
    })

    it('Should finish all assignments', () => {
      gamepage.createCharacter('Binh', 'Mage');
      const characterProgression0 = {
        characterName: 'Binh',
        characterLevelAndClass: 'A level 1 mage',
        strength: '0',
        agility: '1',
        wisdom: '3',
        magic: '6',
        level: '1'
      };
      gamepage.controlerenCharacter(characterProgression0)

      // assignment1 click it
      for (let i = 0; i < 5; i++) {
        gamepage.getClickItAssignmentButton().click();
        if (i < 4) cy.wait(100);
      }
      controleerTextVisible(gamepage.getClickItAssignmentButtonSuccesMessage(),'Great job! You levelled up')

      const characterProgression1 = {
        characterName: 'Binh',
        characterLevelAndClass: 'A level 2 mage',
        strength: '1',
        agility: '2',
        wisdom: '4',
        magic: '7',
        level: '2'
      };
      gamepage.controlerenCharacter(characterProgression1)

      // assignment2 upload it
      gamepage.getUploadItAssignmentUploadButton().selectFile('cypress/support/files/test.ts');
      controleerTextVisible(gamepage.getUploadItAssignmentUploadSuccesMessage(), 'File selected, level up!')
      const characterProgression2 = {
        characterName: 'Binh',
        characterLevelAndClass: 'A level 3 mage',
        strength: '2',
        agility: '3',
        wisdom: '5',
        magic: '8',
        level: '3'
      };
      gamepage.controlerenCharacter(characterProgression2)

      // assignment3 type it
      gamepage.getTypeItAssignmentInputField().type('Lorem Ipsum');
      controleerTextVisible(gamepage.getTypeItAssignmentSuccesMessage(), 'Dolar sit amet!');

      const characterProgression3 = {
      characterName: 'Binh',
      characterLevelAndClass: 'A level 4 mage',
      strength: '3',
      agility: '4',
      wisdom: '6',
      magic: '9',
      level: '4'
      };
      gamepage.controlerenCharacter(characterProgression3)

      // assignment3 slide it
      gamepage.getSlideItAssignmentSlider().click(417,0);

      const characterProgression4 = {
        characterName: 'Binh',
        characterLevelAndClass: 'A level 5 mage',
        strength: '4',
        agility: '5',
        wisdom: '7',
        magic: '10',
        level: '5'
      };
      gamepage.controlerenCharacter(characterProgression4)
      controleerTextVisible(gamepage.getSlideItAssignmentSliderSuccesMessage(), 'Slid to the next level!');


      controleerTextVisible(gamepage.getGameWinMessage(), 'You\'ve reached the highest level! ');
      gamepage.getPLayAgainButton().should('be.visible').and('be.enabled');
    })
  })
})