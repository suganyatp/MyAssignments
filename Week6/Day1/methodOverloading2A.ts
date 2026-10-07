import { log } from "node:console"

/* 
Assignment Details:
Create a class named APIClient and create two methods with the same name passing different input
arguments.
Requirements:
- Inside the APIClient class, define the sendRequest method with multiple overloaded
versions.
- One version should accept one input argument: a string for the endpoint.
- Another version of the sendRequest method should accept three input arguments: a string for
the endpoint, a string for the requestBody, and a boolean parameter requestStatus to verify
whether the request is successful.
- Create a method to demonstrate the usage of the overloaded sendRequest method.
- Create an object of the APIClient class.
- Call both versions of the sendRequest method on the APIClient object with different sets of
input arguments to showcase method overloading.
*/
class APIClient {

    //method signature
    sendRequest(endpoint:string):void
    sendRequest(endpoint:string,requestBody:string,requestStatus:boolean):void
    //implememtation
    sendRequest(endpoint:string,requestBody?:string,requestStatus?:boolean) {
        if(requestBody) {
            console.log(`The request body is given : ${requestBody}`);
        } else if (requestStatus) {
            console.log(`The request status is given : ${requestStatus}`);
        } else {
            console.log(`The endpoint is given : ${endpoint}`);
        }
    }

}

const api = new APIClient()
api.sendRequest("api/V1/charges",'{"name":"Suganyaa","role":"QA"}',true)
api.sendRequest("api/V1/charges")