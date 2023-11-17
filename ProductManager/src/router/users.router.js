import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import uploader from '../utils/uploader.js';


const userRouter = Router();

userRouter.get("/",async (req, res)=>{
    const result = await userController.getUser(req, res);
});

userRouter.get("/:uid",async (req, res)=>{
    const user = await userController.getUserEdit(req, res);
});

userRouter.get("/upload",async (req, res)=>{
    const user = await userController.getUserUpload(req, res);
});

userRouter.post("/documents/:uid", uploader.single('document'), async (req, res) => {
    const user = await userController.getUserUpload(req, res);
    //res.send('Documento cargado con éxito');
});

userRouter.post("/", async(req, res)=>{
    const result = await userController.addUser(req, res);
})


export default userRouter;