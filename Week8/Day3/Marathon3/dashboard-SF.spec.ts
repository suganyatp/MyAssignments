import { test, expect } from "@playwright/test"

test.use(
    {
        storageState: 'Data/mysalesforce-login.json'
    }
)

test('Dashboard UI-API Actions in SalesForce page', async ({ page, request }) => {

    //UI Actions in Sales Force

    let dashboard_name = 'Salesforce Automation by Suganyaa'

    //1 Login
    // await page.goto('https://orgfarm-02ae27e8c2-dev-ed.develop.my.salesforce.com')
    // await page.getByRole('textbox', { name: "Username" }).fill('suganyatp.fbca897b0e3c@agentforce.com')
    // await page.getByRole('button', { name: "Log In" }).click()
    // await page.getByRole('textbox', { name: "Password" }).fill('NativeCloud@2026')
    // await page.getByRole('button', { name: "Log In" }).click()
    // await page.waitForTimeout(20000)
    // await page.context().storageState({ path: 'Data/mysalesforce-login.json' })

    await page.goto('https://orgfarm-02ae27e8c2-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    await page.waitForLoadState('domcontentloaded')
    console.log("Home Page Title : ", await page.title());

    //2 App-Launcher
    await page.getByTitle('App Launcher').click()

    //3 View All
    await page.getByRole('button', { name: "View All Applications" }).click()
    const search = page.getByRole('combobox', { name: 'Search apps or items...' })
    await search.fill('Dashboards')

    //4 Click Dashboards link
    await page.getByRole('link', { name: "Dashboards" }).click()
    await expect(page.locator('//div[@title="New Dashboard"]')).toBeVisible({ timeout: 20000 })

    //5 Click New Dashboard
    await page.locator('//div[@title="New Dashboard"]').click()

    //Dashboard inside the iFrame
    const dashboardFrame = page.frameLocator('iframe[title="dashboard"]')
    //Handle pop-up close, if appears
    const popupClose = dashboardFrame.locator('//button[@title="Close"]').last()
    await popupClose.click({ timeout: 8000 }).catch(() => console.log('No pop-up shown'))

    //6 Enter Dashboard name and create - iFrame
    const inputName = dashboardFrame.locator('//input[@id="dashboardNameInput"]')
    await expect(inputName).toBeVisible({ timeout: 20000 })
    await inputName.fill(dashboard_name)
    await dashboardFrame.locator('//button[text()="Create"]').click()

    //7 Verify name and Save - iFrame
    const titleLocator = dashboardFrame.locator('//span[@class="slds-form-element__static slds-grid slds-grid_align-spread"]')
    await expect(titleLocator).toContainText(dashboard_name, { timeout: 20000 })
    await expect(dashboardFrame.getByRole('button', { name: 'Add Widget' })).toBeVisible({ timeout: 20000 })
    console.log("Dashboard Page Title  :", await page.title());
    const saveBtn = dashboardFrame.locator('//button[text()="Save"]')
    await expect(saveBtn).toBeEnabled()
    await page.waitForTimeout(5000)
    await saveBtn.click()
    await expect(page.locator('span.toastMessage', { hasText: 'Dashboard saved' })).toBeVisible({ timeout: 15000 })
    console.log("The Dashboard is Saved!")

    //********************************************************

    //API Actions in Sales Force

    //To create Access Token

    let URL_SF = 'https://orgfarm-02ae27e8c2-dev-ed.develop.my.salesforce.com'

    let authresponseBody = await request.post(`${URL_SF}/services/oauth2/token`,

        {

            headers: {

                "Content-Type": "application/x-www-form-urlencoded"

            },
            form: {

                "grant_type": "client_credentials",
                "client_id": "3MVG94bpcMC_ekBjOUrNel8X5M784.8NaIlwM1MV8_o1_HyIN9b6Y3OjYgIAIUQTdgK.j_zIpPjB_ClLK75Vg",
                "client_secret": "8A6EFE0C51026C140BF3FF60D595ADA62DEC0B8D7BB3C433637AFF5C5ACEAD62"

            }

        }
    )

    let tokenResponse = await authresponseBody.json()
    console.log(tokenResponse)

    expect(authresponseBody.status()).toBe(200)
    console.log(authresponseBody.status());

    expect(authresponseBody.statusText()).toBe("OK")
    console.log(authresponseBody.statusText())

    let accessToken = tokenResponse.access_token
    console.log(accessToken);

    let tokenType = tokenResponse.token_type
    console.log(tokenType);

    //Get the created Dashboard

    let getDashboard = await request.get(`${URL_SF}/services/data/v65.0/sobjects/Dashboard`,

        {

            headers: {

                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${accessToken}`

            }

        }
    )

    expect(getDashboard.status()).toBe(200)
    console.log(getDashboard.status());

    expect(getDashboard.statusText()).toBe("OK")
    console.log(getDashboard.statusText());

    let DashRes = await getDashboard.json()
    console.log(DashRes.recentItems)

    const dashboard = DashRes.recentItems.find((item: any) => item.Title === dashboard_name)
    expect(dashboard, `"${dashboard_name}" not found in recentItems`).toBeTruthy()
    const DashID = dashboard.Id
    console.log("Dashboard ID :", DashID, "| Title :", dashboard.Title)

    //Delete the created Dashboard

    let deleteDashboard = await request.delete(`${URL_SF}/services/data/v65.0/sobjects/Dashboard/${DashID}`,

        {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${accessToken}`

            }
        })

    expect(deleteDashboard.status()).toBe(204)
    console.log(deleteDashboard.status())

    expect(deleteDashboard.statusText()).toBe('No Content')
    console.log(deleteDashboard.statusText())

})
