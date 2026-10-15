// String Manipulations -> To reverse a String and check Palindrome

function palindromeCheck(str) {
    
    console.log(`Given String is : ${str}`);
    //clean the given str
    let cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "")

    console.log(`After joining the given string :  ${cleanStr}`);
    
    // reverse the string
    let reverseStr = cleanStr.split("").reverse().join("")
    console.log(`Reversed String is : ${reverseStr}`);

    // Check for Palindrome
    if (cleanStr === reverseStr) {
        console.log(`${str} is a Palindrome`);
        return true;
    }
        else {
        console.log(`${str} is NOT a Palindrome`);
        return false;
    }
}
palindromeCheck("madam")
palindromeCheck("world")
palindromeCheck("racecar")
palindromeCheck("A man a plan a canal Panama")
