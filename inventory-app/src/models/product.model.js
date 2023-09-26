import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

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
productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);