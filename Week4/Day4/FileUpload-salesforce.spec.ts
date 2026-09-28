
import {expect, test} from "@playwright/test"

import path from 'path'

test.use(
    {
       storageState:'Data/sflogin.json',
       viewport: { width: 1920, height: 1080 },
       headless: false
    }
)

test.only ('File Upload in SalesForce Appln', async ({page}) => {

    //await page.goto('https://login.salesforce.com/')
    await page.goto('https://orgfarm-67fcf66cff-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    /* await page.locator('//input[@type="email"]').fill('suganyatp.15500421e14f@agentforce.com')
    await page.locator('//input[@name="Login"]').click()
    await page.locator('//input[@type="password"]').fill('TestLeaf@2026')
    await page.locator('//input[@name="Login"]').click()
    await page.waitForTimeout(8000); //for OTP
 */
    await page.getByTitle('App Launcher').click()
    await page.waitForTimeout(8000)

    await page.waitForLoadState('domcontentloaded')

    await page.getByRole('button', { name: "View All Applications" }).click()
    await page.waitForTimeout(8000)

    await page.waitForLoadState('domcontentloaded')

    await page.getByPlaceholder('Search apps or items...').fill('Accounts')
    await page.locator('//mark[text()="Accounts"]').click()

    await page.waitForLoadState('domcontentloaded')

    await page.locator('//div[@title="New"]').click()

    await page.waitForLoadState('domcontentloaded')

    await page.locator('//input[@name="Name"]').fill('Sample Account')
    
    await page.getByRole('combobox', { name: "Rating" }).click()
    await page.getByText('Warm', { exact: true }).click()
    
    await page.getByRole('combobox', { name: "Type" }).click()
    await page.getByText('Prospect', { exact: true }).click()
    
    await page.getByRole('combobox', { name: "Industry" }).click()
    await page.getByText('Banking', {exact: true }).click()
    
    await page.getByRole('combobox', { name: "Ownership" }).click()
    await page.getByText('Public', {exact: true }).click()

    await page.locator('//button[text()="Save"]').click()

    let accountCreate = await page.locator('//span[@class="toastMessage slds-text-heading--small forceActionsText"]').innerText()
    console.log("The message :", accountCreate);

    //Assert the Account created
    await expect(page.locator('//span[@class="toastMessage slds-text-heading--small forceActionsText"]')).toHaveText('Account "Sample Account" was created.')
    
    //Since the upload file button is inside the Notes span, we need to scroll to view the upload 
    const cardTitle = page.getByTitle('Notes & Attachments')
    await cardTitle.scrollIntoViewIfNeeded()

    //create the event listener for SetFiles
    let fileupref = page.waitForEvent('filechooser')
    //trigger the click action
    await page.locator('//div[text()="Upload Files"]').first().click()
    //resolve the promise of event listener
    const upload = await fileupref
    await upload.setFiles(path.join(__dirname, '../../../Data/sunflower.jpeg'))

    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('//div[text()="sunflower.jpeg"]')).toHaveText('sunflower.jpeg')

    await page.getByRole('button', { name: "Done" }).click()
    await expect(page.locator('//span[@title="sunflower"]')).toContainText('sunflower')

})

test('Storing the salesforce login', async ({page}) => {
    await page.goto('https://login.salesforce.com/')
    await page.locator('//input[@type="email"]').fill('suganyatp.15500421e14f@agentforce.com')
    await page.locator('//input[@name="Login"]').click()
    await page.locator('//input[@type="password"]').fill('TestLeaf@2026')
    await page.locator('//input[@name="Login"]').click()
    await page.waitForTimeout(8000); //for OTP

    await page.context().storageState({path:'Data/sflogin.json'})

})
