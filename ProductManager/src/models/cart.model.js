import mongoose, { mongo } from 'mongoose';

const cartCollection = 'carts';

const cartProductSchema = new mongoose.Schema ({
    pid:String,
    quantity:Number
});
const cartSchema =  new mongoose.Schema({
    products:[cartProductSchema]
});

export const cartModel = mongoose.model(cartCollection, cartSchema);