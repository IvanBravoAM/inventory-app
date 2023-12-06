import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import { productModel } from "../models/product.model.js";
import { cartModel } from "../models/cart.model.js";
import {utilInstance} from "../utils.js"
import cartController from "../controllers/cart.controller.js";
import { userModel } from "../models/user.model.js";
import ticketController from "../controllers/ticket.controller.js";

const router = Router();
const productManager = new ProductManager("src/products.json");

router.get("/",async (req, res)=>{
    const products = await productManager.getProducts();
    const userData = {
        username: req.session.user};
    res.render("home",{products: products, user: userData});
});

router.get("/products", utilInstance.sessionValidation, async (req, res)=>{
    let products =  await productModel.find().lean();
    const username= req.session.user;
    const user = await userModel.findOne({ email:username }).lean();
    console.log('no me la kevin constner',user);
    res.render("products",{products: products, user: user});
});

router.get("/addproduct", utilInstance.sessionValidation, async (req, res)=>{
    res.render("addproduct");
});

router.get("/checkout/:code", utilInstance.sessionValidation, async (req, res)=>{
    const ticket = await ticketController.getTicket(req, res);
    res.render("checkout", {ticket});
});



router.get("/products/:pcode",async (req, res)=>{
    const {pcode} = req.params;
    let product =  await productModel.findOne({code:pcode}).lean();
    console.log(product);
    res.render("productDetail",{product});
});

router.get("/carts/:cid", function(req, res){
    console.log('estoy en el router')
    const result = cartController.renderCart(req, res);
    console.log('pase el controller?')
});




export default router;