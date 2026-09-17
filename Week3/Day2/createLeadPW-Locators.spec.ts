/* 
Create a Lead using Playwright Locators
1. Navigate to the URL: http://leaftaps.com/opentaps/control/main
2. Enter the username as Demosalesmanager
3. Enter the password as crmsfa
4. Click the Login button
5. Click CRM/SFA
6. Click Leads
7. Click Create Lead
8. Fill the Company Name
9. Fill the First Name
10. Fill the Last Name
11. Fill the Salutation
12. Fill the Title
13. Fill the Annual Revenue
14. Fill the Department
15. Fill the Phone Number
16. Click Create Lead button
*/

import { test, expect } from '@playwright/test';

test('Create Lead using PLAYWRIGHT LOCATORS', async ({ page }) => {
  await page.goto('https://leaftaps.com/opentaps/control/main'); //1.

  await page.getByRole('textbox', { name: 'Username' }).fill('Demosalesmanager'); //2.
  await page.getByRole('textbox', { name: 'Password' }).fill('crmsfa'); //3.
  await page.getByRole('button', { name: 'Login' }).click(); //4.
  
  await page.getByRole('link', { name: 'CRM/SFA' }).click(); //5.

  //Leads -> Create Leads
  await page.getByRole('link', {name: "Leads"}).click() //6.
  await page.getByRole('link', {name: "Create Lead"}).click() //7.

  //Form Fill-up
  await page.getByLabel('Company Name').fill('INFINITE COMPUTER SOLUTIONS') //8.
  await page.locator('#createLeadForm_firstName').fill('KAVYA')// 9.
  await page.locator('#createLeadForm_lastName').fill('RAJAN') // 10.
  await page.locator('#createLeadForm_personalTitle').fill('Ms.') // 11.
  await page.locator('#createLeadForm_generalProfTitle').fill('Project Manager') // 12.
  await page.locator('#createLeadForm_annualRevenue').fill('2400000') // 13.
  await page.locator('#createLeadForm_departmentName').fill('Health and Nutrition') // 14.
  await page.locator('#createLeadForm_primaryPhoneNumber').fill('9987665431') // 15.
  await page.locator('[value="Create Lead"]').click() //16.

});
