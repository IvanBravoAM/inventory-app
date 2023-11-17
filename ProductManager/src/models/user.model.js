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
        max: 100
    },
    age:Number,
    cart:mongoose.Schema.Types.ObjectId,
    role:{
        type:String,
        default: 'user'
    },
    resetPasswordToken: String, // Campo para almacenar el token de restablecimiento
    resetPasswordExpires: Date,
    documents: [
        {
            name: String,
            reference: String,
        },
    ],
    last_connection: Date,

});

export const userModel = mongoose.model(userCollection, userSchema);