// Classroom Activity on Arrays

let num = [56, 78, 90, 23, 90, 76, 43, 56];

for (let i = 0; i < num.length; i++) {          // iteration 1: pick num[i]
    for (let j = i + 1; j < num.length; j++) {  // iteration 2: compare with num[j]
        if (num[i] === num[j]) {                // check if both are same
            console.log("Duplicates:", num[i]); // print if duplicate
        }
    }
}

/* Example:

Outer loop picks num[0] = 56.

Inner loop compares it with 78, 90, 23, 90, 76, 43, 56.

Finds another 56 → prints duplicate.

Then outer loop moves to 78, inner loop compares with the rest, and so on. */