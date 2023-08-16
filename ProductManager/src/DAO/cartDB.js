import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";


export class CartDB{
    async addProduct(cart,pid){
        try{
            if(cart){
                let product = null;
                cart.products.forEach((prd) => {
                    if (prd.pid.equals(pid)) {
                        product = prd;
                    }});
                    console.log(product)    
                if(!product) {
                    const prds = {pid: pid, quantity:1}
                    cart.products.push(prds)
                    
                }else{
                    let productIndex = cart.products.findIndex((prd) => prd.pid.equals(pid));
                    cart.products[productIndex].quantity++;
                    
                }
                let result = await cartModel.updateOne({_id:cart._id}, cart);
            }
        }catch(error){
            console.log(error);
        }
    }

    async updateCart(cid, cart){
        let result = await cartModel.updateOne({_id:cid}, cart);
        return result;
    }

    async deleteCart(cid){
        let result = await cartModel.deleteOne({_id:cid});
        return result;
    }

    async updateQuantity(cid,pid, quantity){
        try{
            let message;
            const cart = await cartModel.findById(cid);
            if (!cart) {
                return  message= 'Cart not found' ;
            }
            cart.products.forEach((product) => {
                if (product.pid.equals(pid)) {
                    product.quantity = quantity;
                }
            });
            await cart.save();
            return  message= 'Product quantity updated successfully' ;
            }catch (error){
            console.error(error);
            return  message= 'Internal server error' ;
        }
    }
}