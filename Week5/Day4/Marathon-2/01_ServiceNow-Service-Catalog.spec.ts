import { test, expect } from "@playwright/test"

import credentials from "../../../../Data/servicenow.json"

test('Search Product and Add to Cart in Service Now', async ({ page }) => {

    //1.Launch browser and navigate to Service Now application URL
    await page.goto('https://dev183060.service-now.com/')
    //2. Login using valid admin credentials
    await page.getByRole('textbox', { name: 'User name' }).fill(credentials.username)
    await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password)
    await page.getByRole('button', { name: 'Log in' }).click()
    //3. Verify Service Now home page is displayed
    //4. Navigate to All → Service Catalog
    await page.getByRole('menuitem', { name: 'All' }).click()
    const filter = page.getByPlaceholder('Filter')
    await filter.fill(credentials.filter)      // "Service Catalog"

    //5. Switch to Service Catalog iframe
    await page.getByText('Service Catalog', { exact: true }).first().click()

    //6. Select Mobiles category - iFrame
    const serviceFrame = page.frameLocator('#gsft_main')
    await serviceFrame.locator('//a[text()="Mobiles"]').click()

    // 7. Choose Apple iPhone 13 Pro - iFrame
    const apple13Pro = serviceFrame.locator('//strong[text()="Apple iPhone 13 pro"]')
    await apple13Pro.click()

    // 8. Configure all required options
    await serviceFrame.getByText('No', { exact: true }).click()
    await expect(serviceFrame.locator('input[value="no"]')).toBeChecked()

    const allowance = serviceFrame.getByRole('combobox', { name: /Monthly data allowance/i })
    await allowance.selectOption('500MB')
    await expect(allowance).toHaveValue('500MB')

    await serviceFrame.getByText('Graphite', { exact: true }).click()
    await expect(serviceFrame.getByRole('radio', { name: 'Graphite' })).toBeChecked()

    await serviceFrame.getByText('256 GB', { exact: true }).click()
    await expect(serviceFrame.locator('input[value="256"]')).toBeChecked()

    // 9. Click Order Now - iframe
    await page.waitForTimeout(2000)
    const orderBtn = serviceFrame.getByRole('button', { name: 'Order Now' })
    await orderBtn.click()

    // 10. Verify order confirmation message - iframe
    const confirmMsg = serviceFrame.getByText('Thank you, your request has been submitted')
    await expect(confirmMsg).toBeVisible({ timeout: 30000 })

    // 11. Capture full - page screenshot - PAGE
    await page.screenshot({ path: 'screenshots/order-confirmation.png', fullPage: true })

})
