import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";


export class CartRepository{

    async getCart(cid){
        return cartModel.findById(cid);
    }
    async createCart(){
        const cart = new cartModel({
            products: [],
        });
        const response = await cartModel.create(cart);
    }
    async updateCart(cid, cart){
        let result = await cartModel.updateOne({_id:cid}, cart);
        return result;
    }

    async deleteCart(cid){
        let result = await cartModel.deleteOne({_id:cid});
        return result;
    }

    async getCartPopulate(cid){
        return await cartModel.findById(cid).populate('products.pid', 'title description stock code price');
    }

    async deleteCartProducts(cid, productIdsToDelete){
        return await cartModel.findByIdAndUpdate(
            cid,
            { $pull: { products: { _id: { $in: productIdsToDelete } } } },
            { new: true }
        );
    }
    
}