import { test, expect } from "@playwright/test"

//Global Variables

let sales_access_token: any

let sales_token_type: any

let sales_instance_url: any

let AccountId: any

//TestCases in serial mode
test.describe.serial('Salesforce Account CRUD using Playwright API - Serial mode', async () => {

    test('1_Sales Force Access-Token generation', async ({ request }) => {

        //serialization-> converting object to JSON
        let responseBody = await request.post('https://orgfarm-02ae27e8c2-dev-ed.develop.my.salesforce.com/services/oauth2/token', {
            headers: {

                "Content-Type": "application/x-www-form-urlencoded"

            },
            form: {

                "grant_type": "client_credentials",
                "client_secret": "8A6EFE0C51026C140BF3FF60D595ADA62DEC0B8D7BB3C433637AFF5C5ACEAD62",
                "client_id": "3MVG94bpcMC_ekBjOUrNel8X5M784.8NaIlwM1MV8_o1_HyIN9b6Y3OjYgIAIUQTdgK.j_zIpPjB_ClLK75Vg",

            }
        })

        //Deserialization-> converting json to object format

        let tokenResponse = await responseBody.json()
        console.log(tokenResponse);

        expect(responseBody.status()).toBe(200)
        console.log(responseBody.status());

        expect(responseBody.statusText()).toBe("OK")
        console.log(responseBody.statusText())

        //1.Store the access_token
        sales_access_token = tokenResponse.access_token
        console.log(sales_access_token);

        //2.Store the Token Type
        sales_token_type = tokenResponse.token_type
        console.log(sales_token_type);

        //3.Store the Instance URL
        sales_instance_url = tokenResponse.instance_url
        console.log(sales_instance_url);

    })

    test('2_Create Account in Sales Force', async ({ request }) => {

        //serialization-> converting object to JSON
        let responseBody = await request.post(`${sales_instance_url}/services/data/v65.0/sobjects/Account`, {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `${sales_token_type} ${sales_access_token}`

            },
            data: {

                "Name": "Suganyaa Parivallal"

            }
        })

        //De-serialization-> converting JSON to Object
        let accountResponse = await responseBody.json()
        console.log(accountResponse);

        expect(responseBody.status()).toBe(201)
        console.log(responseBody.status());

        expect(responseBody.statusText()).toBe("Created")
        console.log(responseBody.statusText())

        //1.Store the account id 
        AccountId = accountResponse.id
        console.log(AccountId);

    })

    test('3_Get Account in Sales Force', async ({ request }) => {

        //Serialization - Obeject to JSON
        let responseBody = await request.get(`${sales_instance_url}/services/data/v64.0/sobjects/Account/${AccountId}`, {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `${sales_token_type} ${sales_access_token}`

            }

        })

        //De-Serialization - JSON to Object
        let getAccResponse = await responseBody.json()
        console.log(getAccResponse);

        expect(responseBody.status()).toBe(200)
        console.log(responseBody.status())

        expect(responseBody.statusText()).toBe('OK')
        console.log(responseBody.statusText())

    })

    test('4_Update Account record in Sales Force', async ({ request }) => {

        //Serialization - Object to JSON
        let responseBody = await request.patch(`${sales_instance_url}/services/data/v64.0/sobjects/Account/${AccountId}`, {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `${sales_token_type} ${sales_access_token}`

            },
            data: {

                "Ownership": "Public",
                "Rating": "Warm"

            }

        })

        expect(responseBody.status()).toBe(204)
        console.log(responseBody.status());

        expect(responseBody.statusText()).toBe('No Content')
        console.log(responseBody.statusText());

    })

    test('5_Delete Account from Sales Force', async ({ request }) => {

        //Serialization - Object to JSON
        let responseBody = await request.delete(`${sales_instance_url}/services/data/v64.0/sobjects/Account/${AccountId}`, {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `${sales_token_type} ${sales_access_token}`

            }

        })

        expect(responseBody.status()).toBe(204)
        console.log(responseBody.status());

        expect(responseBody.statusText()).toBe('No Content')
        console.log(responseBody.statusText());

    })

})
