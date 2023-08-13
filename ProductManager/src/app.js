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

import { messageModel } from '../src/models/message.model.js';

const app = express();
const httpServer = createServer(app);
const PORT = 8080;

mongoose.connect('mongodb+srv://ivanbravo2201:bwOeW7Da8fBCqBE9@coderdb.dvyqzjc.mongodb.net/?retryWrites=true&w=majority');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views" );

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/", viewsRouter);

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
