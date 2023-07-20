import express from 'express';
import productRouter from './router/products.router.js';
import cartRouter from './router/carts.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.listen(PORT ,() =>{
    console.log('SERVER LISTENING ON PORT 8080');
}); 
