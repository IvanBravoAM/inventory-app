import  {ProductService}  from "../services/product.service.js";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { UserService } from "../services/user.service.js";
const productService = new ProductService();
const userService = new UserService();

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
        
        //const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages, totalDocs }= await productService.getProductsPag(filter, options);
        let products = await productService.getProducts();
        console.log('prods-->>',{products});
    
        
        //res.send({status:"success", payload: prods,totalDocs:totalDocs, totalPages: totalPages, prevPage: prevPage, nextPage:nextPage, page:page, hasPrevPage:hasPrevPage, hasNextPage:hasNextPage});
        res.render("productslist", {products});
    }

    export const getProduct = async (req, res) =>{
        const {pid} = req.params;
        let response = await productService.getProduct(pid);
        res.json(response)
    }

    export const createProduct = async (req, res) =>{
        try{
            let {title, description, price, thumbnails, code, status, stock, category} = req.body;
            console.log(req.body);
            status = !status || typeof status !== "boolean" ? true : status;
            const user = await userService.getUserByEmail(req.session.user.toString());
            const owner = user._id;
            console.log(user);
            
            if(!title || !description || !code || !price || !stock || !category){
                CustomError.createError(
                    {name:"Create Product Error",
                    cause:"There are missing fields",
                    message:"Missing fields.",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
            let product = {title, description, code, price, stock, category, status, thumbnails, owner}
            if (!user.role == 'admin') {
                return res.status(403).send('No tienes permiso para realizar esta acción.');
            }
            let response = await productService.addProduct(product);
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
            const product = await productService.getProduct(pid);
            const user = await userService.getUserByEmail(req.session.user.toString());
            console.log(user);
            if (user._id.toString() !== product.owner.toString() || user.role != 'admin') {
                // El usuario no es el propietario del producto ni un administrador
                return res.status(403).send('No tienes permiso para realizar esta acción.');
            }
            let response = await productService.deleteProduct(pid);
            await productService.sendDeleteProductEmail(user.email,pid);
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