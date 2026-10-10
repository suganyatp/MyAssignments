import { SF_LoginPage } from "./1_loginPage"
export class SF_HomePage extends SF_LoginPage {
    //1. Click App Launcher
    async clickAppLauncherButton() {
        await this.page.getByRole('button', { name: "App Launcher" }).click()
    }
    //2. Click View All
    async clickViewAllButton() {
        await this.page.getByRole('button', { name: "View All Applications" }).click()
    }
    //3. Search for Leads in search box
    async enterLeadsSearchBox() {
        await this.page.getByRole('combobox', { name: "Search apps or items..." }).fill('leads')

    }
    //4. Navigate to Leads
    async clickonLeads() {
        await this.page.locator('//mark[text()="Leads"]').click()
    }
}