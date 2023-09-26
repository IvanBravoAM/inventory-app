import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const realTimeRouter = Router();
const productManager = new ProductManager("src/products.json");

realTimeRouter.get("/",async (req, res)=>{
    const products = await productManager.getProducts();
    res.render("realtimeproducts",{products});
});


export default realTimeRouter;