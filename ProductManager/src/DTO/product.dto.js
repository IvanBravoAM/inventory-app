
export default class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.title= product.title;
        this.code= product.code;
        this.price = product.price;
        this.owner = product.owner;
        this.stock = product.stock;
    }
}
