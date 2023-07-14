//const fs = require('fs');
import FileManager from "./FileManager.js";
import crypto from "crypto";

export class ProductManager{
    constructor(path){
        this.path = path;
    }
    
    async addProduct(prd){
        const { title, description, price, thumbnails, code, stock } = prd;
        if(!title || !description || !price || !thumbnails || !code || !stock){
            throw new Error("All fields are required.")
        };
        try{
            let products = await this.getProducts();
            let existingPrd = products.some((prd) => prd.code == code);
            if(existingPrd){
                throw new Error("The code is already registered.")
            }
            else{
                ProductManager.lastID++;
                const product = {
                    id: crypto.randomBytes(4).toString('hex'),
                    title, 
                    description, 
                    price, 
                    thumbnails, 
                    code, 
                    stock
                };
                products.push(product);
                await FileManager.writeFile(this.path, products);
            }    
        }catch(error){  
            console.log(error);
        }
        
    }

    async getProducts(){
        try{
            let fileContent = await FileManager.readFile(this.path)
            return fileContent?.length > 0 ? fileContent : [];
        }catch(error){
            console.error(error);
        }
    }

    async getProductById(id){
        try{
            let products= await this.getProducts();
            const prd=products.find(prd => prd.id === id)
            if(!prd){throw new Error("ID not found.")}
            return prd;
        }catch(error){
            console.error(error);
        }   
    }

    async updateProductById(id, data) {
        try{
            let products = await this.getProducts();
            let productIndex = products.findIndex((prd) => prd.id === id);
            if (productIndex == -1) {
                throw new Error("ID not found.")}
            else{
                products[productIndex] = {...products[productIndex],...data,};
                await FileManager.writeFile(this.path, products);
                return products[productIndex];
            }
            }catch(error){
                console.log(error);
            }
    }
    
    async deleteProductById(id) {
        try{
            let products = await this.getProducts();
            let productIndex = products.findIndex((prd) => prd.id === id);
            if (productIndex == -1) {
                throw new Error("ID not found.")}
            else{
                products.splice(productIndex, 1);
                await FileManager.writeFile(this.path, products);
                return "Product deleted.";
            }
        }catch(error){
                console.log(error);
        }
    }
    
}
