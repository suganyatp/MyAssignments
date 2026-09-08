// Array is collection of elements of similar datatype or heterogeneous data type - that can store values of different data types
// Array is a non-primitive datatype

/* let name  = "Suganyaa"
let age = 34
let isArray = true */

// Using the above values in array
// index      0         1   2
let arr = ["Suganyaa", 34, true]

//length - number of elements present in the array
console.log(arr.length); //3 (length = index+1)

//Print the complete array elements
console.log(arr); //[ 'Suganyaa', 34, true ]

//Print specific element using index
console.log(arr[0]); //Suganyaa

//Print the undefined index
console.log(arr[3]); //undefined

//add elements to the array - always adds at the last
arr[3] = "Welcome"
console.log(arr); //[ 'Suganyaa', 34, true, 'Welcome' ]

//Change/alter the element in the array
arr[1] = 56
console.log(arr); //[ 'Suganyaa', 56, true, 'Welcome' ]

//push() -> used to add one or more elements at the end of the array
console.log(arr.push(undefined,"playwright")); //6 (returns new length)
console.log(arr); //[ 'Suganyaa', 56, true, 'Welcome', undefined, 'playwright' ]

//pop() -> used to remove ONLY 1 element at the end of the array
let poppedarray = arr.pop()
console.log(poppedarray); //playwright
console.log(arr); //[ 'Suganyaa', 56, true, 'Welcome', undefined ]

//unshift() -> add one or more elements to the beginning of the array
let unshiftedarray = arr.unshift("mango",100)
console.log(unshiftedarray); //7 - new index
console.log(arr); //[ 'mango', 100, 'Suganyaa', 56, true, 'Welcome', undefined ]

//shift() -> removes 1 element at the beginning of the array
let shiftedarray = arr.shift()
console.log(shiftedarray); //mango
console.log(arr); //[ 100, 'Suganyaa', 56, true, 'Welcome', undefined ]

//slice() -> extracts the portion of the array, but it will not modify / alter the existing array
/* let slicedArray = arr.slice()
                                0       1        2    3      4           5
console.log(slicedArray); // [ 100, 'Suganyaa', 56, true, 'Welcome', undefined ] */

let slicedArray = arr.slice(1,4)
console.log(slicedArray); //[ 'Suganyaa', 56, true ]
console.log(arr); //[ 100, 'Suganyaa', 56, true, 'Welcome', undefined ]

//splice() -> add element, delete element from the array
//splice method modifies the original array
//first index = start index
//second index = delete count
let splicedArray = arr.splice(2,3) // deleting the portion of an array
console.log(splicedArray); // [ 56, true, 'Welcome' ]
console.log(arr); //[ 100, 'Suganyaa', undefined ]

let splicedArray1 = arr.splice(1,0,"Sai", "Sanjeev") //add element to the array 
console.log(splicedArray1); // []
console.log(arr); //[ 100, 'Sai', 'Sanjeev', 'Suganyaa', undefined ]

//sort - arranging
let num = [6,8,2,4,1]
console.log(num.sort()); //[ 1, 2, 4, 6, 8 ]

let mixedArray = [1, "selenium", "apple", 500, 200]
console.log(mixedArray.sort()); //[ 1, 200, 500, 'apple', 'selenium' ]

//sorting using ASCII value
let num1 = [5000,21,100,4]
console.log(num1.sort()); //[ 100, 21, 4, 5000 ]

// using arrow function , bubble sorting mechanism

// ascending order
console.log(num1.sort((a, b) => a - b)); //[ 4, 21, 100, 5000 ]

//descending order
console.log(num1.sort((a, b) => b - a)); // [ 5000, 100, 21, 4 ]

let madhu = [100, 110, 250, 268]
console.log(madhu.sort()); //[ 100, 110, 250, 268 ]

//includes() -> checks for the element exists in the array, and returns boolean type
console.log(madhu.includes(268)); //true

//reverse() -> reverse the array
console.log(madhu.reverse()); //[ 268, 250, 110, 100 ]

//join() -> convert array into string
console.log(madhu.join()); //removes the array brackets, and prints the numbers - 268,250,110,100
console.log(madhu.join("-")); //268-250-110-100

//map -> transform every element into a new array
console.log(madhu.map((num) => num = num * 2)); //[ 536, 500, 220, 200 ]

//filter -> to filter out specific element based on the condition
let arr1 = [1,2,3,3,4,5,1]
console.log(arr1.filter((num) => num = num > 1)); // [2,3,3,4,5]

// indexOf() -> find the index
console.log(arr1.indexOf(3)); //2

//lastIndexOf() -> find the last occurrence
console.log(arr1.lastIndexOf(3)); //3

//concat() -> merge arrays
let a = [3,4]
let b = [1,5]
console.log(a.concat(b)); // [3,4,1,5]

//toString() -> array to string
console.log(a.toString()); //3,4

//Array.isArray() -> Check array
console.log(Array.isArray(a)); //true