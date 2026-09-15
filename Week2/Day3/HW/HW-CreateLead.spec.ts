/* 
Home Assignment
Create a Lead using CSS Selectors
1. Navigate to the URL: http://leaftaps.com/opentaps/control/main
2. Enter the username as democsr2.
3. Enter the password as crmsfa.
4. Click the Login button.
5. Click CRM/SFA.
6. Click Leads.
7. Click Create Lead.
8. Use only CSS selectors to locate all web elements.
9. Fill the Company Name.
10. Fill the First Name.
11. Fill the Last Name.
12. Fill the Salutation.
13. Fill the Title.
14. Fill the Annual Revenue.
15. Fill the Department.
16. Locate the Source dropdown using a CSS selector.
17. Iterate through all options in the Source dropdown.
18. Print each dropdown value/text in the console.
19. Fill the Phone Number.
20. Click the Create Lead button.
*/

import {test} from "@playwright/test"

test('Create a Lead using CSS Selectors',async ({page}) => {

await page.goto("https://leaftaps.com/opentaps/control/main")

//By Attribute Value = [attr:'value']
await page.locator('[id="username"]').fill('democsr2')

//By ID Value = #idValue
await page.locator('#password').fill('crmsfa')

//By Class value = .classValue
await page.locator('.decorativeSubmit').click()

//Visible Text = text attribute
await page.locator('text=CRM/SFA').click() //click link

//By IDValue
await page.locator('[href="/crmsfa/control/leadsMain"]').click() //attr='value'

await page.locator('[href="/crmsfa/control/createLeadForm"]').click() //attr='value'

//Filling the Create Lead form using CSS Selectors
await page.locator('#createLeadForm_companyName').fill('WIPRO') //#idvalue
await page.locator('#createLeadForm_firstName').fill('SUGANYAA') //#idvalue
await page.locator('#createLeadForm_lastName').fill('PARIVALLAL') //#idvalue
await page.locator('[name="personalTitle"]').fill('PARIVALLAL') //attr='value'
await page.locator('#createLeadForm_generalProfTitle').fill('Mrs') //#idvalue
await page.locator('[name="annualRevenue"]').fill('2000000') //attr='value'
await page.locator('[name="departmentName"]').fill('IT') //attr='value'
await page.locator('[name="departmentName"]').fill('IT') //attr='value'
await page.locator('#createLeadForm_primaryPhoneNumber').fill('1234567890') //#idvalue

// 16. Locate the Source dropdown using a CSS selector.
const sourceOptions = page.locator('#createLeadForm_dataSourceId') //getting the Source drop-down values from the locator
const sourceCount = await sourceOptions.count() //getting the count from the Source list
console.log("The Source count: ", sourceCount);

// 17. Iterate through all options in the Source dropdown.
for (let i = 0; i < sourceCount; i++)
    {
        console.log("The Options from the Source: ", await sourceOptions.nth(i).innerText());        
    } 

await page.locator('[class="smallSubmit"]').click()

})
