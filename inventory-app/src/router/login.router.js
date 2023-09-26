import { Router } from "express";
import {utilInstance} from "../utils.js";
const router = Router();

router.get("", (req, res) => {
  res.render("login", {
    title: "Inicia sesion",
  });
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        let message = 'You have been logged out!';
        res.render('login',{message});
      } else {
        res.json({
          status: "Error al cerrar sesion",
          body: err,
        });
      }
    });
  });

router.get("/profile", utilInstance.sessionValidation, (req, res) => {
    const userData = {
        username: req.session.user,
        isAdmin: req.session.admin
    };

    res.render("profile", { userData });
});  

export default router;