import { productModel } from "../models/product.model.js";


export class ProductRepository{

    async getProduct(pid){
        return productModel.findById(pid);
    }

    async getProducts(){
        return productModel.find().lean();
    }

    async getAllPaginated(filter, options){
        return productModel.paginate(filter, options);
    }
    async createProduct(product){
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