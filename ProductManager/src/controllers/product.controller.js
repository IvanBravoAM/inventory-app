import  {ProductService}  from "../services/product.service.js";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
const productService = new ProductService();

    export const getProducts = async(req, res) =>{
        const {limit=10, page =1, sort, query} = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean:true
        };
        if(sort) {
            options.sort = sort; 
        }
        const filter = query ? { $text: { $search: query } } : {}; 
        
        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages, totalDocs }= await productService.getProducts(filter, options);
        let prods = docs;
        
        res.send({status:"success", payload: prods,totalDocs:totalDocs, totalPages: totalPages, prevPage: prevPage, nextPage:nextPage, page:page, hasPrevPage:hasPrevPage, hasNextPage:hasNextPage});
    }

    export const getProduct = async (req, res) =>{
        const {pid} = req.params;
        let response = await productService.getProduct(pid);
        res.json(response)
    }

    export const createProduct = async (req, res) =>{
        try{
            let {title, description, price, thumbnails, code, status, stock, category} = req.body;
            status = !status || typeof status !== "boolean" ? true : status;
            if(!title || !description || !code || !price || !stock || !category){
                CustomError.createError(
                    {name:"Create Product Error",
                    cause:"There are missing fields",
                    message:"Missing fields.",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
            let product = {title, description, code, price, stock, category, status, thumbnails}
            let response = await productModel.create(product);
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
    }

    export const updateProduct = async (req, res) =>{
        try{
            const {pid} = req.params;
            let newProduct= req.body;
            if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category){
                res.json({message: "Missing fields"});
            }
            let result = await productService.updateProduct(pid, newProduct);
            res.json({status:"success", payload: result});
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"server failure"
            })
        }
    }

    export const deleteProduct = async (req, res) => {
        try{
            const {pid} = req.params;
            let response = await productService.deleteProduct(pid);
            res.json({message:'delete success', data:response})
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"server failure"
            })
        }
    }

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}