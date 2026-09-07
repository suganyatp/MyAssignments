// String Manipulations -> To reverse a String and check Palindrome

function palindromeCheck(str) {
    
    console.log(`Given String is : ${str}`);
    
    // reverse the string
    let reverseStr = str.split("").reverse().join("")
    console.log(`Reversed String is : ${reverseStr}`);

    // Check for Palindrome
    if (str === reverseStr) {
        console.log(`"${str}" is a Palindrome`);
        return true;
    }
        else {
        console.log(`"${str}" is NOT a Palindrome`);
        return false;
    }
}
palindromeCheck("madam")
palindromeCheck("world")
palindromeCheck("racecar")
palindromeCheck("A man a plan a canal Panama")
