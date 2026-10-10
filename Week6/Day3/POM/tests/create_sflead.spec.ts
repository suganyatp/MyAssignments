import { test } from "@playwright/test";
import { SF_LeadPage } from "../../Pages/SalesForce/3_leadPage"

test.use(
    {
        storageState: '../../Data/sflogin.json'
    }
)

test ('Create Lead from Sales Force using POM', async ({ page }) => {
    let viewL = new SF_LeadPage(page)
    await viewL.sf_loadUrl("https://orgfarm-67fcf66cff-dev-ed.develop.lightning.force.com/lightning/page/home")
    await viewL.clickAppLauncherButton()
    await viewL.clickViewAllButton()
    await viewL.enterLeadsSearchBox()
    await viewL.enterLeadsSearchBox()
    await viewL.clickonLeads()
    await viewL.clickLeadsNewButton()
    await viewL.newLeadForm()
    await viewL.clickonLeadSave()
    await viewL.verifyLead()
})
