import { PWWrapper } from "../../../helper/playwrightWrapper" 
import { faker } from "@faker-js/faker"

export class SF_LeadPage extends PWWrapper {
    //1. Click New
    async clickLeadsNewButton() {
        //await this.page.getByRole('button', { name: "New" }).click()
        await this.click('//button[text()="New"]')
    }
    //2. Enter Mandatory Fields
    async newLeadForm() {
        await this.page.getByRole('combobox', { name: 'Salutation' }).click()
        await this.page.getByRole('option', { name: 'Mx.' }).click()
        //await this.page.getByRole('textbox', { name: "First Name" }).fill("Chitra")
        let fName = faker.person.firstName()
        await this.clearAndFill('//input[@name="firstName"]',fName)
        //await this.page.getByRole('textbox', { name: "Last Name" }).fill("Devi")
        let lName = faker.person.lastName()
        await this.clearAndFill('//input[@name="lastName"]',lName)
        //await this.page.getByRole('textbox', { name: "Company" }).fill("Infosys")
        let cName = faker.company.name()
        await this.clearAndFill('//input[@name="Company"]',cName)
        return cName
    }
    //3. Create Lead - Save
    async clickonLeadSave() {
        //await this.page.locator('//button[text()="Save"]').click()
        await this.click('//button[text()="Save"]')
    }
}