import express from 'express';
import productRouter from './router/products.router.js';
import cartRouter from './router/carts.router.js';
import viewsRouter from './router/views.router.js';
import realTimeRouter from './router/realTimeProduct.router.js'; 
import {engine} from "express-handlebars";
import {createServer} from "http";
import  {Server} from "socket.io"
import { ProductManager } from "./ProductManager.js";
const productManager = new ProductManager("src/products.json");
import userRouter from './router/users.router.js';
import mockRouter from './router/mock.router.js';
import messageRouter from './router/message.router.js';
import mongoose from 'mongoose';
import morganBody from 'morgan-body';
import MongoStore from "connect-mongo";
import session from "express-session";

import loginRouter from './router/login.router.js';
import sessionRouter from './router/session.router.js';
import { messageModel } from '../src/models/message.model.js';

const app = express();
const httpServer = createServer(app);
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import config from "./config/config.js";
import errorHandler from "./middleware/errors/index.js";
import { addLogger, devLogger, prodLogger } from "./utils/logger.js";
import logRouter from './router/log.router.js';

mongoose.connect(config.MONGO_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//handlebars config
app.engine("handlebars", engine({
    defaultLayout: 'main',
    extname: 'handlebars',
    partialsDir: './src/views/partials' // Path to your partials directory
}));
app.set("view engine", "handlebars");
app.set("views", "src/views" );

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(addLogger);

//SESSION
app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 300,
      }),
      secret: "codersecret",
      resave: false,
      saveUninitialized: false,
    })
  );
//SESSION
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/view", viewsRouter);

app.use("/", loginRouter);

app.use("/login", sessionRouter);

app.use("/real", realTimeRouter); 

app.use("/api/users", userRouter);

app.use("/chat", messageRouter);

app.use("/mock", mockRouter);

app.use("/loggerTest", logRouter);

app.use(errorHandler);


const socketIO = new Server(httpServer);

socketIO.on('connection', (socket)=>{
    devLogger.debug('new user connected');

    socket.on("addProduct", async (newProduct) => {
        const response = await productManager.addProduct(newProduct);
        socketIO.emit("newProductAdded", newProduct);
    });

    socket.on("deleteProduct", async (productID) => {
        const response = await productManager.deleteProductById(productID);
        devLogger.debug("product deleted");
    });

    socket.on("addMessage", async (chat) => {
        const {user,message} = chat;
        let result = await messageModel.create({
            user,
            message
        });
        devLogger.debug('new message '+ result);
        socketIO.emit('newMessage', chat);
    });
});

morganBody(app);
// Iniciar el servidor HTTP
httpServer.listen(config.PORT, () => {
    devLogger.debug(`Servidor en ejecución en http://localhost:${config.PORT}`);
});
