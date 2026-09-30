import { test } from "@playwright/test"
import dotenv from 'dotenv'
import leadData from "../../../Utils/createLead.json" //JSON file
dotenv.config({ path: 'Utils/leafTapCredentials.env' }) //CSV file

let LEAF_URL = process.env.leaf_url as string
let LEAF_UN = process.env.leaf_username as string
let LEAF_PWD = process.env.leaf_password as string

test('Data Parameterization using JSON/CSV/ENV file', async ({ page }) => {
    //LOGIN
    await page.goto(LEAF_URL)
    await page.locator('#username').fill(LEAF_UN)
    await page.locator('#password').fill(LEAF_PWD)
    await page.locator('.decorativeSubmit').click()
    await page.locator('text=CRM/SFA').click()

    //MAIN PAGE - CREATE LEAD 
    await page.locator('//a[text()="Leads"]').click()
    await page.getByRole('link', { name: "Create Lead" }).click()
    //await page.locator('//a[text()="Create Lead"]').click()
    await page.locator('(//input[@name="companyName"])[2]').fill(leadData[0].companyName) //Company Name
    await page.locator('#createLeadForm_firstName').fill(leadData[0].firstName) //First Name
    await page.locator('#createLeadForm_lastName').fill(leadData[0].lastName) //Last Name
    await page.locator('#createLeadForm_dataSourceId').selectOption({ label: "Direct Mail" }) //Source using label

    await page.locator('#createLeadForm_marketingCampaignId').selectOption({ label: "Demo Marketing Campaign" }) //Marketing Campaign using label
    //Get the count and print all the values in the Marketing Campaign dropdown
    const marketOptions = page.locator('#createLeadForm_marketingCampaignId option')
    console.log("The drop-down count in Marketing Campaign: ", await marketOptions.count());
    console.log("The options are :", await marketOptions.allInnerTexts());

    await page.locator('#createLeadForm_industryEnumId').selectOption({ index: 6 }) //Industry using Index
    await page.locator('#createLeadForm_currencyUomId').selectOption(leadData[0].currencyId) //Currency
    await page.locator('#createLeadForm_generalCountryGeoId').selectOption(leadData[0].country) //Country

    await page.locator('#createLeadForm_generalStateProvinceGeoId').selectOption(leadData[0].state) //State
    //Get the count of all states and print the values in the console
    const stateOptions = page.locator('#createLeadForm_generalStateProvinceGeoId option')
    console.log("The drop-down count for State:", await stateOptions.count());
    console.log("The options listed are: ", await stateOptions.allInnerTexts());

    //SUBMIT
    await page.locator('//input[@type="submit"]').click()

})
