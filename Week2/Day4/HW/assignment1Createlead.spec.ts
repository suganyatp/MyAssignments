
/* 
Assignment: 1 Create Lead
1. Login to https://login.salesforce.com
2. Click on toggle menu button from the left corner
3. Click view All and click Sales from App Launcher
4. Click on Leads tab
5. Click on New button
6. Select Salutation dropdown
7. Enter the Last Name
8. Enter the Company Name
9. Click Save and Verify Leads name created
*/

import {test} from "@playwright/test"

test('Creating Lead from SalesForce URL', async ({page}) => {

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

    // Click on Sales from App Launcher - Using XPath
    await page.locator("//p[text()='Sales']").waitFor({state : 'visible'})
    await page.locator("//p[text()='Sales']").click()

    //Click on the Leads tab
    await page.locator('[title="Leads"]').click()

    //Click New from Leads Page - XPath
    await page.locator("//div[text()='New']").click()

    //Salutation -> Mrs - XPath
    await page.locator('[aria-label="Salutation"]').first().click()
    await page.locator('[data-value="Ms."]').click()

    // Last Name and Company Name -  
    await page.locator('[name="lastName"]').fill('SUGANYAA')
    await page.locator('[name="Company"]').fill('WIPRO')

    //Click Save
    await page.locator("//button[@name='SaveEdit']").click()
})
