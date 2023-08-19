import { Router } from "express";
import { userModel } from '../models/user.model.js';
const router = Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const result = await userModel.find({
        email: username,
        password,
    });
    console.log("result "+result);
    console.log("user pass"+ username + password);
    if(result.length === 0)
        return res.status(401).json({
        respuesta: "error",
    });
    else{
        req.session.user = username;
        req.session.admin = true;
        res.status(200).json({
        respuesta: "ok",
        });
    }
});


export default router;