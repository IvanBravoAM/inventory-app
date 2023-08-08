import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema =  new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    thumbnails:String,
    stock:Number,
    status:Boolean,
    category:String,
    code:{
        type:String,
        unique:true
    }
});

export const productModel = mongoose.model(productCollection, productSchema);