import mongoose from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema =  new mongoose.Schema({
    title:String,
    description:String,
    purchase_datetime: { type: Date, default: Date.now },
    purchaser:String,
    amount:Number,
    code:{
        type:String,
        unique:true
    }
});
export const ticketModel = mongoose.model(ticketCollection, ticketSchema);