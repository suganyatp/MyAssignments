/* 
Assignment: 2 Edit Lead
http://leaftaps.com/opentaps/control/main
1. Launch the browser
2. Enter the username
3. Enter the password
4. Click Login
5. Click CRM/SFA link
6. Click Leads link
7. Click on Create Lead
8. Enter company name
9. Enter first name
10.Enter last name
11.Click on Create Lead button
12.Click Edit
13.Change the company name
14.Click Update
*/

import {test} from "@playwright/test"

test('Edit Lead using CSS Selectors',async ({page}) => {
    
await page.goto("https://leaftaps.com/opentaps/control/main") //1

//By Attribute Value = [attr:'value']
await page.locator('[id="username"]').fill('democsr2') //2

//By ID Value = #idValue
await page.locator('#password').fill('crmsfa') //3

//By Class value = .classValue
await page.locator('.decorativeSubmit').click() //4

//Visible Text = text attribute
await page.locator('text=CRM/SFA').click() //5.click link

//By IDValue
await page.locator('[href="/crmsfa/control/leadsMain"]').click() //6. attr='value'

await page.locator('[href="/crmsfa/control/createLeadForm"]').click() //7. attr='value'

//Filling the Create Lead form using CSS Selectors
await page.locator('#createLeadForm_companyName').fill('CG') //8. #idvalue
await page.locator('#createLeadForm_firstName').fill('KAVITHA') //9. #idvalue
await page.locator('#createLeadForm_lastName').fill('KRISHNA') //10. #idvalue
await page.locator('[class="smallSubmit"]').click() //11

//Edit Lead
await page.locator("//a[text()='Edit']").click() //12. Click Edit
await page.locator("[id='updateLeadForm_companyName']").fill('Infinite') //13. Edit/change complanyName
await page.locator('[value="Update"]').click() //14. Update

})
