class LandingPage {

    // element locators
    pageHeading = "h1.heading";
    checkBoxesLink = "a[href='/checkboxes']"
    checkBoxes = "#checkboxes";
    addRemoveElementsLink = "a[href='/add_remove_elements/']";
    addRemoveElementsPageHeading = "#content";

    // element interactions
    verifyPgeHeadingText() {
        cy.get(this.pageHeading).should('have.text', "Welcome to the-internet");
    }

    navigateToChkboxesPage() {
        cy.get(this.checkBoxesLink).click();
    }

    verifyCheckboxesArePresent() {
        // cy.get(this.checkBoxes).should('not.be.visible');
        cy.get(this.checkBoxes).should('be.visible');
    }

    navigateToAddRemoveElementsPage() {
        cy.get(this.addRemoveElementsLink).click();
    }

    verifyAddRemoveElementsPageHeading() {
        cy.get(this.addRemoveElementsPageHeading).should('be.visible');
    }
}

module.exports = new LandingPage();
