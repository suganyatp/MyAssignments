
/* 
1. Load Red Bus in an Edge browser instance and verify the page title and URL.
2. Load Flipkart in a Webkit browser instance and verify the page title and URL. 
Red Bus: https://www.redbus.in
Flipkart: https://www.flipkart.com
*/

import {test, chromium, webkit} from "@playwright/test"

// RedBus in Edge Browser
test('Launch RedBus in Edge Browser', async () => {
    const edgeB = await chromium.launch() //1. Launch the browser type
        const edgePage = await edgeB.newPage()  //2. Load the Page
        await edgePage.goto("https://www.redbus.in")  //method to load the url
        console.log("Red Bus Title :", await edgePage.title());
        console.log("Red Bus URL :", edgePage.url());
});

// Flipkart in Webkit browser
test('Launch Flipkart in Webkit Browser', async () => {
    const webkitB = await webkit.launch() //1. Launch the Browser Type
        const webkitPage = await webkitB.newPage()  //2. Load the Page
        await webkitPage.goto("https://www.flipkart.com")  //Goto the URL
        console.log("Flipkart Bus Title :", await webkitPage.title()); //Using title(), print the title
        console.log("Flipkart Bus URL :", webkitPage.url()); // Using the url(), print the URL
});
