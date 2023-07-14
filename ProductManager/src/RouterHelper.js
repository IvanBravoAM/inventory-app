
import { ProductManager } from "./ProductManager.js"

const productManager = new ProductManager("products.json");

async function getProductByIdRoute(req,res){
    
    const {pid} = req.params;
    console.log(pid);
    let prd = await productManager.getProductById(pid);
    console.log(prd)
    if(prd){
        res.json({data:prd, msg:'success'});
    }else{
        res.json({data:prd, msg:'no prd found'});
    }
}

export default {getProductByIdRoute}
