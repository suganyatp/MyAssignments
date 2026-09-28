import { test, expect } from "@playwright/test"

import path from 'path'

test('Multiple Files Upload using input tag', async ({ page }) => {


    await page.goto('https://www.leafground.com/file.xhtml')

    let mulFileUpload = page.locator('(//input[@type="file"])[2]')

    //Multiple File Upload using Array
    await mulFileUpload.setInputFiles([
        path.join(__dirname, '../../../Data/sunflower.jpeg'),
        path.join(__dirname, '../../../Data/tulip.jpeg')
    ])

    await expect(page.locator('//div[text()="sunflower.jpeg"]')).toBeVisible()
    await expect(page.locator('//div[text()="tulip.jpeg"]')).toBeVisible()
    console.log("The files are uploaded");
    

})