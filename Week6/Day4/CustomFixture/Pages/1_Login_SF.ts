import { PWWrapper } from "../../../helper/playwrightWrapper" 
export class SF_LoginPage extends PWWrapper {
    
    //1. Load SalesForce URL
    async sf_loadUrl(url:string) {
        await this.loadApplication(url)
    }
}
