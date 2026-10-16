//Part 2: Abstract Class (Common Framework Functionality)
//Task 2
export abstract class BasePage {

    waitForPageLoad() {
        console.log("Waiting for page to load");
    }

    getPageTitle() {
        console.log("Getting page title");
    }

}