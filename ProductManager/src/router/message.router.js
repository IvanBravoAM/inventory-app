import {Router} from 'express';
import { messageModel } from '../models/message.model.js';

const messageRouter = Router();

messageRouter.get("/",async (req, res)=>{
    try{
        let messages = await messageModel.find().lean();
        const admin = req.session.admin
        const user = req.session.user
        res.render("chat",{messages, admin, user});
    }
    catch(error){
        console.log('cannot get messages');
    }
    
});

messageRouter.post("/", async(req, res)=>{
    let {user, message} = req.body;
    let test = [req.body];
    console.log("test"+Object.entries(test));
    console.log("us"+user+message);
    if(user == undefined || message == undefined){ return res.send({status:'undefined user/message'});}
    let result = await messageModel.create({
        user,
        message
    });
    //res.send({status:'success', payload:result});
})


export default messageRouter;