import  {CartService}  from "../services/cart.service.js";
import { TicketService } from "../services/ticket.service.js";
import ticketController from "./ticket.controller.js";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { UserService } from "../services/user.service.js";

const cartService = new CartService();
const ticketService = new TicketService();
const userService = new UserService();

    export const getCart = async(req, res) =>{
        const {cid} = req.params;
        let cart = cartService.getCartPopulate(cid);
        console.log(cart)
        if(cart){
            res.json({data:cart, msg:'success'});
        }else{
            res.json({data:cart, msg:'no cart found'});
        }
    }

    export const renderCart= async(req, res) =>{
        const {cid} = req.params;
        console.log(cid);
        let cart = await cartService.getCartPopulate(cid);
        console.log(cart)
        if(cart){
            res.render("cartDetail",{cart});
        }else{
            res.json({data:cart, msg:'no cart found'});
        }
    }

    export const addCart= async(req, res) =>{
        try{
            const cart = await cartService.addCart();
            res.json({
                message: "cart succesfully added",
                data: cart
            })
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"server failure"
            })
        }
    }

    export const addProduct= async(req, res) =>{
        console.log('oh hi mark')
        const {cid, pid} = req.params;
        const cart = await cartService.addProduct(cid, pid);
        if(cart){    
            res.json({msg:'success', payload:cart});
        }else{
            CustomError.createError(
                {name:"Add Product on Cart Error",
                cause:"cart not found",
                message:"Cart not found.",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
    }

    export const updateProduct = async (req, res) =>{
        try{
            const {cid, pid} = req.params;
            const {quantity} = req.body;
            let result = await cartService.updateQuantity(cid, pid, quantity);
            res.json({status:"success", payload: result});
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"server failure"
            })
        }
    }

    export const updateCart= async(req, res) =>{
        try{
            let cart= req.body;
            let result = await cartService.updateCart(cart);
            res.json({status:"success", payload: result});
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"server failure"
            })
        }
    }

    export const deleteCart = async (req, res) =>{
        try{
            let {cid} = req.params;
            let result = await cartService.deleteCart(cid);
            res.json({status:"success", payload: result});
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"server failure"
            })
        }
    }

    export const deleteProduct = async (req, res) => {
        try{
            const { cid, pid } = req.params;
            const cart = await cartService.getCartPopulate(cid);
            if(!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            const productIndex = cart.products.findIndex((product) =>
                product.pid.equals(pid)
            );
            if(productIndex === -1) {
                CustomError.createError(
                    {name:"Delete Product from Cart Error",
                    cause:"Product not present on cart",
                    message:"Product on cart not found.",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
            cart.products.splice(productIndex, 1);
            let result =await cartService.updateCart(cart);
            return res.json({ message: 'Product removed from cart', payload: result });
        }catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    export const addTicket= async(req, res) =>{
        try{
            let result =await cartService.updateCart(cart);
            if(result){
                let tresult = ticketController.addTicket();
                res.json({
                    message: "ticket succesfully added",
                    data: tresult
                })
            }
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"server failure"
            })
        }
    }

    export default {getCart,
        renderCart,
        addCart,
        addProduct,
        updateProduct,
        updateCart,
        deleteCart,
        deleteProduct,
        addTicket,

    }