import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";


export class CartDB{
    async addProduct(cid,pid){
        try{
            let cart = await cartModel.findById(cid);
            let product = null;
            cart.products.forEach((prd) => {
                if (prd.productId === pid) {
                    product = prd;
                }});
                console.log(product)    
            if(!product) {
                const prds = {productId: pid, quantity:1}
                cart.products.push(prds)
                
            }else{
                let productIndex = cart.products.findIndex((prd) => prd.productId === pid);
                cart.products[productIndex].quantity++;
                
            }
            let result = await cartModel.updateOne({_id:cid}, cart);
        }catch(error){
            console.log(error);
        }
    }
}