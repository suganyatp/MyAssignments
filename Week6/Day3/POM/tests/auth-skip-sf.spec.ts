import {test} from "@playwright/test"

test('auth file to skip the SalesForce login', async ({page}) => {
await page.goto('https://login.salesforce.com/')
await page.locator('#username').fill('suganyatp.15500421e14f@agentforce.com')
await page.locator('#Login').click()
await page.locator('#password').fill('TestLeaf@2026')
await page.locator('#Login').click()
await page.waitForTimeout(20000)
await page.context().storageState({path:'../../Data/sflogin.json'})  
})
