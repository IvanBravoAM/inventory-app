import { productModel } from "../models/product.model.js";
import CustomError from "../services/CustomError.js";
import { CartService } from "../services/cart.service.js";
import EErrors from "../services/enum.js";
import { ProductService } from "../services/product.service.js";
import  {TicketService}  from "../services/ticket.service.js";
import { UserService } from "../services/user.service.js";
import crypto from "crypto";
import mongoose from "mongoose";


const cartService = new CartService();
const userService = new UserService();
const ticketService = new TicketService();
const productService = new ProductService();

    export const getTickets = async(req, res) =>{
        const email = req.session.user;
        let tickets = await ticketService.getTicketByEmail(email);
        console.log(tickets)
        if(tickets){
            res.render("tickets", {tickets});
        }else{
            res.json({data:tickets, msg:'no ticket found'});
        }
    }

    export const getTicket = async(req, res) =>{
        const {code} = req.params;
        let ticket = await ticketService.getTicketByCode(code);
        console.log(ticket)
        if(ticket){
            return ticket;
        }else{
            res.json({data:ticket, msg:'no ticket found'});
        }
    }

    export const addTicket = async (req, res) => {
        let {
            cid
            } = req.body;

        const purchaser = req.session.user;
        console.log('purchaser', purchaser);

        let user = await userService.getUserByEmail(purchaser);
        let cart = await cartService.getCartPopulate(user.cart);
        let productIds = await checkCartProductStock(cart);
        //if(outOfStock){return res.send({status:'error', data:outOfStock})} 
        
            
        let amount = await calculateCartTotal(cart);

        let ticket = {
            purchase_datetime: Date.now(),
            purchaser,
            products :productIds,
            amount,
            code:crypto.randomBytes(4).toString('hex')
        }
        let result = await ticketService.addTicket(ticket);

        
        let cartresult = await cartService.deleteProductsFromCart(cart.id);
        //res.redirect("/view/checkout/"+ticket.code);
        res.status(200).json({
            respuesta: "ok",
            data:ticket
            });
        console.log('and here?');

    }

    async function checkCartProductStock(cart){
        try{
            if(!cart){
                CustomError.createError(
                    {name:"Check Product stock on Cart Error",
                    cause:"!user || !user.cart",
                    message:"User or cart not found.",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
            const products = cart.products;
            console.log('prod?>' , products)
            const StockProducts = [];

            for(const product of products){
                const productInDB = await productService.getProduct(product.pid._id);
                if (!productInDB || productInDB.stock < product.quantity) {
                    CustomError.createError(
                        {name:"Check Product quantity on Cart Error",
                        cause:`!productInDB - pid: ${product._id}`,
                        message:"Product not found.",
                        code: EErrors.INVALID_TYPES_ERROR
                    });
                }
                if (productInDB.stock >= product.quantity) {
                    console.log(productInDB.id);
                    StockProducts.push(productInDB.id.toString());
                }
            }
            return StockProducts;
        }catch(error){
            throw error;
        }
    }

    async function calculateCartTotal(cart) {
        let totalAmount = 0;
        console.log('hello?')
        for (const productItem of cart.products) {
          try {
            const product = await productModel.findById(productItem.pid._id);
            if (product) {
              totalAmount += product.price * productItem.quantity;
            }
          } catch (error) {
            console.error(`Error fetching product with ID ${productItem.pid}:`, error);
          }
        }
      
        return totalAmount;
      }

export default {
    getTicket,
    addTicket,
    getTickets
}