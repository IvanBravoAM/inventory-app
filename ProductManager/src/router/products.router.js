import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import RouterHelper from "../RouterHelper.js";

const router = Router();
const productManager = new ProductManager("products.json");

router.get('/', async (req,res)=>{
    console.log("req body"+req.body);
    const {limit} = req.query;
    let prods = await productManager.getProducts();
    if(limit){
        let aux = prods.slice(0, limit)
        res.json({data:aux, limit: limit }); 
    }else{
        res.json({data: prods, limit:false});
    }
    
})


router.get("/:pid", RouterHelper.getProductByIdRoute);

router.post("/",async (req, res)=>{
    try{
    const {title, description, price, thumbnails, code, status, stock, category} = req.body;
    const prd = {};
    console.log(category)
    if(!title || !description || !code || !price || !stock || !category){
        res.json({message: "Missing fields"});
    }else{
        prd.title = title;
        prd.description = description;
        prd.code = code;
        prd.price = price;
        prd.status = !status || typeof status !== "boolean" ? true : status;
        prd.stock = stock;
        prd.category = category;
        prd.thumbnails = !thumbnails ? "" : thumbnails;
    }

    
        const response = await productManager.addProduct(prd);
        res.json({
            message: "product succesfully added",
            data: response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
});

router.put("/:pid",async (req, res)=>{
    console.log("req body"+req.body);
    try{
        const {pid} = req.params;
        if (req.body && typeof req.body === 'object') {
            const filteredParams = Object.entries(req.body)
            .filter(([key, value]) => value !== null && value !== undefined)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        
            // Use the filteredParams object as needed
            console.log(filteredParams)
            const response = await productManager.updateProductById(pid, filteredParams);
            res.json({data:prd, msg:'success'});

        } else {
            // Handle the case when req.body is undefined or null
            console.log("error ")
        };
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
    
});

router.delete("/:pid", async (req, res)=>{
    try{
        const {pid} = req.params;
        const response = productManager.deleteProductById(pid);
        res.json({message:'delete success', data:response})
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
});

export default router;