
export default class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.title= product.title;
        this.code= product.code;
        this.price = product.price;
    }
}
