
// Strings - Sequence of characters and represented '', "", ``
// Stack Memory (Primitive DTs) and Heap Memory (Non-Primitive DTs)

// 1. String literals -> compares the datatype and value

let companyName = "Testleaf"
let firmValue = "Testleaf"
console.log(companyName===firmValue); //true
console.log(companyName==firmValue); //true

// String Objects -> compares the reference of the string

let companyName1 = new String("Testleaf")  //5000
let firmValue1 = new String("Testleaf")  //6000
console.log(companyName1===firmValue1);  //false
console.log(companyName1==firmValue1);  //false

// Comparing Literals and Objects
console.log(companyName===companyName1); //false
console.log(firmValue==firmValue1); //true

//compare the data present inside the string object
console.log(companyName1.toString()===firmValue1.toString()); //true

// Methods of String
// index, length
// method -> length()
// property -> length
// index starts from 0...n
// length starts from 1..

let course = "playwright"
console.log(course.length); //10

//escape sequence - \t, \n, \
let data = 'it\'s \na \nregression \ttesting'
console.log(data);

// concat method -> concat()
// legacy -> "+"
// Template literal -> `${}` -> mordern way
let v1 = "50"
let v2 = "Testcases"
console.log("There are", v1+ v2);
console.log(v1.concat(v2));
console.log(`There are ${v1} ${v2}`);

//charAt -> retrieve the char at particular index
console.log(v2.charAt(4)); //c

//indexof() -> returns the index of the character
// let v2 = "Testcases"
console.log(v2.indexOf("a")) //5
console.log(v2.indexOf("s")) //2
console.log(v2.indexOf("s",3)) //6 -> second occurence of s
console.log(v2.indexOf("g")) //-1 : Character is not present

//Slice -> Extracts the portion of the string

//let course = "playwright"
console.log(course.slice(0,4)); //play
console.log(course.slice(4)); //wright
console.log(course.slice(-6)); //wright
console.log(course.slice(4,0)); // returns empty as the start index is greater than the end index. does not print anything
console.log(course.slice(-4,-1)); //igh

//Sub-string : extracts the porting of the string
// no negative value, swaps the value
//let course = "playwright"
console.log(course.substring(0,4)); //play
console.log(course.substring(4,0)); // JS will swap as (0,4) as startIndex > endIndex. play
console.log(course.substring(-3,5)); //Negative Index is NOT allowed. So, (-3,5) is converted to (0,5)=> playw
console.log(course.substring());

//Split -> converts strings into an array
let words = "Playwright is interesting"
console.log(words.split()); //[ 'Playwright is interesting' ]
console.log(words.split("")); 
/* [
  'P', 'l', 'a', 'y', 'w', 'r',
  'i', 'g', 'h', 't', ' ', 'i',
  's', ' ', 'i', 'n', 't', 'e',
  'r', 'e', 's', 't', 'i', 'n',
  'g'
] */
console.log(words.split(" ")); // [ 'Playwright', 'is', 'interesting' ]
console.log(words.split("a")); //[ 'Pl', 'ywright is interesting' ]
console.log(words.split("b"));