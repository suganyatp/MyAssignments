//Fibonacci Series

function fibonacci(n: number): number {
    if (n < 0) {
        console.log("The number should be non-negative interger");        
    }
    //Initialize two variables to store the first two Fibonacci numbers
    let a: number = 0
    let b: number = 1
    for (let i: number = 0; i < n; i++) {
        let c: number = a + b
        a = b // b value assigned to a
        b = c // c value assigned to b
    }
    return a
}

console.log(fibonacci(0));  // 0
console.log(fibonacci(1));  // 1
console.log(fibonacci(5));  // 5
console.log(fibonacci(10)); // 55
console.log(fibonacci(20)); //6765
console.log(fibonacci(-2)); // The number should be non-negative interger
