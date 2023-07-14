import { Router } from "express";
import { CartManager } from "../CartManager.js";
import productRouter from './products.router.js';
import RouterHelper from "../RouterHelper.js";

const router = Router();
const cartManager = new CartManager("carts.json");
router.use("/products", productRouter);

router.get("/:cid", async (req, res)=>{
    const {cid} = req.params;
    let cart = await cartManager.getCartById(cid);
    console.log(cart)
    if(cart){
        res.json({data:cart, msg:'success'});
    }else{
        res.json({data:cart, msg:'no cart found'});
    }
});

router.post("/",async (req, res)=>{
    try{
        const response = await cartManager.addCart();
        res.json({
            message: "cart succesfully added",
            data: response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
});

router.post("/:cid/products/:pid", async (req, res)=>{
    const {cid, pid} = req.params;
    let cart = await cartManager.getCartById(cid);
    console.log(cart)
    if(cart){
        if(RouterHelper.getProductByIdRoute(req,res)){
            cartManager.addProduct(cid, pid)
        }
        //res.json({data:cart, msg:'success'});
    }else{
        res.json({data:cart, msg:'no cart found'});
    }
});

export default router;