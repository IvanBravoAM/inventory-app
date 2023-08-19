import mongoose from 'mongoose';

const userCollection = 'usuarios';

const userSchema =  new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    password: { 
        type: String, 
        required: true,
        max: 100 }
});

export const userModel = mongoose.model(userCollection, userSchema);