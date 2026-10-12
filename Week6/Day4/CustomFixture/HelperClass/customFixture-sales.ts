//1. Import test alias 'base'
import { test as base } from "@playwright/test"

//2.Import the classes
import { SF_LoginPage } from "../Pages/CustomFixture-Hie/Sales/1_Login_SF"
import { SF_HomePage } from "../Pages/CustomFixture-Hie/Sales/2_Home_SF"
import { SF_LeadPage } from "../Pages/CustomFixture-Hie/Sales/3_Lead_SF"
import { SF_VerifyLead } from "../Pages/CustomFixture-Hie/Sales/4_VerifyLead_SF"

//3.create custom 'type' keyword for creating object of Custom Type
type myFixture = {
    //key : value
    sf_loginfix: SF_LoginPage
    sf_homefix: SF_HomePage
    sf_leadfix: SF_LeadPage
    sf_vleadfix: SF_VerifyLead
}

//4.Extending the 'base' test
//<> - 
export const test = base.extend<myFixture>({
    //key : value
    //creating obj for respective Page inside the custom Fixture
    //'use' will return the new Page ref
    sf_loginfix: async ({ page }, use) => {
        let lpobj = new SF_LoginPage(page)
        await use(lpobj)
    },

    sf_homefix: async({ page }, use) => {
    let hpobj = new SF_HomePage(page)
    await use(hpobj)
    },

    sf_leadfix: async({ page }, use) => {
    let leadobj = new SF_LeadPage(page)
    await use(leadobj)
    },

    sf_vleadfix : async({ page }, use) => {
        let vleadobj = new SF_VerifyLead(page)
        await use(vleadobj)
    }
    
})
