import { Router } from "express";
import productRouter from './products.router.js';
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.use("/products", productRouter);

router.get("/:cid", 
    async function(req, res){
        const result = await cartController.getCart(req, res);
    });

router.post("/",async function(req, res){
    const result = await cartController.addCart(req, res);
});

router.post("/:cid/products/:pid", async function(req, res){
    console.log('on cart router')
    const result = await cartController.addProduct(req, res);
    console.log('past cart router')
});

router.put("/:cid", async function(req, res){
    const result = await cartController.updateCart(req, res);
});

router.delete("/:cid", async (req, res)=>{
    const result = await cartController.deleteCart(req, res);
});

router.put("/:cid/products/:pid", async (req, res)=>{
    const result = await cartController.updateProduct(req, res);
});

router.delete("/:cid/products/:pid", async (req, res)=>{
    const result = await cartController.deleteProduct(req, res);
});

router.post("/:cid/purchase", async (req, res) => {
    const result = await cartController.createTicket(req, res);
});

export default router;