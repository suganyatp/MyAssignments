
// Looping Statements - Used for repeating the block of Code.
// for, while loop, and do-while

//for -> when we have known iterations, we can use the for loop

// console.log(1);
// console.log(2);
// console.log(3);

// initialization; condition; iteration
/* for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
} */

//Ex - 1
/* for (let i = 0; i <= 10; i++) {
    console.log(i);
    
}  */   

// while loop - indefinite loop. When we are not sure about the iterations

/* while (condition) {
    
}
 */

// Ex - 2
/* let i = 5
while (i <= 10) {
    console.log(i);
    i++
    
} */


// do-while : When you want to iterate through the loop or execute the code atleast once

/* do {
    
} while (condition);
 */

//Ex-3

let index=0
do {
    console.log("this is a do while statement");
    index++
} while(index<5)