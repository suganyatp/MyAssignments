
import { test, expect } from "@playwright/test"

test.use(
    {
        storageState: 'Data/sflogin.json',
        //viewport: { width: 1920, height: 1080 },
        headless: false
    }
)

test.only('Marketing Create Lead in SalesForce Appln', async ({ page }) => {

    /*     await page.goto('https://login.salesforce.com/')
        await page.locator('//input[@type="email"]').fill('suganyatp.15500421e14f@agentforce.com')
        await page.locator('//input[@name="Login"]').click()
        await page.locator('//input[@type="password"]').fill('TestLeaf@2026')
        await page.locator('//input[@name="Login"]').click()
        await page.waitForTimeout(15000) //for OTP
        await page.context().storageState({path:'Data/sflogin.json'}) */

    await page.goto('https://orgfarm-67fcf66cff-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')

    await page.getByTitle('App Launcher').click()
    await page.waitForLoadState('domcontentloaded')

    await page.getByRole('button', { name: "View All Applications" }).click()
    await page.waitForLoadState('domcontentloaded')

    await page.getByPlaceholder('Search apps or items...').fill('Marketing')
    await page.waitForTimeout(15000)
    await page.locator('//mark[text()="Marketing"]').click({ force: true })

    await expect(page.locator('//span[text()="Leads"]')).toBeVisible();

    await page.locator('//span[text()="Leads"]').click()
    await page.getByRole('button', { name: "New" }).click()
    await page.waitForLoadState('domcontentloaded')

    await page.getByRole('combobox', { name: "Salutation" }).click()
    await page.getByText('Mrs.', { exact: true }).click()

    await page.getByRole('textbox', { name: "First Name" }).fill("Anitha")
    await page.getByRole('textbox', { name: "Last Name" }).fill("Muthu")
    await page.getByRole('textbox', { name: "Company" }).fill("Infinite")

    await page.locator('//button[text()="Save"]').click()

    //Assertion
    const toastMsg = page.locator('//div[contains(@class,"forceToastMessage")]')
    await expect(toastMsg).toContainText('was created')

    await page.locator('//span[text()="Show more actions"]').click()
    await page.locator('//span[text()="Convert"]').click()

    await page.getByTitle("Opportunity").scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'Infinite-' }).click();
    const opportunityName = page.getByRole('textbox', { name: "Opportunity Name *" })
    await opportunityName.fill("Com Cast")

    await page.getByRole('button', { name: "Convert", exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Your lead has been converted' })).toBeVisible()

    await page.getByRole('button', { name: "Go to Leads" }).click()

    await page.locator('//span[text()="Opportunities"]').click()
    await page.getByRole('searchbox', { name: "Search this list..." }).fill('com cast')
    await page.keyboard.press('Enter')
    await page.waitForLoadState('domcontentloaded')

    await page.locator('//span[text()="Com Cast"]').first().click()
    await expect(
  page.getByRole('heading', { name: 'Opportunity Com Cast' }).locator('//lightning-formatted-text[text()="Com Cast"]')
).toHaveText('Com Cast');

})
