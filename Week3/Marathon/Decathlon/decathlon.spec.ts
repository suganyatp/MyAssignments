import { test, expect } from "@playwright/test"

test.use({ channel: 'chrome' });

test('Decathlon Product Search, Filter & Add to Cart', async ({ page }) => {

    //1.Launch the Browser using the 'page' fixture
    //2.Navigate to the website - https://www.decathlon.in/
    await page.goto('https://www.decathlon.in/')

    //3.Verify the homepage
    let dHome = page.getByRole('link', { name: "Decathlon Home" })
    await expect(dHome).toBeVisible()

    //4.Click on the Search input field
    let searchBox = page.locator('input[type="search"]')
    await searchBox.click()

    //5.Verify the searchbox is enabled
    await expect(searchBox).toBeEnabled()

    //6.Enter "shoes" in the search field
    await searchBox.fill('shoes')

    //7. Press enter to search the product
    await searchBox.press('Enter')
    await page.waitForURL(/search/i)

    //8.Capture and Print the Page title
    let pageTitle = await page.title()
    console.log("The Page title is : ", pageTitle)

    //9.Verify the Page title
    await expect(page).toHaveTitle('Search | shoes')

    //10.Click on "Running" category filter
    let shoes = page.locator('//span[text()="Sport"]')
    await shoes.click()
    let running = page.locator('//span[text()="Running"]')
    await running.click()

    //11.Click on "Men" gender filter
    let gender = page.locator('//span[text()="Gender"]')
    await gender.click()
    let men = page.locator('//span[text()="Men"]')
    await men.last().click()

    //12.Click on Shoe size filter "10.5"
    let size = page.locator('//span[text()="Size"]')
    await size.click()
    let sizeNum = page.locator('//span[text()="10.5"]')
    await sizeNum.click()

    //13.Click on 'Most Relevant' sorting drop-down
    let relevantdrop = page.locator('//span[text()="Most relevant"]')
    await relevantdrop.click()

    //14.Select Low-High from options
    let ltoh = page.getByText(/Price \(low → high\)/)
    await ltoh.click()
    await page.waitForLoadState('networkidle')

    //15.Click on the first product
    let firstProd = page.getByRole('link', { name: /Men Running Lightweight/i }).first()
    expect(firstProd).toBeVisible
    await firstProd.click()

    //16.Select the shoe size UK 10.5 - EU 45 
    let shoeSize = page.getByRole('button', { name: 'Select size 10.5' })
    expect(shoeSize).toBeVisible()
    await shoeSize.click()

    //17. Click Add to Cart 
    let addCart = page.getByRole('button', { name: 'Add to cart' })
    const cartResp = page.waitForResponse('**/services/be/cart/**')  // 1. start listening
    await addCart.click()                                             // 2. trigger the request
    await cartResp                                                    // 3. pause until the response arrives
    const response = await cartResp
    expect(response.ok()).toBeTruthy()   // status 200–299

    //18.Click on Cart option
    let cartLink = page.getByRole('link', { name: 'Cart' })
    await expect(cartLink).toHaveCount(1)
    await cartLink.click()
    await expect(page).toHaveTitle('Decathlon - Cart')

    //19.Fetch the total cart value
    let total = page.locator('//div[@data-test-id="cart:cart-checkout-total-cart-value"]')
    await expect(total).toBeVisible({ timeout: 10000 })

    //20.print the value in Console
    console.log("The Total Cart Value : ", await total.innerText());

})
