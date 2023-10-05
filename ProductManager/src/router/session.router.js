import { Router } from "express";
import { userModel } from '../models/user.model.js';
import { utilInstance } from "../utils.js";
import passport from "passport";
import UserDTO from "../DTO/user.dto.js";
const router = Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const result = await userModel.find({
        email: username,
    });
    console.log("user "+ result[0] );
    if(result.length === 0)
        return res.status(401).json({
        respuesta: "error",
    });
    else if(utilInstance.isValidPassword(result[0].password, password)){
      console.log('oh hi mark');
        req.session.user = username;
        req.session.admin = result[0].role == 'admin';
        res.status(200).json({
        respuesta: "ok",
        });
    }
  });

router.post(
    "/in",
    passport.authenticate("login", {
      failureRedirect: "/login/failLogin",
    }),
    async (req, res) => {
      console.log(req.user);
      if (!req.user) {
        return res.status(401).json("error de autenticacion");
      }
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
      };
      req.session.admin = true;
  
      res.send({ status: "success", mesage: "user logged", user: req.user });
    }
  );

  router.get("/failLogin", async (req, res) => {
    console.log("failed strategy");
    let message = 'Your username or password is incorrect';
    console.log(message);
    res.render('login',{message});
    console.log(message);
  });

  router.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
      req.session.user = req.user;
      req.session.admin = true;
      res.redirect("/");
    }
  );

  router.get(
    "/current",
    async (req, res) => {
      const user = req.session.user;
      if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const result = await userModel.find({
        email: user,
      });
      const userdto =  new UserDTO(result[0]);
      console.log(userdto)
      res.json(userdto);
    }
  );


export default router;