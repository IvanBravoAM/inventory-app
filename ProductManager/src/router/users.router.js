import {Router} from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get("/",async (req, res)=>{
    const result = await userController.getUser(req, res);
});

userRouter.get("/premium/:uid",async (req, res)=>{
    const user = await userController.getUserEdit(req, res);
});

userRouter.post("/", async(req, res)=>{
    const result = await userController.addUser(req, res);
})


export default userRouter;