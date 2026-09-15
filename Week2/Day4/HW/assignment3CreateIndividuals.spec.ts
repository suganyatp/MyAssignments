/* 
Assignment: 3 Create Individuals
Test Steps:
1. Login to https://login.salesforce.com
2. Click on the toggle menu button from the left corner
3. Click View All and click Individuals from App Launcher
4. Click on the Dropdown icon in the Individuals tab
5. Click on New Individual
6. Enter the Last Name
7. Click save and verify Individuals Name
*/

import {test} from "@playwright/test"

test('Creating Individual from SalesForce URL', async ({page}) => {

    await page.goto("https://login.salesforce.com")

    // Locator using Attribute with tagName -> tagName[attr:'value']
    await page.locator('input[type="email"]').fill('dilipkumar.rajendran@testleaf.com')

    // Locator using ONLY Attribute -> [attr:'value']
    await page.locator('[type="submit"]').click()

    // Locator using ID-Value -> #idValue
    await page.locator('#password').fill('TestLeaf@2025')

    // Locator using ONLY Attribute -> [attr:'value']
    await page.locator('[name="Login"]').click()

    //Click on the Toggle menu
    await page.locator('.slds-icon-waffle').click()

    // Click View All
    await page.locator('[aria-label="View All Applications"]').click()

    // Find Individuals and click it
    await page.locator('//p[text()="Individuals"]').waitFor({state : 'visible'})
    await page.locator('//p[text()="Individuals"]').click()

    //Click on the drop-down from the Individual
    await page.locator('//a[@class="slds-button slds-button_reset"]').nth(13).click()

    await page.locator('//span[text()="New Individual"]').click()

    await page.locator('[placeholder="Last Name"]').fill('KEERTHI')

    await page.locator('//span[text()="Save"]').click() 

})
