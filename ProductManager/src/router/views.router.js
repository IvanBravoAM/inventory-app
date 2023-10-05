import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import { productModel } from "../models/product.model.js";
import { cartModel } from "../models/cart.model.js";
import {utilInstance} from "../utils.js"
import CartController from "../controllers/cart.controller.js";

const router = Router();
const productManager = new ProductManager("src/products.json");

router.get("/",async (req, res)=>{
    const products = await productManager.getProducts();
    const userData = {
        username: req.session.user};
    res.render("home",{products, userData});
});

router.get("/products", utilInstance.sessionValidation, async (req, res)=>{
    let products =  await productModel.find().lean();
    console.log(products);
    res.render("products",{products});
});

router.get("/products/:pcode",async (req, res)=>{
    const {pcode} = req.params;
    let product =  await productModel.findOne({code:pcode}).lean();
    console.log(product);
    res.render("productDetail",{product});
});

router.get("/carts/:cid", function(req, res){
    console.log('estoy en el router')
    CartController.renderCart
    console.log('pase el controller?')
});




export default router;