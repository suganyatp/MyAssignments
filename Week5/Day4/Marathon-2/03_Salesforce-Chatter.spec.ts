import { test, expect } from "@playwright/test"

//#2, #3
test.use(
    {
        storageState: 'Data/sflogin.json',
        //viewport: { width: 1920, height: 1080 },
        headless: false
    }
)

test('Create and verify a New Case in Chatter', async ({ page }) => {

    const text = 'Raised a Product Return request as the Product is not in good shape'

    //#1
    await page.goto('https://orgfarm-67fcf66cff-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    //#4
    await page.getByTitle('App Launcher').click()
    //#5
    await page.getByRole('button', { name: "View All Applications" }).click()
    //#6
    const search = page.getByRole('combobox', { name: 'Search apps or items...' })
    await search.fill('Service')
    const serviceApp = page.locator('//div[@data-name="Service"]')
    await serviceApp.click()
    await expect(search).toBeHidden({ timeout: 15000 }) 
    //#7
    await page.getByRole('link', { name: 'Cases' }).click()
    //#8
    await page.locator('//a[@title="New"]').click()
    //#9
    await page.getByRole('combobox', { name: "Contact Name"}).click()
    //#10
    await page.getByTitle("New Contact").click()
    await page.waitForLoadState('domcontentloaded')
    //#11
    const firstName = "Rajaduari"
    const lastName = "Krishna"
    const fullName = `${firstName} ${lastName}`
    await page.getByRole('combobox', { name: "Salutation" }).click()
    await page.getByRole('listbox', { name: 'Salutation' }).getByText('Mr.', { exact: true }).click()
    await page.getByRole('textbox', { name: "First Name" }).fill(firstName)
    await page.getByRole('textbox', { name: "Last Name" }).fill(lastName)
    //#12
    await page.getByRole('button', { name: "Save", exact: true }).click()
    const contactToastMsg = page.locator('//span[contains(@class,"toastMessage") and contains(.,"was created.")]')
    await expect(contactToastMsg).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('combobox', { name: 'Contact Name' })).toHaveValue(`${fullName}`)
    //#13
    await page.getByRole('combobox', { name: "Account Name"}).click()
    await page.getByTitle('New Account').click()
    await page.waitForLoadState('domcontentloaded')
    //#14
    const accNumber = "10010101876"
    const accName = "Rajadurai"
    await page.getByRole('textbox', { name: "Account Name" }).fill(accName)
    await page.getByRole('textbox', { name: "Account Number"}).fill(accNumber)
    //#15
    await page.getByRole('combobox', { name: "Rating" }).click()
    await page.getByText('Hot', { exact: true }).click()
    //#16
    await page.getByRole('button', { name: "Save", exact: true }).click()
    const accToastMsg = page.locator('//span[contains(@class,"toastMessage")]')
    await expect(accToastMsg).toContainText('was created.', { timeout: 5000 })
    await expect(page.getByRole('combobox', { name: 'Account Name' })).toHaveValue(`${accName}`)
    //#17
    await page.getByRole('combobox', { name: 'Status' }).click()
    await page.getByRole('listbox', { name: 'Status' }).getByText('New', { exact: true }).click()
    //#18
    await page.getByRole('combobox', { name: 'Priority' }).click()
    await page.getByRole('listbox', { name: 'Priority' }).getByText('High', { exact: true }).click()
    //#19
    await page.getByRole('combobox', { name: "Case Origin" }).click()
    await page.getByRole('listbox', { name: 'Case Origin' }).getByText('Email', { exact: true }).click()
    //#20
    await page.getByRole('textbox', { name: 'Subject' }).fill('Product Return Request')
    await page.getByRole('textbox', { name: 'Description' }).fill('Requesting a return for a defective product')
    //#21
    await page.locator('//button[@name="SaveEdit"]').click()
    const caseToastMgg = page.locator('//span[contains(@class,"toastMessage")]')
    await expect(caseToastMgg).toContainText('was created.', { timeout: 5000 })
    //#22
    await page.getByRole('button', { name: 'Edit Status' }).click()
    await page.getByRole('combobox', { name: 'Status' }).click()   // open the picklist
    await page.getByRole('option', { name: 'Escalated', exact: true }).click()
    //#23
    await page.locator('//button[text()="Save"]').click()
    const newStatus = page.getByText('Escalated').first()
    await expect(newStatus).toBeVisible()
    await expect(page.getByRole('button', { name: 'Share', exact: true })).toBeVisible()
    //#24
    await page.getByRole('button', { name: 'Share an update...' }).click()
    const editor = page.getByRole('textbox', { name: 'Share an update...' })
    await expect(editor).toBeVisible()
    await editor.fill(text)
    await expect(editor).toContainText('Raised a Product Return request')
    const shareButton = page.getByRole('button', { name: 'Share', exact: true })
    await expect(shareButton).toBeEnabled()
    await shareButton.click()
    //#25 - wait for the post, refreshing the feed if it hasn't shown up
    const myPost = page.locator('article:visible').filter({ hasText: text }).first()
    await expect(async () => {
        if (!(await myPost.isVisible())) {
            await page.getByRole('button', { name: /refresh/i }).first().click()
        }
        await expect(myPost).toBeVisible({ timeout: 5000 })
    }).toPass({ timeout: 45000 })
    await myPost.getByRole('link', { name: /actions for this feed item/i }).click()
    await page.locator('//span[text()="Like on Chatter"]').click()
    const postMsg = page.locator('span.toastMessage').filter({ hasText: 'Post was liked.' })
    await expect(postMsg).toBeVisible({ timeout: 10000 })
    //#26
    await page.getByRole('link', { name: 'Chatter' }).click()
    await expect(page).toHaveURL(/chatter/i)
    const post = page.locator('article:visible').filter({ hasText: text }).first()
    await expect(post).toBeVisible()
    await expect(post.getByText('Liked', { exact: true })).toBeVisible({ timeout: 15000 })

})
