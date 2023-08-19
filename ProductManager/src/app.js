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
import messageRouter from './router/message.router.js';
import mongoose from 'mongoose';
import morganBody from 'morgan-body';
import MongoStore from "connect-mongo";
import session from "express-session";
import * as dotenv from 'dotenv';
import loginRouter from './router/login.router.js';
import sessionRouter from './router/session.router.js';
import { messageModel } from '../src/models/message.model.js';
dotenv.config();
const app = express();
const httpServer = createServer(app);
const MONGO_URL = process.env.MONGO_URL;
console.log('mongo urlk: ${process.env.MONGO_URL}');
const PORT = /*process.env.PORT || 3000;*/ 8080;
const MONGO_HARD = 'mongodb+srv://ivanbravo2201:bwOeW7Da8fBCqBE9@coderdb.dvyqzjc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_HARD);

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

//SESSION
app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_HARD,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 30,
      }),
      secret: "codersecret",
      resave: false,
      saveUninitialized: false,
    })
  );
//SESSION

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/view", viewsRouter);

app.use("/", loginRouter);

app.use("/login", sessionRouter);

app.use("/real", realTimeRouter); 

app.use("/api/users", userRouter);

app.use("/chat", messageRouter);

// app.listen(PORT ,() =>{
//     console.log('SERVER LISTENING ON PORT 8080');
// }); 

//io config





const socketIO = new Server(httpServer);

socketIO.on('connection', (socket)=>{
    console.log('new user connected');

    socket.on("addProduct", async (newProduct) => {
        const response = await productManager.addProduct(newProduct);
        socketIO.emit("newProductAdded", newProduct);
    });

    socket.on("deleteProduct", async (productID) => {
        const response = await productManager.deleteProductById(productID);
        console.log("product deleted");
    });

    socket.on("addMessage", async (chat) => {
        const {user,message} = chat;
        let result = await messageModel.create({
            user,
            message
        });
        console.log('new message '+ result);
        socketIO.emit('newMessage', chat);
    });
});

morganBody(app);
// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
