import express from 'express';
import {ProductManager} from "./ProductManager.js";

const productManager =  new ProductManager('./products.json');
const app = express();
const PORT = 8080;

app.get('/products', async (req,res)=>{
    const {limit} = req.query;
    let prods = await productManager.getProducts();
    if(limit){
        let aux = prods.slice(0, limit)
        res.json({data:aux, limit: limit }); 
    }else{
        res.json({data: prods, limit:false});
    }
    
})

app.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params;
    console.log(pid);
    let prd = await productManager.getProductById(pid);
    console.log(prd)
    if(prd){
        res.json({data:prd, msg:'success'});
    }else{
        res.json({data:prd, msg:'no prd found'});
    }
    
})

app.use(express.json())

app.listen(PORT ,() =>{
    console.log('SERVER LISTENING ON PORT 8080');
});