import {test} from "@playwright/test"

test.use(
    {
       storageState:'Data/leaftapslogin.json' 
    }
)

test('Skip Leaftaps Login using Storage State', async ({page}) => {

    await page.goto("https://leaftaps.com/crmsfa/control/main?externalLoginKey=EL162181781214")

    await page.waitForLoadState("domcontentloaded")

    console.log(await page.title());

})
