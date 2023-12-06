import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import uploader from '../utils/uploader.js';


const userRouter = Router();

userRouter.get("/",async (req, res)=>{
    const result = await userController.getUsers(req, res);
});

userRouter.get("/admin-panel",async (req, res)=>{
    const result = await userController.getAdmin(req, res);
});

userRouter.get("/clean", async(req, res) => {
    const result = await userController.deleteInactiveUsers(req, res);
})

userRouter.get("/:uid",async (req, res)=>{
    const user = await userController.getUserEdit(req, res);
});

userRouter.get("/upload",async (req, res)=>{
    const user = await userController.getUserUpload(req, res);
});

userRouter.put("/:uid", async (req,res)=>{
    const response = await userController.updateUser(req,res);
});

userRouter.delete("/:uid", async (req,res)=>{
    const response = await userController.deleteUser(req,res);
});

userRouter.post("/documents/:uid", uploader.single('document'), async (req, res) => {
    const user = await userController.getUserUpload(req, res);
    //res.send('Documento cargado con éxito');
});

userRouter.post("/", async(req, res)=>{
    const result = await userController.addUser(req, res);
})

export default userRouter;