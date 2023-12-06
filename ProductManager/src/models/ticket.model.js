import mongoose from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema =  new mongoose.Schema({
    purchase_datetime: { type: Date, default: Date.now },
    purchaser:String,
    amount:Number,
    code:{
        type:String,
        unique:true
    },
    products: [{
        type: String,
        index: false, 
    }],
});
export const ticketModel = mongoose.model(ticketCollection, ticketSchema);