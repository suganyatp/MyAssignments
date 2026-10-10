import {expect} from "@playwright/test"
import { SF_HomePage } from "./2_homePage";
export class SF_LeadPage extends SF_HomePage {
    //1. Click New
    async clickLeadsNewButton() {
        await this.page.getByRole('button', { name: "New" }).click()
    }
    //2. Enter Mandatory Fields
    async newLeadForm() {
        await this.page.getByRole('combobox', { name: "Salutation" }).click()
        await this.page.getByText('Mrs.', { exact: true }).click()
        await this.page.getByRole('textbox', { name: "First Name" }).fill("Chitra")
        await this.page.getByRole('textbox', { name: "Last Name" }).fill("Devi")
        await this.page.getByRole('textbox', { name: "Company" }).fill("Infosys")
    }
    //3. Create Lead - Save
    async clickonLeadSave() {
        await this.page.locator('//button[text()="Save"]').click()
    }
    //4.Verify Lead
    async verifyLead() {
        let leadName = await this.page.getByRole('heading', { name: "Lead Mrs. Chitra devi" }).innerText()
        console.log("The Lead Name is :", leadName);
        //Retry Assertion
        await expect(this.page.getByRole('heading', { name: "Lead Mrs. Chitra devi" })).toContainText('Chitra')      
    }
}