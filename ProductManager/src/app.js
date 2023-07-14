import express from 'express';
import {ProductManager} from "./ProductManager.js";
import productRouter from './router/products.router.js';
import cartRouter from './router/carts.router.js';

const productManager =  new ProductManager('./products.json');
const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.listen(PORT ,() =>{
    console.log('SERVER LISTENING ON PORT 8080');
}); 