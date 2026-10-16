//Part 4: Product Page
import { PageRules } from "./interfacePageRules";
import { BasePage } from "./abstractClass";

class ProductPage extends BasePage implements PageRules {

    verifyPage(): void {
        console.log("Product Page Verified");
    }

    searchProduct() {
        console.log("The Product is searched");
    }

    addToCart() {
        console.log("Product added to the cart")
    }

}