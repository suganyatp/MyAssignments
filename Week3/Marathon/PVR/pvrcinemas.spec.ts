
// PVR Cinemas Dynamic Movie Ticket Booking

import {test, expect} from "@playwright/test"

test ('Verify dynamic movie ticket booking flow in PVR Cinemas website', async ({page}) => {

    //1 and 2 - Launch and Navigate
    await page.goto('https://www.pvrcinemas.com/', {waitUntil: "domcontentloaded"})

  /*   // Dismissing the pop-up in the Home Page 
    await page.waitForTimeout(1000) // let any delayed popup render
    const fbPopup = page.locator('//div[contains(text(),"ORDER F&B") or contains(text(),"Curated Shows")]')
    if (await fbPopup.first().isVisible({ timeout: 2000 }).catch(() => false)) {
    // Try pressing Escape, or look for a close (×) button near it
    await page.keyboard.press('Escape').catch(() => {})
    } */

    //3. Select required city
    await page.locator('//div[@class="cities-show"]').click()
    const selectCity = page.locator('//div[@class="cities-names"]').filter({hasText: "Chennai"})
    await expect(selectCity).toBeVisible({ timeout: 10000 })
    await selectCity.click()
    
    //4. Click Cinema option
    const cinemaSelect = page.locator('//span[text()="Movie"]/following-sibling::span[text()="Cinema"]')
    await expect(cinemaSelect).toBeVisible({timeout: 10000})
    await cinemaSelect.click()

    //5. Select Cinema / Theatre dropdown
    await page.locator('#cinema').click({force: true})

    await page.screenshot({ path: 'after-cinema-click.png', fullPage: true }) //snap after click theatre

    //6. Select ANY Cinema / Theatre from the list
    const cinemaPanel = page.locator(
  '//div[contains(@class,"p-dropdown-panel") and not(contains(@class,"p-connected-overlay-exit"))]'
    )   
    await expect(cinemaPanel).toBeVisible({ timeout: 15000 })
    const firstCinema = cinemaPanel.locator('xpath=.//li[@role="option"]').last()
    console.log("Selected Cinema / Theatre: ", await firstCinema.innerText());
    
    await firstCinema.click()
    
    //7. Select any available date (Today / Tomorrow / Upcoming).
    await expect(async () => {
        await page.locator('#date').click({ force: true })
        await expect(
            page.locator('//div[contains(@class,"p-dropdown-panel") and not(contains(@class,"p-connected-overlay-exit"))]')
        ).toBeVisible({ timeout: 3000 })
    }).toPass({ timeout: 30000 })

    const selectDate = page.locator(
        '//div[contains(@class,"p-dropdown-panel") and not(contains(@class,"p-connected-overlay-exit"))]'
    )
    const lastDate = selectDate.locator('xpath=.//li[@role="option"]').last()
    console.log("Selected Date:", (await lastDate.innerText()))
    await lastDate.click({ force: true })

    //8. Select ANY Movie available from list
    await expect(async () => {
        await page.locator('#movie').click({ force: true })
        await expect(
            page.locator('//div[contains(@class,"p-dropdown-panel") and not(contains(@class,"p-connected-overlay-exit"))]')
        ).toBeVisible({ timeout: 3000 })
    }).toPass({ timeout: 30000 })

    const moviePanel = page.locator(
        '//div[contains(@class,"p-dropdown-panel") and not(contains(@class,"p-connected-overlay-exit"))]'
    )
    const firstMovie = moviePanel.locator('xpath=.//li[@role="option"]').first()
    console.log("Selected Movie: ", await firstMovie.innerText());
    await firstMovie.click({ force: true })

    //9.Select any available show time.
    await page.locator('#time').click({ force: true })
    await expect(async () => {
        await page.locator('#time').click({ force: true })
        await expect(
            page.locator('//div[contains(@class,"p-dropdown-panel") and not(contains(@class,"p-connected-overlay-exit"))]')
        ).toBeVisible({ timeout: 3000 })
    }).toPass({ timeout: 30000 })

    const timingPanel = page.locator(
        '//div[contains(@class,"p-dropdown-panel") and not(contains(@class,"p-connected-overlay-exit"))]'
    )
    const firstShowtime = timingPanel.locator('xpath=.//li[@role="option"]').first()
    console.log('Selected Time: ', await firstShowtime.innerText())
    await firstShowtime.click({ force: true })

    //10.Click on the Submit button
    await page.locator('//button[@aria-label="Submit"]').click()
    
    //11.Accept the consent / cookie popup if displayed.
    await page.getByRole('button', {name: "Accept"}).click()

    //12.Accept the T&C
    await page.locator('//button[text()="Accept"]').click({ force: true })

    //13. Select ANY available seat from the seating layout - RANDOM
    const availableSeats = page.locator('//span[contains(@class,"seat-current-pvr")]')
    await expect(availableSeats.first()).toBeVisible({ timeout: 20000 })

    const seatCount = await availableSeats.count()
    const randomIndex = Math.floor(Math.random() * seatCount)
    const randomSeat = availableSeats.nth(randomIndex)

    // The right panel shows something once a seat is picked — verify dynamically
    const seatInfo = page.locator('//*[contains(@class,"seat-number") or contains(text(),"Selected")]')
    await expect(seatInfo.first()).toBeVisible({ timeout: 10000 })
    
    //14. Verify the selected seat information is displayed
    console.log("Selected Seat ID: ", await randomSeat.getAttribute('id'))
    await randomSeat.scrollIntoViewIfNeeded()
    await randomSeat.click()
    
    // Confirm the seat selection actually registered (e.g., "No Seat Selected" text should disappear)
    const noSeatMsg = page.locator('//*[contains(text(),"No Seat Selected")]')
    await expect(noSeatMsg).not.toBeVisible({ timeout: 10000 })

    //15. Verify the total ticket amount is displayed
    const grandTotal = page.locator('//div[contains(@class,"grand-prices")]//h6')
    await expect(grandTotal).toBeVisible({ timeout: 20000 })
    console.log("The Grand Total: ", (await grandTotal.innerText()))

    //16.Verify the page title is displayed correctly
    await expect(page).toHaveTitle(/PVR/)

    //17.Click on the Proceed button.
    await page.getByRole('button', {name: "Proceed"}).click()
    
})
