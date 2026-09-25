/* 
Requirements:
- Navigate to "http://leaftaps.com/opentaps/control/main"
- Enter the username - Demosalesmanager
- Enter the password - crmsfa
- Click the Login button.
- Click CRM/SFA
- Click Leads
- Click Merge Leads
- Click From Lead widget
- Select the first resulting lead id
- Click To Lead widget
- Select the second resulting lead id
- Click Merge button
- Get the message and type of the alert
- Accept the alert
- Assert the title of the page
*/

import {test, expect} from "@playwright/test"

test ('Leaftaps - Window Handling', async ({page, context}) => {

    //Event-Listerner to accept value for the Confirm alert

    page.on('dialog', async (alert) => {

        let alertType = alert.type()
        console.log("The Alert Type is : ", alertType); //confirm

        if (alertType === "confirm") {

            await alert.accept()
            console.log("The message on the Alert says: ", alert.message());
            
        } else {
            
            console.log("Just nothing ...");
            
        }

    })

    //Launch the URL
    await page.goto('http://leaftaps.com/opentaps/control/main')

    //Username - Password - Login
    await page.locator('[id="username"]').fill('Demosalesmanager')
    await page.locator('[id="password"]').fill('crmsfa')
    await page.locator('[value="Login"]').click()

    //CRM/SFA - Leads - Merge Leads
    await page.getByRole('link', { name: "CRM/SFA" }).click()
    await page.locator('//div[@class="x-panel-header"]/a[text()="Leads"]').click()
    await page.locator('//a[text()="Merge Leads"]').click()

    page.waitForLoadState('domcontentloaded')

    //From Lead Page with main page
    //Register the EventListener, as the new window opens for the same context
    //Click the 1st lead id
    let [fromLeadwidget] = await Promise.all([context.waitForEvent('page'), page.locator('//img[@alt="Lookup"]').first().click()])
    fromLeadwidget.waitForLoadState('domcontentloaded')
    await fromLeadwidget.locator('//a[@class="linktext"]').first().click()

    //To Lead Page with main page
    //Register the EventListener, as the new window opens for the same context
    //Click the 2nd lead id
    let [toLeadWidget] = await Promise.all([context.waitForEvent('page'), page.locator('//img[@alt="Lookup"]').last().click()])
    toLeadWidget.waitForLoadState('domcontentloaded')
    await toLeadWidget.locator('//a[@class="linktext"]').nth(6).click()
    
    //Merge button
    await page.locator('//a[text()="Merge"]').click()

    //print the title of the main page
    page.waitForLoadState('domcontentloaded')
    console.log("The Title of the Page: ", await page.title());
    await expect(page).toHaveTitle(/View Lead|Leads/)

})
