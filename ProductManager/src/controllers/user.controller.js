import { CartService } from "../services/cart.service.js";
import  {UserService}  from "../services/user.service.js";
import { utilInstance } from "../utils.js";

const cartService = new CartService();
const userService = new UserService();

    export const getUser = async(req, res) =>{
        const {uid} = req.params;
        let user = userService.getUserPopulate(uid);
        console.log(user)
        if(user){
            res.json({data:user, msg:'success'});
        }else{
            CustomError.createError(
                {name:"Check Product stock on Cart Error",
                cause:"!user || !user.cart",
                message:"User or cart not found.",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
    }

    export const addUser = async (req, res) => {
        let {first_name, last_name, email, password, age} = req.body;
        if(!first_name || !last_name || !email || !password || !age) return res.send({status:'error', error:'incomplete values'});
        const cart = cartService.addCart();
        let user = {
            first_name,
            last_name,
            email,
            password: utilInstance.createHash(password),
            age:age,
            cart: cart.id
        }
        let result = userService.addUser(user)
        res.send({status:'success', payload:result});
    }

export default {
    getUser,
    addUser,
}