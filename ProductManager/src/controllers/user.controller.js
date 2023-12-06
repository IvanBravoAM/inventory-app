import { CartService } from "../services/cart.service.js";
import  {UserService}  from "../services/user.service.js";
import { utilInstance } from "../utils.js";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";

const cartService = new CartService();
const userService = new UserService();

    export const getUser = async(req, res) =>{
        const {uid} = req.params;
        console.log(uid);
        let user = await userService.getUser(uid);
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

    export const getUsers = async(req, res) =>{
        let users = await userService.getUsers();
        if(users){
            res.render("users", {users});
        }else{
            CustomError.createError(
                {name:"Check Product stock on Cart Error",
                cause:"!user || !user.cart",
                message:"User or cart not found.",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
    }

    export const getAdmin = async(req, res) =>{
        
        res.render("adminpanel");
        
    }

    export const getUserEdit = async(req, res) =>{
        const {uid} = req.params;
        console.log(uid);
        let user = await userService.getUser(uid);
        const userData = {
            user: user,
            isAdmin: req.session.admin
        };
        console.log(user)
        if(user){
            res.render("useredit", {userData});
        }else{
            CustomError.createError(
                {name:"Check Product stock on Cart Error",
                cause:"!user || !user.cart",
                message:"User or cart not found.",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
    }

    export const deleteInactiveUsers = async(req, res) =>{
        try{
            let response = await userService.deleteInactiveUsers();
        }catch(error){
            CustomError.createError(
                {name:"Check Product stock on Cart Error",
                cause:"!user || !user.cart",
                message:"User or cart not found.",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
    }

    export const deleteUser = async(req, res) =>{
        try{
            const {uid} = req.params;
            let response = await userService.deleteUser(uid);
            res.redirect('/api/users');
        }catch(error){
            CustomError.createError(
                {name:"Check Product stock on Cart Error",
                cause:"!user || !user.cart",
                message:"User or cart not found.",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
    }

    export const getUserUpload = async(req, res) =>{
        try{
            res.render("uploadProfile");
        }catch(error){
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

    export const updateUser = async (req, res) =>{
        try {
            const {uid} = req.params;
            const newRole = req.body;
            const user = await userService.getUser(uid);
    
            // Check if the user exists
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            if (user.role == 'admin') {
                return res.status(500).json({ success: false, message: 'Admin role cannot be changed' });
            }

            const result = await userService.updateUser(uid , newRole.role);

    
            res.redirect('/api/users');
        } catch (error) {
            console.error('Error updating user role:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

export default {
    getUser,
    getUsers,
    addUser,
    getUserEdit,
    getUserUpload,
    getAdmin,
    deleteInactiveUsers,
    updateUser,
    deleteUser
}