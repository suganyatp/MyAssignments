import { test, expect } from "@playwright/test"
import { parse } from "csv-parse/sync"
import fs from 'fs'
import path from 'path'

//Parse the values
let JSObj: any = parse(fs.readFileSync('Utils/loginData.csv', 'utf-8'), { columns: true, skip_empty_lines: true })

for (let loginData of JSObj) {

    test(`Read Data From CSV for ${loginData.username}`, async ({ page }) => {
        await page.goto('https://leaftaps.com/opentaps/control/main')
        await page.locator('[id="username"]').fill(loginData.username)
        await page.locator('[id="password"]').fill(loginData.password)
        await page.locator('.decorativeSubmit').click()
        await expect(page.getByRole('heading', { name: "Welcome Demo B2B CSR" })).toBeVisible

    })
}
