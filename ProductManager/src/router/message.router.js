import {Router} from 'express';
import { messageModel } from '../models/message.model.js';

const messageRouter = Router();

messageRouter.get("/",async (req, res)=>{
    try{
        let messages = await messageModel.find();
        console.log({messages});
        res.render("chat",{messages});
    }
    catch(error){
        console.log('cannot get messages');
    }
    
});

messageRouter.post("/", async(req, res)=>{
    let {user, message} = req.body;
    let test = [req.body];
    console.log("test"+Object.entries(test));

    let result = await messageModel.create({
        user,
        message
    });
    res.send({status:'success', payload:result});
})


export default messageRouter;