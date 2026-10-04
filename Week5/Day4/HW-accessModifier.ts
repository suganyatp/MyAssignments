/* Access Modifiers in TypeScript-
Task
Create a BankAccount class and explore how public, private, and protected access modifiers
work.
1. Create properties for accountNumber, accountHolder, and balance using different access
modifiers.
2. Create methods to deposit and withdraw money.
3. Create an object of the class and try to access each property directly from outside the class.
4. Create a child class and try to access the properties from the child class.
5. Observe which properties are accessible and which are restricted.
6. Based on your observation, explain when you would use public, private, and protected in a
real-time TypeScript application.
*/

export class BankAccount {

    //Class Properties
    public accountNumber:number = 100098654321
    protected accountHolder:string = "Ramesh Kumar"
    private balance:number = 1234780

    //Class Methods
    getAccountDetails() {

        console.log(`The Account Number : ${this.accountNumber}`);
        console.log(`The Account Holer Name : ${this.accountHolder}`);
        console.log(`The Outstanding Balance : ${this.balance}`);

    }
    deposit(amount:number): void {

        if (amount <= 0) {
            console.log("The amount shoild be positive");
            return
        }
        console.log("The amount deposited is : ", amount);
        this.balance += amount
        console.log(`${amount} Deposited. Balance after deposit is ${this.balance}`);

    }

    withdraw(amount:number): void {

        if (amount >= this.balance) {
            console.log("Insufficient Balance");
            return
        }
        this.balance -= amount
        console.log(`${amount} Withdrawn. Balance after withdraw is ${this.balance}`);
    
    }

    currentBalance(): number {

        return this.balance

    }

}

//Object declaration
let bankAcc = new BankAccount()
console.log("************************************");
bankAcc.getAccountDetails()
console.log("Balance before Account deposit / withdraw : ", bankAcc.currentBalance());
bankAcc.deposit(10000)
bankAcc.withdraw(20000)
console.log("Available Balance : ", bankAcc.currentBalance());
console.log("************************************");
