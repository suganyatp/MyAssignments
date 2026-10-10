//Login Class for Sales Force Page

import { Page } from "@playwright/test"
export class SF_LoginPage {
    page:Page
    constructor (tpage:Page) {
        this.page = tpage
    }
    //1. Load SalesForce URL
    async sf_loadUrl(url:string) {
        await this.page.goto(url)
    }
}
