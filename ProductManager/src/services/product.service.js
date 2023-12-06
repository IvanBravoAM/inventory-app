import { ProductRepository } from "../DAO/product.repository.js";
import ProductDTO from "../DTO/product.dto.js";
const productRepository = new ProductRepository();
import { transporter } from "../services/mail.service.js";

export class ProductService{
    async getProductsPag(filter, options){
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

    async getProducts(){
        try{
            let products = await productRepository.getProducts();
            if(!products){CustomError.createError(
                {name:"Get Products Error",
                cause:"Get Products from db failed",
                message:"Products not found.",
                code: EErrors.DATABASE_ERROR
            });}
            // products.docs.forEach(element => {
            //     element = new ProductDTO(element);
            // });
            return products;
        }
        catch(error){
            console.log(error);
        }
    }

    async getProduct(pid){
        try{
            const product = await productRepository.getProduct(pid);
            console.log(product);
            return new ProductDTO(product);
        }
        catch(error){
            console.log(error);
        }
    }

    async addProduct(product){
        try{
            const res = await productRepository.createProduct(product);
            return res;
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

    async sendDeleteProductEmail(userEmail, productId) {
        const mailOptions = {
            from: 'inventory-app@gmail.com',
            to: userEmail,
            subject: 'Product Deletion Notification',
            text: `Your product with Id ${productId} has been deleted.`,
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Deletion notification email sent to ${userEmail}`);
        } catch (error) {
            console.error('Error sending deletion notification email:', error);
        }
        }
}