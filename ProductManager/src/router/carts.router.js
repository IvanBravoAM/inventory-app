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
    let cart = await cartModel.findById(cid).populate('products.pid', 'title description stock code price');
    console.log(cart)
    if(cart){
        res.json({data:cart, msg:'success'});
    }else{
        res.json({data:cart, msg:'no cart found'});
    }
});

router.post("/",async (req, res)=>{
    try{
        const cart = new cartModel({
            products: [],
        });
        const response = await cartModel.create(cart);
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
            const response = await cartDB.addProduct(cart, pid);
            res.json({msg:'success', payload:response});
        }else{
            res.json({data:cart, msg:'no product found'});
        }
        
    }else{
        res.json({data:cart, msg:'no cart found'});
    }
});

router.put("/:cid", async (req, res)=>{
    try{
        let {cid} = req.params;
        let cart= req.body;
        let result = cartDB.updateCart(cid, cart);
        res.json({status:"success", payload: result});
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
});

router.delete("/:cid", async (req, res)=>{
    try{
        let {cid} = req.params;
        let result = cartDB.deleteCart(cid, cart);
        res.json({status:"success", payload: result});
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
});

router.put("/:cid/products/:pid", async (req, res)=>{
    try{
        const {cid, pid} = req.params;
        const {quantity} = req.body;
        let result = cartDB.updateQuantity(cid, pid, quantity);
        res.json({status:"success", payload: result});
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
    
});

router.delete("/:cid/products/:pid", async (req, res)=>{
    try{
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if(!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const productIndex = cart.products.findIndex((product) =>
            product.pid.equals(pid)
        );
        if(productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.json({ message: 'Product removed from cart' });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;