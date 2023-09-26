
import { ProductManager } from "./ProductManager.js"

const productManager = new ProductManager("src/products.json");

async function getProductByIdRoute(req,res){
    
    const {pid} = req.params;
    console.log(pid);
    let prd = await productManager.getProductById(pid);
    if(prd){
        return {data:prd, msg:'success'};
    }else{
        return {data:prd, msg:'no prd found'};
    }
}

export default {getProductByIdRoute}
