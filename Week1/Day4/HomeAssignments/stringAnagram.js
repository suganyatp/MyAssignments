
// String Assignments

// 1.
let s1 = "Hello World"
let splitWords = s1.split(" "); // split() is used
console.log(splitWords); // [ 'Hello', 'World' ]
let lastWord = splitWords[splitWords.length - 1] // Found the last word in the Array
console.log(lastWord.length); // Length of the last word is found : 5

// 2.
let s2 = " fly me to the moon "
s2 = s2.trim() // trim() is used : removes the spaces in the string
let removedSpaces = s2.split(" ") // split() is used to put the strings into an array
console.log(removedSpaces);
let lastWord1 = removedSpaces[removedSpaces.length - 1] // Identified the last word
console.log(lastWord1.length); //4

// 3. To check if two strings are anagram
function isAnagram(str1, str2) {
    // Removes spaces and converts to lower case
    str1 = str1.trim().toLowerCase()
    str2 = str2.trim().toLowerCase()
    console.log(`${str1} ${str2}`)

    // Sort the characters
    let sortStr1 = str1.split("").sort().join("")
    let sortStr2 = str2.split("").sort().join("")

    // Compare the sorted strings, and returns boolean
    return sortStr1 === sortStr2
}
console.log(isAnagram('listen', 'silent')); //true
console.log(isAnagram('hello', 'world')); //false
