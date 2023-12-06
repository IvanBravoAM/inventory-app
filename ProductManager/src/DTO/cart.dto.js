
export default class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products= cart.products;
        this.totalPrice = cart.totalPrice;
    }
}
