import { Router } from "express";
import { CartManager } from "../CartManager.js";
import productRouter from './products.router.js';
import RouterHelper from "../RouterHelper.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import {CartDB} from "../DAO/cartDB.js"

const router = Router();
const cartDB = new CartDB();
router.use("/products", productRouter);

router.get("/:cid", async (req, res)=>{
    const {cid} = req.params;
    //let cart = await cartManager.getCartById(cid);
    let cart = await cartModel.findById(cid);
    console.log(cart)
    if(cart){
        res.json({data:cart, msg:'success'});
    }else{
        res.json({data:cart, msg:'no cart found'});
    }
});

router.post("/",async (req, res)=>{
    try{
        //const response = await cartManager.addCart();
        const products=[];
        const response = await cartModel.create({products});
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
    //let cart = await cartManager.getCartById(cid);
    let cart = await cartModel.findById(cid)
    if(cart){
        //let prd = await RouterHelper.getProductByIdRoute(req,res);
        let prd = await productModel.findById(pid);
        if(prd){
            const response = await cartDB.addProduct(cid, pid);
            res.json({msg:'success', payload:response});
        }else{
            res.json({data:cart, msg:'no product found'});
        }
        
    }else{
        res.json({data:cart, msg:'no cart found'});
    }
});

export default router;