import { PWWrapper } from "../../../helper/playwrightWrapper" 
export class SF_HomePage extends PWWrapper {
    //1. Click App Launcher
    async clickAppLauncherButton() {
        //await this.page.getByRole('button', { name: "App Launcher" }).click()
        await this.click('//button[@title="App Launcher"]')
    }
    //2. Click View All
    async clickViewAllButton() {
        //await this.page.getByRole('button', { name: "View All Applications" }).click()
        await this.click('//button[text()="View All"]')
    }
    //3. Search for Leads in search box
    async enterLeadsSearchBox() {
        //await this.page.getByRole('combobox', { name: "Search apps or items..." }).fill('leads')
        await this.clearAndFill('div[type="search"] input', 'Leads')
    }
    //4. Navigate to Leads
    async clickonLeads() {
        //await this.click('//mark[text()="Leads"]')
        await this.click('text="Leads" ')
    }
}