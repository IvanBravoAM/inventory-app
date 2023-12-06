import { Router } from "express";
import { userModel } from '../models/user.model.js';
import { utilInstance } from "../utils.js";
import passport from "passport";
import UserDTO from "../DTO/user.dto.js";
import { transporter } from "../services/mail.service.js";
import crypto from "crypto";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import config from "../config/config.js";
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
        await userModel.findByIdAndUpdate(result[0]._id, { last_connection: new Date() });
        req.session.user = username;
        req.session.admin = result[0].role == 'admin';
        res.status(200).json({
        respuesta: "ok",
        });
    }else{
      return res.status(401).json({
        respuesta: "datos incorrectos",
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


  router.get('/forgot-password', async (req, res) => {
    // Mostrar formulario para ingresar el correo
    res.render('forgot');
  });


  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const user = await userModel.findOne({ email });

    if (!user) {
      // El usuario no existe, muestra un mensaje de error o redirige
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Generar un token
    const token = crypto.randomBytes(20).toString('hex');

    // Almacenar el token en la base de datos
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de validez

    await user.save();

    // Enviar correo de recuperación
    const mailOptions = {
      from: 'inventory_app@gmail.com',
      to: 'ivanbravo.2201@gmail.com' ,//email,
      subject: 'Recuperación de contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${config.HOST_NAME}/login/reset/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo: ' + error);
        return res.status(500).json({ success: false, message: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado: ' + info.response);
        return res.status(200).json({ success: true, message: 'Correo de recuperación enviado con éxito' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

  router.get('/reset/:token', (req, res) => {
    const {token} =  req.params;
    const now = new Date();
    const tokenCreationDate = token.creationDate; // Get fecha de creación del token desde la base de datos

    const expirationTime = 60 * 60 * 1000; 

    if (now - tokenCreationDate > expirationTime) {
      //Token expirado redirige al usuario a la pagina de recuperacion
    } else {
      res.render('resetpassword');
    }
    
  });

  router.post('/reset/:token', async (req, res) => {

    let newPassword = req.body.newPassword;
    const token= req.params.token;
    console.log(token);
    const user = await userModel.findOne({ resetPasswordToken: token });
    console.log('user',user);
    const previousPassword = user.password;
    console.log(' pass ', newPassword);
    console.log('user ', user);
    if (newPassword === previousPassword) {
      CustomError.createError(
        {name:"Change product Error",
        cause:"Same password as before",
        message:"La nueva contraseña es igual a la anterior.",
        code: EErrors.INVALID_TYPES_ERROR
    });
      
    } else {
      newPassword = utilInstance.createHash(newPassword);

      console.log('el idd', user._id);
      const result = await userModel.updateOne({ _id: user._id }, { $set: { password: newPassword } });
      console.log('resss', result);
      return res.status(200).json({ success: true, message: 'Contraseña cambiada con éxito' });
    }
  });


export default router;