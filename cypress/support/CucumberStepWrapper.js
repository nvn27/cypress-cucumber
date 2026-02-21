import {
    Given as OriginalGiven,
    When as OriginalWhen,
    And as OriginalAnd,
    Then as OriginalThen
} from "cypress-cucumber-preprocessor/steps"

function wrapStep(stepFn) {
    return function (...args) {
        stepFn(...args)

        if (window.testState) {
            cy.wait(500);
            let screenshotFileName = `F-${window.testState.feature.name}_S-${window.testState.currentScenario.name}_ST-${window.testState.currentStep}`;
            cy.screenshot(screenshotFileName, { capture: 'fullPage', overwrite: true });
        }
    }
}

export const Given = (pattern, fn) =>
    OriginalGiven(pattern, wrapStep(fn))

export const When = (pattern, fn) =>
    OriginalWhen(pattern, wrapStep(fn))

export const And = (pattern, fn) =>
    OriginalAnd(pattern, wrapStep(fn))

export const Then = (pattern, fn) =>
    OriginalThen(pattern, wrapStep(fn))

