import { ProductRepository } from "../DAO/product.repository.js";
import ProductDTO from "../DTO/product.dto.js";
const productRepository = new ProductRepository();

export class ProductService{
    async getProducts(filter, options){
        try{
            let products = await productRepository.getAllPaginated(filter, options);
            console.log('this are the pradas', products);
            if(!products){CustomError.createError(
                {name:"Get Products Error",
                cause:"Get Products from db failed",
                message:"Products not found.",
                code: EErrors.DATABASE_ERROR
            });}
            products.docs.forEach(element => {
                element = new ProductDTO(element);
            });
            return products;
        }
        catch(error){
            console.log(error);
        }
    }

    async getProduct(pid){
        try{
            const product = await productRepository.getProduct(pid);
            return new ProductDTO(product);
        }
        catch(error){
            console.log(error);
        }
    }

    async addProduct(){
        try{
            const product = await productRepository.createProduct();
            return new ProductDTO(product);
        }catch(error){
            console.log(error);
        }
    }

    async updateProduct(pid, product){
        try{
            const prd = await productRepository.updateProduct({_id:pid}, product);
            return new ProductDTO(prd);
        }catch(error){
            console.log(error);
        }
    }

    async deleteProduct(pid){
        try{
            const result = await productRepository.deleteProduct({_id:pid});
            return result;
        }catch(error){
            console.log(error);
        }
    }
}