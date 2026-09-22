/* 
Home Assignment 
Launch the URL: https://www.leafground.com/alert.xhtml
Click on Prompt Dialog.
Switch to the JavaScript prompt alert.
Enter a value using accept("Playwright").
*/

import {test, expect} from "@playwright/test"

test ('Handle Alert with input type', async ({page}) => {

    //Event-Listerner to accept value for the "Prompt" alert

    page.on('dialog', async (alert) => {

        let alertType = alert.type()
        console.log("Alert Type is : ", alertType); //Alert Type is :  prompt

        if (alertType === "prompt") {
            
            await alert.accept("Playwright")

        } else {
            
            console.log("The alert is either simple or confirm");
            
        }

    })

    await page.goto("https://www.leafground.com/alert.xhtml")

    //prompt alert --> ok, cancel and input text box
    await page.locator('//span[text()="Show"]').nth(4).click()

    const textEntered = await page.locator('#confirm_result').textContent()
    console.log(textEntered); //User entered name as: Playwright

    await expect(page.locator('#confirm_result')).toContainText('Playwright') 
    
})
