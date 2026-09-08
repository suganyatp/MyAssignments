// Task1: Function Declaration

function userProfile(name) {
    let name = "Suganyaa"
    console.log("Hello,", name, "!"); //Hello, Suganyaa !
}
userProfile("Suganyaa")

// Task2: Arrow Function

let double = (a) => (a * a)
console.log(double(6)); //36

// Task3: Anonymous Function

// setTimeout(function, delay)
setTimeout(function () { console.log("This message is delayed by 2 seconds"); }, 2000)

// Task4: Callback function

function getUserData(callback) {
    setTimeout(function () { callback(); }, 3000);
}
getUserData(function () {
    console.log("Call Back Function");
});
