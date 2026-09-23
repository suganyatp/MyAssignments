/* 
Home Assignment:

Launch the browser
Navigate to the URL- https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm
Switch to the iFrame containing the "Try it" button
Ensure the webpage elements are fully loaded (Playwright auto-waits)
Click the "Try It" button inside the frame
Handle the Confirm Alert by clicking either "OK" or "Cancel"
Verify that the appropriate message is displayed on the webpage "You pressed OK!"
*/

import {test, expect} from "@playwright/test"

test ('Frames and Confirm Alerts', async ({page}) => {

    // Calling the Event Listener for the Confirm Alert

    page.on('dialog', async (alert) => {

        let alertType = alert.type()
        console.log("Alert Type is :", alertType); // confirm

        if(alertType === "confirm") {
            
            alert.accept()
        
        } else {

            alert.dismiss()
        }

    })

    page.waitForLoadState('domcontentloaded')

    await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm')
    
    //Using frameLocator() -> Button action
    let iframeName = page.frameLocator('//iframe[@id="iframeResult"]')
    await iframeName.locator('//button[text()="Try it"]').click()

    //Accepting OK 
    const text = await iframeName.locator('//p[@id="demo"]').textContent()
    console.log(text);

    await expect(iframeName.locator('//p[@id="demo"]')).toContainText("You pressed OK!")

})
