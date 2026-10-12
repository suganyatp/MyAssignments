//1.Import the customized test runner from helper class
import { test } from "../../helper/customFixture-sales"

//2.Import the classes
import { SF_LoginPage } from "../../Pages/CustomFixture-Hie/Sales/1_Login_SF"
import { SF_HomePage } from "../../Pages/CustomFixture-Hie/Sales/2_Home_SF"
import { SF_LeadPage } from "../../Pages/CustomFixture-Hie/Sales/3_Lead_SF"
import { SF_VerifyLead } from "../../Pages/CustomFixture-Hie/Sales/4_VerifyLead_SF"

//3.Import the ENV package
import dotenv from "dotenv"

//4.Use the URL from ENV file
dotenv.config({ path : 'Data/sf_direct.env' })

//5.Storage State
test.use(
    {
        storageState: 'Data/sfauth.json'
    }
)

//6.Custom Fixture Page(s)
test ('Create Lead with Custom Fixture for SalesForce', async ({

    sf_loginfix,
    sf_homefix,
    sf_leadfix,
    sf_vleadfix

}) => {

    //6.Use the Custom Fixture object to call the methods in each page

    //7.SF_LoginPage custom fixture object
    await sf_loginfix.sf_loadUrl(process.env.direct_url as string)

    //8.SF_HomePage custom fixture object
    await sf_homefix.clickAppLauncherButton()
    await sf_homefix.clickViewAllButton()
    await sf_homefix.enterLeadsSearchBox()
    await sf_homefix.clickonLeads()

    //9.SF_LeadPage custom fixture object
    await sf_leadfix.clickLeadsNewButton()
    await sf_leadfix.newLeadForm()
    let cName = await sf_leadfix.newLeadForm()
    await sf_leadfix.clickonLeadSave()

    //10.SF_VerifyLead custom Fixture object
    await sf_vleadfix.verifyLead(cName)
    
})
