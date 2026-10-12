import {expect} from "@playwright/test"
import { PWWrapper } from "../../../helper/playwrightWrapper" 

export class SF_VerifyLead extends PWWrapper {
    //Verify Lead
    async verifyLead(expCompName: string) {
        //1.Assert the toast message
        const leadToastMgg = this.page.locator('//span[contains(@class,"toastMessage")]')
        await expect(leadToastMgg).toContainText('was created.', { timeout: 5000 })
        //2.Close the toast message
        await this.click('(//span[text()="Close"])[2]')
        //3.Assert the CompanyName
        let compName = await this.page.locator('(//p[contains(@class,"fieldComponent")])[2]').innerText()
        console.log("The Company Name : ", compName);
        console.log("The returneed Company Name : ", expCompName);
        //4.non-retry assertion
        expect(compName).toBe(expCompName)
        //Retry Assertion
        await expect(this.page.locator('(//p[contains(@class,"fieldComponent")])[2]')).toHaveText(expCompName)
    }
}