/* 
Assignment Details:
Step 1: Implement the `WebComponent` Base Class
Define a class `WebComponent` with:
- A constructor that initializes a `selector` property.
- A `click()` method that prints a console message simulating a click.
- A `focus()` method that prints a console message simulating focusing on the component.
Step 2: Implement the `Button` Derived Class
Define a class `Button` that extends `WebComponent`.
- Override the `click()` method to include an additional message specific to buttons.
Step 3: Implement the `TextInput` Derived Class
Define a class `TextInput` that extends `WebComponent` with:
- A property `value` initialized to an empty string.
- An `enterText(text: string)` method that sets `value` and prints a message simulating text entry.
Step 4: Testing the Components
Define a function testComponents to demonstrate the usage of the classes
- Instantiate the `Button` and `TextInput` classes with example selectors.
- Use the instances to simulate clicking the button and entering text into the text input.
*/

//BASE CLASS - WebComponent
class WebComponent {
    selector: string
    constructor(selector: string) {
        this.selector = selector
        console.log("This is a constructor initialization")
    }
    click(): void {
        console.log("This is a click action from WebComponent Class");
    }
    focus() {
        console.log("Focusing on the component");
    }
}

//DERIVED CLASS-Button
class Button extends WebComponent {
    click(): void {
        console.log("This is a click action from Button class");
        super.click()
    }
}

//DERIVED CLASS-TextInput
class TextInput extends WebComponent {
    value: string = ""
    enterText(text: string) {
        this.value = text
        console.log(`Text entered is ${this.value}`);
    }
}

//Function declaration
function testComponents() {
    const btn = new Button("#button")
    btn.click()
    const txt = new TextInput("#input")
    txt.enterText("Suganyaa")
}
testComponents()