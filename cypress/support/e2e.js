// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
const fs = require('fs');

Cypress.on('uncaught:exception', (err) => {
    return false;
})

// let stepCounter = 0

// Cypress.on('command:end', (command) => {
//     // Only capture after step execution commands
//     if (command.attributes.name === 'then') {
//         stepCounter++

//         const screenshotName = `Step-${stepCounter}`

//         Cypress.cy.now('screenshot', screenshotName, {
//             capture: 'viewport'
//         })
//     }
// })

const commandArr = ['task', 'writeFile', 'readFile', 'screenshot'];
const stepArr = [];
// Cypress.on('command:end', (command) => {
//     console.log(JSON.stringify(command));
//     if (!commandArr.includes(command.attributes.name)) {
//         //     // cy.task('log', command.attributes.name);
//         //     // cy.task('log', Cypress.spec.name);

//         if (window.testState) {
//             let screenshotFileName = `F-${window.testState.feature.name}_S-${window.testState.currentScenario.name}_ST-${window.testState.currentStep}`;
//             // cy.task('log', screenshotFileName);
//             if (!stepArr.includes(screenshotFileName)) {
//                 // cy.screenshot(screenshotFileName, { capture: 'runner' })
//                 Cypress.cy.now('screenshot', screenshotFileName, { capture: 'fullpage' });
//             }
//             stepArr.push(screenshotFileName);
//         }
//         // cy.task('log', `stepArr - ${stepArr}`);
//     }
// });

after(() => {
    let file = `./cypress/reports/cucumber-json/${(Cypress.spec.name).replace('.feature', '.cucumber.json')}`;
    cy.task('log', file);

    cy.readFile(file).then(jsonData => {
        let feature = jsonData[0]["name"];
        let scenario = jsonData[0]["elements"][0]["name"];
        let stepArr = jsonData[0]["elements"][0]["steps"];
        let stepCount = jsonData[0]["elements"][0]["steps"].length;

        for (let i = 0; i < stepCount; i++) {
            // `F-${window.testState.feature.name}_S-${window.testState.currentScenario.name}_ST-${window.testState.currentStep}`;
            let fileName = `F-${feature}_S-${scenario}_ST-${i}`;

            cy.task('log', `Feature - ${feature}`);
            cy.task('log', `Scenario - ${scenario}`);
            cy.task('log', `Step Count - ${stepCount}`);

            if (`./cypress/screenshots/${Cypress.spec.name}/${fileName}.png`) {
                cy.readFile(`./cypress/screenshots/${Cypress.spec.name}/${fileName}.png`, 'base64').then((imageData) => {
                    //attach imageData in cucumber-json file
                    let emb = [{
                        "mime_type": "image/png",
                        "data": imageData
                    }]

                    jsonData[0]["elements"][0]["steps"][`${i}`]["embeddings"] = emb;
                    const updatedJsonString = JSON.stringify(jsonData, null, 2);
                    cy.writeFile(file, updatedJsonString, 'utf8');
                });
            }
        }
    });
});

