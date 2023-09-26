import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import RouterHelper from "../RouterHelper.js";
import { productModel } from "../models/product.model.js";

const router = Router();
const productManager = new ProductManager("src/products.json");

router.get('/', async (req,res)=>{
    console.log("req body"+req.body);
    const {limit=10, page =1, sort, query} = req.query;
    //let prods = await productManager.getProducts();
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        lean:true
    };
    if(sort) {
        options.sort = sort; 
    }
    const filter = query ? { $text: { $search: query } } : {}; 
    
    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages, totalDocs }= await productModel.paginate(filter, options);
    let prods = docs;
    
    res.send({status:"success", payload: prods,totalDocs:totalDocs, totalPages: totalPages, prevPage: prevPage, nextPage:nextPage, page:page, hasPrevPage:hasPrevPage, hasNextPage:hasNextPage});
    
    
})


router.get("/:pid", async (req, res)=>{
    //let response = await RouterHelper.getProductByIdRoute(req, res);
    const {pid} = req.params;
    let response = await productModel.findById(pid) 
    console.log(response)
    res.json(response)});

router.post("/",async (req, res)=>{
    try{
        let {title, description, price, thumbnails, code, status, stock, category} = req.body;
        status = !status || typeof status !== "boolean" ? true : status;
        if(!title || !description || !code || !price || !stock || !category){
            res.json({message: "Missing fields"});
        }/*else{
            prd.title = title;
            prd.description = description;
            prd.code = code;
            prd.price = price;
            prd.status = !status || typeof status !== "boolean" ? true : status;
            prd.stock = stock;
            prd.category = category;
            prd.thumbnails = !thumbnails ? "" : thumbnails;
        }
        const response = await productManager.addProduct(prd);*/
        let response = await productModel.create({title, description, code, price, stock, category, status, thumbnails});
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
    try{
        const {pid} = req.params;
        /*if(req.body && typeof req.body === 'object'){
            const filteredParams = Object.entries(req.body)
            .filter(([key, value]) => value !== null && value !== undefined && key != 'id')
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

            const prd = await productManager.updateProductById(pid, filteredParams);
            res.json({data:prd, msg:'success'});

        }else {
            console.log("error")
        };*/
        let newProduct= req.body;
        if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category){
            res.json({message: "Missing fields"});
        }
        let result = await productModel.updateOne({_id:pid}, newProduct);
        res.json({status:"success", payload: result});
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
        //const response = productManager.deleteProductById(pid);
        let response = await productModel.deleteOne({_id:pid});
        res.json({message:'delete success', data:response})
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server failure"
        })
    }
});

export default router;