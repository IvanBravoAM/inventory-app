import express from 'express';
import productRouter from './router/products.router.js';
import cartRouter from './router/carts.router.js';
import realTimeRouter from './router/realTimeProduct.router.js'; 
import {engine} from "express-handlebars";
import {createServer} from "http";
import  {Server} from "socket.io"
import { ProductManager } from "./ProductManager.js";
const productManager = new ProductManager("src/products.json");

const app = express();
const httpServer = createServer(app);
const PORT = 8080;

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views" );


app.use(express.json());

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/real", realTimeRouter); 

// app.listen(PORT ,() =>{
//     console.log('SERVER LISTENING ON PORT 8080');
// }); 

//io config



// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

const socketIO = new Server(httpServer);

socketIO.on('connection', (socket)=>{
    console.log('new user connected');

    socket.on("addProduct", async (newProduct) => {
        const response = await productManager.addProduct(newProduct);
        io.emit("newProductAdded", newProduct);
    });

    socket.on("deleteProduct", async (productID) => {
        const response = await productManager.deleteProductById(productID);
        console.log("product deleted");
    });
});



