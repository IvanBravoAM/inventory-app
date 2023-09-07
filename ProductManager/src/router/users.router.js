import {Router} from 'express';
import { userModel } from '../models/user.model.js';
import { utilInstance } from '../utils.js';
import { cartModel } from '../models/cart.model.js';

const userRouter = Router();

userRouter.get("/",async (req, res)=>{
    try{
        let users = await userModel.find()
        res.send({status:'sucess', payload:users});
    }
    catch(error){
        console.log('cannot get users');
    }
    
});

userRouter.post("/", async(req, res)=>{
    let {first_name, last_name, email, password, age} = req.body;

    if(!first_name || !last_name || !email || !password || !age) return res.send({status:'error', error:'incomplete values'});
    const cart = new cartModel({
        products: [],
    });
    let cartResult = await cartModel.create();
    let result = await userModel.create({
        first_name,
        last_name,
        email,
        password: utilInstance.createHash(password),
        age:age,
        cart: cartResult.id
    });
    res.send({status:'success', payload:result});
})


export default userRouter;