
//1. Named Function

function greet() {
    
    console.log("Learn Functions");
    //return "learn functions"

}

//console.log(greet());

//2. function expressions or anonymous function

let welcome=function() {
    console.log("It is a function expression")

}
welcome()

//3. Arrow function

//console.log(add=((a,b)=>(a+b)));
let add = (a,b) => a+b
console.log(add(4,5));

//4. callback function -> when wee pass 1 func as an arg to another func, we call it as callback func

function login(cb1,cb2) {
    console.log("login was successful");
    cb1()
    cb2()
    
}
function enterUsername() {
    console.log("Entered username ");
    
}
function enterPassword() {
    console.log("Entered password ");
    
}
login(enterUsername,enterPassword)