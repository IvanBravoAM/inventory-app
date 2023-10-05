import { productModel } from "../models/product.model.js";


export class ProductRepository{

    async getProduct(pid){
        return productModel.findById(pid);
    }

    async getAllPaginated(filter, options){
        return productModel.paginate(filter, options);
    }
    async createProduct(){
        return productModel.create(product);
    }
    async updateProduct(pid, product){
        let result = await productModel.updateOne({_id:pid}, product);
        return result;
    }

    async deleteProduct(pid){
        let result = await productModel.deleteOne({_id:pid});
        return result;
    }
    
}