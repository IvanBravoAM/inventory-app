import mongoose, { mongo } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    products: [
      {
        pid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products', 
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  });

export const cartModel = mongoose.model(cartCollection, cartSchema);