import { CartRepository } from "../DAO/cart.repository.js";
import CartDTO from "../DTO/cart.dto.js";
import { ProductRepository } from "../DAO/product.repository.js";
const cartRepository = new CartRepository();
const productRepository = new ProductRepository();


export class CartService{
    async getCartPopulate(cid){
        try{
            const cart = await cartRepository.getCartPopulate(cid);
            return new CartDTO(cart);
        }
        catch(error){
            console.log(error);
        }
    }
    async addCart(){
        try{
            const cart = await cartRepository.createCart();
            return new CartDTO(cart);
        }catch(error){
            console.log(error);
        }
    }
    async addProduct(cid,pid){
        try{
            let cart = await cartRepository.getCart(cid)
            let prd = await productRepository.getProduct(pid);
            if(prd && cart){
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
                let result = await cartRepository.updateCart({_id:cart._id}, cart);
                return new CartDTO(result);
            }
        }catch(error){
            console.log(error);
        }
    }
    async updateCart(cart){
        try{
            const cartResult = await cartRepository.updateCart({_id:cart._id}, cart);
            return new CartDTO(cartResult);
        }catch(error){
            console.log(error);
        }
    }

    async deleteCart(cid){
        try{
            const result = await cartRepository.deleteCart({_id:cid});
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async updateQuantity(cid,pid, quantity){
        try{
            let message;
            const cart = await cartRepository.getCart(cid);
            if (!cart) {
                return  message= 'Cart not found' ;
            }
            cart.products.forEach((product) => {
                if (product.pid.equals(pid)) {
                    product.quantity = quantity;
                }
            });
            let result = await cartRepository.updateCart(cart.id, cart);
            return new CartDTO(result);
        }catch (error){
            console.error(error);
            return  error ;
        }
    }

    async deleteProductsFromCart(cid) {
        try {
            const cart = await cartRepository.getCart(cid);
            if(!cart){
                CustomError.createError(
                    {name:"Delete product on Cart Error",
                    cause:"!cart",
                    message:"Cart not found.",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
            let result = await cartRepository.deleteCartProducts(cart);
            return result;
        }catch(error){
            throw error;
        }
    }
}