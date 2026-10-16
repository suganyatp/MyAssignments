//Part 3: Login Page
import { PageRules } from "./interfacePageRules";
import { BasePage } from "./abstractClass";

class LoginPage extends BasePage implements PageRules {

    verifyPage(): void {
        console.log("Login Page Verified");
    }

    enterUsername() {
        console.log("Username entered");
    }

    enterPassword() {
        console.log("Password entered");
    }

    clickLogin() {
        console.log("Login Button clicked");
    }

}

//Part 5 - Execute
//Creating object to call the methods
let loginP = new LoginPage()
loginP.waitForPageLoad()
loginP.verifyPage()
loginP.enterUsername()
loginP.enterPassword()
loginP.clickLogin()
loginP.getPageTitle()