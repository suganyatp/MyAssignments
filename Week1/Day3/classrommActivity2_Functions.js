
// Classromm Activity 2 - 02/09/2026
// var vs let vs const 

//Global Variable
const browserVersion="Chrome"

//Function Block
function getBrowserVersion() {
    if (browserVersion=="Chrome") {
        // var browserVersion="Chrome" //Undefined 
        let browserVersion="Edge" // Chrome
    }
    console.log("Browser Version inside function block:",browserVersion);
    
}
console.log("Browser Version outside function block:",browserVersion);

//Calling the Function
getBrowserVersion()
