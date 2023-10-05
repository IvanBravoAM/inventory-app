import CustomError from "../services/CustomError.js";
import { CartService } from "../services/cart.service.js";
import EErrors from "../services/enum.js";
import { ProductService } from "../services/product.service.js";
import  {TicketService}  from "../services/ticket.service.js";
import { UserService } from "../services/user.service.js";


const cartService = new CartService();
const userService = new UserService();
const ticketService = new TicketService();
const productService = new ProductService();

    export const getTicket = async(req, res) =>{
        const {tid} = req.params;
        let ticket = ticketService.getTicket(tid);
        console.log(ticket)
        if(ticket){
            res.json({data:ticket, msg:'success'});
        }else{
            res.json({data:ticket, msg:'no ticket found'});
        }
    }

    export const addTicket = async (req, res) => {
        let {title,
            description,
            purchaser,
            amount
            } = req.body;
        if(!title || !purchaser || !amount) CustomError.createError(
            {name:"Add ticket Error",
            cause:"!title || !purchaser || !amount",
            message:"Incomplete Ticket fields.",
            code: EErrors.INVALID_TYPES_ERROR
        });;

        //check stock logic
        //get user by email
        //get cart by user.cartid
        //for product in cart.products[] get product by cart.products[].id, confirm if product.stock is greater or equal to cart.products[].quantity
        let user = userService.getUserByEmail(purchaser);
        let outOfStock = await checkCartProductStock(user);
        if(outOfStock){return res.send({status:'error', data:outOfStock})} 
        let cartresult =cartService.deleteCartProducts(user.cart.id, outOfStock);

        let ticket = {
            title,
            description,
            purchase_datetime: Date.now,
            purchaser,
            amount,
            code:crypto.randomBytes(4).toString('hex')
        }
        let result = ticketService.addTicket(ticket)
        res.send({status:'success', payload:result});
    }

    async function checkCartProductStock(user){
        try{
            if(!user || !user.cart){
                CustomError.createError(
                    {name:"Check Product stock on Cart Error",
                    cause:"!user || !user.cart",
                    message:"User or cart not found.",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
            const cart = user.cart;
            const products = cart.products;
            const outOfStockProducts = [];

            for(const product of products){
                const productInDB = await productService.getProduct(product._id);
                if (!productInDB) {
                    CustomError.createError(
                        {name:"Check Product quantity on Cart Error",
                        cause:`!productInDB - pid: ${product._id}`,
                        message:"Product not found.",
                        code: EErrors.INVALID_TYPES_ERROR
                    });
                }
                if (productInDB.stock < product.quantity) {
                    outOfStockProducts.push(productInDB);
                }
            }
            return outOfStockProducts;
        }catch(error){
            throw error;
        }
    }

export default {
    getTicket,
    addTicket,
}