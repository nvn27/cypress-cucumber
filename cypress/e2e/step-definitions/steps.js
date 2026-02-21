import { Given, When, And, Then } from '../../support/CucumberStepWrapper.js'

import landingPage from '../page-objects/landing-page.js'

Given('Navigate to app', () => {
    cy.visit("/");
})

When('Verify landing page heading', () => {
    landingPage.verifyPgeHeadingText();
})

And('Navigate to Checkboxes page', () => {
    landingPage.navigateToChkboxesPage();
})

Then('Verify checkboxes are present', () => {
    landingPage.verifyCheckboxesArePresent();
})

And('Navigate to Add Remove Elements page', () => {
    landingPage.navigateToAddRemoveElementsPage();
})

Then('Verify Add Remove Elements page heading are present', () => {
    landingPage.verifyAddRemoveElementsPageHeading();
})





