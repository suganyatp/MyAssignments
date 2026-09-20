/* 
Classroom Activity – Storage State

Goal: Skip login using storageState.

Test Steps
Open Leaftaps application.
Enter username: democsr.
Enter password: crmsfa.
Click Login.
Save the login session using storageState.
Create a new test.
Load the saved storage state.
Open Leaftaps directly.
Verify that the Welcome/Home page is displayed.
Confirm that the login page is skipped.
*/

import {test} from "@playwright/test"

test('Store LeafTaps Login using Storage State', async ({page}) => {

    await page.goto("https://leaftaps.com/opentaps/control/main")

    await page.getByRole("textbox", {name: "username"}).fill("democsr")

    await page.getByLabel("Password").fill("crmsfa")

    await page.getByRole('button', {name: "Login"}).click()

    await page.waitForTimeout(20000)

    await page.context().storageState({path: 'Data/leaftapslogin.json'})

})
