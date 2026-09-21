/* 
Classroom activity - 

1.Create a TypeScript program to handle different payment methods using a Union Type.
- Create a function that accepts only specific payment methods.
- Create a type alias called PaymentMethod that allows only "UPI", "CreditCard", or "PayPal".
- Write a function makePayment that takes a parameter of type PaymentMethod and prints which payment
method is chosen.
- Call the function with "UPI" and "CreditCard" as arguments.
*/

//Declaring a type called PaymentMethod with its types
type PaymentMethod = "UPI" | "CreditCard" | "PayPal"

function makePayment(paymentType : PaymentMethod) {

    if (paymentType === "UPI") {
        console.log("The chosen Payment Method is: ", paymentType);
    }
    else if (paymentType === "CreditCard") {
        console.log("The chosen Payment Method is: ", paymentType);
    }
    else {
        console.log("The chosen Payment Method is not available");
    }
}

makePayment("UPI")
makePayment("CreditCard")
makePayment("PayPal")
