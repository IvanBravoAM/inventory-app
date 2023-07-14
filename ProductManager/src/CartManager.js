import FileManager from "./FileManager.js";
import crypto from "crypto";


export class CartManager{
    constructor(path){
        this.path = path;
    }

    async getCarts(){
        try{
            let fileContent = await FileManager.readFile(this.path)
            return fileContent?.length > 0 ? fileContent : [];
        }catch(error){
            console.error(error);
        }
    }
    async getCartById(id){
        try{
            let carts= await this.getCarts();
            const cart=carts.find(cart => cart.id === id)
            if(!cart){throw new Error("ID not found.")}
            return cart;
        }catch(error){
            console.error(error);
        }   
    }
    async addCart(){
        try{
            const cart = {
                id: crypto.randomBytes(2).toString('hex'),
                products: []
            };
            let carts = await this.getCarts();
            carts.push(cart);
            await FileManager.writeFile(this.path, carts);   
        }catch(error){  
            console.log(error);
        }
        
    }

    async addProduct(cid,pid){
        try{
            let carts = await this.getCarts();
            let cartIndex = carts.findIndex((cart) => cart.id === cid)
            let product = null;
            carts[cartIndex].products.forEach((prd) => {
                console.log(pid==prd.productId)
                if (prd.productId === pid) {
                    
                    product = prd;
                }});
                console.log(product)    
            if(!product) {
                const prds = {productId: pid, quantity:1}
                carts[cartIndex].products.push(prds)
                await FileManager.writeFile(this.path, carts);
            }else{
                let productIndex = carts[cartIndex].products.findIndex((prd) => prd.productId === pid);
                carts[cartIndex].products[productIndex].quantity++;
                await FileManager.writeFile(this.path, carts);
            }
        }catch(error){
            console.log(error);
        }
    }




}