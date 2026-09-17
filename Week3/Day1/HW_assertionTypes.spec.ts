/* 
Write a Playwright test that performs the following steps:

🔹 Part 1: Navigate to the page
Launch Playwright test.
Navigate to the page:
https://leafground.com/input.xhtml

🔹 Part 2: Validate a Disabled Textbox
Locate the textbox with placeholder "Disabled".
Assert that it is disabled using:
await expect(locator).toBeDisabled()

🔹 Part 3: Validate an Enabled Textbox
Locate another textbox (example: the one with placeholder "Type your name").
Assert that it is enabled using:
await expect(locator).toBeEditable()
Type your name into the textbox.

🔹 Part 4: Soft Assertion Practice
Pick a textbox that is not disabled.
Use:
await expect.soft(locator).toBeDisabled()
Observe the test result and understand how soft assertions behave.

🔹 Part 5: Fill Data
Choose a textbox (any enabled one).
Clear existing text using .fill()
Enter a new value (Ex: "Playwright Learning")
*/

import {expect, test} from "@playwright/test"

test('Learn assertions in playwright', async ({page}) => {

await page.goto("https://leafground.com/input.xhtml") //1. Page Navigation

const textboxDisabled = page.locator('//input[@placeholder="Disabled"]') //2.Check for the Disabled TextBox
await expect(textboxDisabled).toBeDisabled()

const textboxEnabled = page.locator('//input[@placeholder="Babu Manickam"]') //3. Check for the enabled TextBox
await expect(textboxEnabled).toBeEditable()
textboxEnabled.fill('Suganyaa Parivallal') //3. Fill the name

await expect.soft(textboxEnabled).toBeDisabled() //4. soft assertion - code fails here

await page.locator('//input[@value="My learning is superb so far."]').fill('Playwright Learning') //5. Fill text

})
