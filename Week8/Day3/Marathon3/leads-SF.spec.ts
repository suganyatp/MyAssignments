import { test, expect } from "@playwright/test"

import dotenv from 'dotenv'

test.use(
    {
        storageState: 'Data/mysalesforce-login.json'
    }
)

dotenv.config({ path: 'Data/salesforce-secrets.env' })

let Acc_tok: any

let tok_Type: any

let lead_id: any

let baseURL = process.env.URL_SF as string

let clientID = process.env.client_id as string

let client_secret = process.env.client_secret as string

let direct_URL = process.env.direct_sales_URL as string

let firstName: string = 'Alex'

let lastName: string = 'Paul'

test.use(
    {
        storageState: 'Data/mysalesforce-login.json'
    }
)

test('Leads API-UI Actions in SalesForce Page', async ({ page, request }) => {

    //API Actions in Sales Force

    //Create Auth Token for Sales Force

    let authRes = await request.post(`${baseURL}/services/oauth2/token`,

        {

            headers: {

                "Content-Type": "application/x-www-form-urlencoded"

            },
            form: {

                "grant_type": "client_credentials",
                "client_id": clientID,
                "client_secret": client_secret

            }

        })

    expect(authRes.status()).toBe(200)
    console.log(authRes.status());

    expect(authRes.statusText()).toBe("OK")
    console.log(authRes.statusText())

    let tokenResponse = await authRes.json()
    console.log(tokenResponse)

    Acc_tok = tokenResponse.access_token
    tok_Type = tokenResponse.token_type

    // Create Lead API req in Sales Force via PW Automation

    let createRes = await request.post(`${baseURL}/services/data/v64.0/sobjects/lead`,
        {

            headers: {

                "Content-Type": "application/json",
                "Authorization": `${tok_Type} ${Acc_tok}`

            },
            data: {

                "Salutation": "Mr.",
                "LastName": `${lastName}`,
                "Company": "EdTech"

            }

        })

    expect(createRes.status()).toBe(201)
    console.log(createRes.status())

    expect(createRes.statusText()).toBe('Created')
    console.log(createRes.statusText())

    let leadResponse = await createRes.json()
    console.log(leadResponse);

    lead_id = leadResponse.id
    console.log("Created Lead Sys Id :", lead_id);

    //Update via PATCh

    let updateRes = await request.patch(`${baseURL}/services/data/v64.0/sobjects/lead/${lead_id}`,
        {

            headers: {

                "Content-Type": "application/json",
                "Authorization": `${tok_Type} ${Acc_tok}`

            },
            data: {

                "FirstName": `${firstName}`,
                "Email": "alex.paul@edtech.com"

            }
        })

    expect(updateRes.status()).toBe(204)
    console.log(updateRes.status())

    expect(updateRes.statusText()).toBe('No Content')
    console.log(updateRes.statusText())

    //Get the recent item via API to compare with UI

    let getResp = await request.get(`${baseURL}/services/data/v64.0/sobjects/lead/${lead_id}`,
        {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `${tok_Type} ${Acc_tok}`

            }
        })

    expect(getResp.status()).toBe(200)
    console.log(getResp.status())

    expect(getResp.statusText()).toBe('OK')
    console.log(getResp.statusText())

    //retrieve the lead Name
    let lead_resp = await getResp.json()
    console.log("The Lead Name :", lead_resp.Name)
    expect(lead_resp.Name).toBe(`${firstName} ${lastName}`) // direct GET returns "First Last"

    // ********************* //

    //UI Actions in Sales Force//

    //1 Login to Sales Force
    await page.goto(direct_URL)
    await page.waitForLoadState('domcontentloaded')
    console.log("Home Page Title : ", await page.title());

    //2 App-Launcher
    await page.getByTitle('App Launcher').click()

    //3 View All
    await page.getByRole('button', { name: "View All Applications" }).click()
    const search = page.getByRole('combobox', { name: 'Search apps or items...' })
    await search.fill('Leads')

    //4 Click Leads
    const leadsLink = page.getByRole('link', { name: 'Leads', exact: true })
    await expect(leadsLink).toBeVisible()
    await leadsLink.click()

    //5 Search last name and Enter
    await page.getByRole('button', { name: 'Search' }).click()
    let searchLName = page.getByPlaceholder('Search...')
    await searchLName.fill(lastName)
    await searchLName.press('Enter')

    //6 verify lead name displayed in UI is the same created through API

    // UI: same lead shown as "First Last"
    const uiLeadName = page.getByRole('rowheader').getByRole('link', { name: `${firstName} ${lastName}`, exact: true })
    await expect(uiLeadName).toBeVisible({ timeout: 15000 })
    console.log('UI Lead Name  :', await uiLeadName.innerText())

    //7 Delete the lead
    const leadRow = page.getByRole('row').filter({ has: uiLeadName })
    await leadRow.getByRole('button', { name: 'Show Actions' }).click()
    await page.getByRole('menuitem', { name: 'Delete' }).click()
    //handle the pop-up delete
    await page.getByRole('dialog').getByRole('button', { name: 'Delete' }).click()
    //Assert the toastmessage
    const deleteToast = page.locator('span.toastMessage', { hasText: 'was deleted' })
    await expect(deleteToast).toContainText(`Lead "${firstName} ${lastName}" was deleted.`)
    console.log('Toast:', await deleteToast.innerText())

    //8 Verify the deleted lead
    await page.getByRole('button', { name: 'Search' }).click()
    searchLName = page.getByPlaceholder('Search...')
    await searchLName.fill(`${firstName} ${lastName}`)
    await searchLName.press('Enter')
    //assert
    await expect(page.getByText("Don't give up yet!")).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/didn't find any matches for/))
        .toContainText(`"${firstName} ${lastName}"`)

    //Take screenshot
    await page.screenshot({ path: 'screenshots/lead-not-exist.png', fullPage: true })

})
