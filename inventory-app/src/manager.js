import { ProductManager } from "./ProductManager.js";

async function main(){
    const productManager =  new ProductManager('./products.json');
    console.log('updated index', await productManager.updateProductById('5079a5c7',{code:'ww4'}));
    console.log('prds:', await productManager.getProducts())
    await productManager.addProduct('Cerveza Quilmes', 'Mas Quilmes mas cerveza', 400, 'https//quilmes.com.ar', 'asd14424', 300);
    console.log('prds:', await productManager.getProducts())
    await productManager.addProduct('Cerveza Andes', 'Cerveza mas de verdad', 500, 'https//cervezaandes.com.ar', 'as34', 400);
    console.log('prds:', await productManager.getProducts())
    await productManager.deleteProductById('396a5cf1');
}

main()
