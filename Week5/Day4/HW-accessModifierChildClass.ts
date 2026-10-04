
import { BankAccount } from "./HW-accessModifier"

class ChildAccount extends BankAccount {

    getAccHolderName() {

        return this.accountHolder
    }

}

let childAcc = new ChildAccount()
console.log("Account Holder Name : ", childAcc.getAccHolderName());
