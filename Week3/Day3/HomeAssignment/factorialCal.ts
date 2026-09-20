// Factorial Calculation in TypeScript

function factorial(n: number): number {
    if (n < 0) {
        console.log("The number should be a non-negative number");
    }

    let result: number = 1
    for (let i: number = 2; i <= n; i++) {
        result = result * i
    }
    return result
}

console.log(factorial(6)); //720
console.log(factorial(10)); //3628800
