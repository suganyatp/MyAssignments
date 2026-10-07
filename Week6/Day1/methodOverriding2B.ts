/* 
Assignment Details: method overriding
Create a superclass with common methods for interacting with web elements. Implement a method
from the superclass to provide a specific implementation in the subclass that overrides the superclass
method.
Requirements:
- Create a class named BasePage
- Create methods like findElement(), clickElement(), enterText() and
performCommonTasks().
- Create a subclass named LoginPage.
- Override the performCommonTasks() method in the LoginPage class.
- Demonstrate the concept by creating objects for both classes and calling their methods.
*/
class BasePage {
    findElement() {
        console.log("The element is found");
    }
    clickElement() {
        console.log("The element has been clicked");
    }
    enterText() {
        console.log("The text has been entered");
    }
    performCommonTasks() {
        console.log("Base Page : Performing common tasks");
    }
}

class Loginpage extends BasePage {
    performCommonTasks() {
        console.log("Login Page : Performing common tasks");
        super.performCommonTasks()
    }
}

const bp = new BasePage()
bp.clickElement()
bp.enterText()
bp.findElement()

const lp = new Loginpage()
lp.performCommonTasks()