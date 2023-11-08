import chai from "chai";
const expect = chai.expect;
import express from 'express';
import mongoose from 'mongoose';
import config from "../src/config/config.js";
import { CartRepository } from "../src/DAO/cart.repository.js";
mongoose.connect(config.MONGO_URL);
import cartRouter from '../src/router/carts.router.js';
const app = express();
app.use(express.json());
app.use('/cart', cartRouter);

const cartRepository = new CartRepository();

describe('CartRepository Tests', function () {
let cartId; 
    before(async function () {
        const response = await cartRepository.createCart();
        cartId = response._id;
    });

    it('should get a cart by ID', async function () {
        const cart = await cartRepository.getCart(cartId);
        expect(cart).to.exist;
    });

    it('should update a cart', async function () {
        const updatedCart = { products: [{ pid: 'product_id', quantity: 2 }] };
        const result = await cartRepository.updateCart(cartId, updatedCart);
        expect(result).to.be.an('object');
        expect(result.ok).to.equal(1);
    });

    it('should delete a cart', async function () {
        const result = await cartRepository.deleteCart(cartId);
        expect(result).to.be.an('object');
        expect(result.ok).to.equal(1);
    });

    it('should get a cart and populate products', async function () {
        const cart = await cartRepository.getCartPopulate(cartId);
        expect(cart).to.exist;
        expect(cart.products).to.be.an('array');

    });

    it('should delete products from a cart', async function () {
        const productIdsToDelete = ['64d16f0a73f2a8847594a834', '64d16f1c73f2a8847594a836'];
        const updatedCart = await cartRepository.deleteCartProducts(cartId, productIdsToDelete);
        expect(updatedCart).to.exist;

    });

});

describe('Cart Routes', function () {
    before(function (done) {
    mongoose.connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once('open', function () {
        done();
    });
    });

    after(function (done) {
    mongoose.connection.close(function () {
        done();
    });
    });

    it('should create a cart', async function () {
    const response = await supertest(app)
        .post('/cart')
        .expect(201);

    const cartId = response.body.cart._id;

    expect(cartId).to.be.a('string');
    });

    it('should add a product to the cart', async function () {
    const product = new productModel({ name: 'Test Product' });
    const savedProduct = await product.save();

    const cart = new cartModel({ products: [] });
    await cart.save();

    const response = await supertest(app)
        .post(`/cart/${cart._id}/addProduct/${savedProduct._id}`)
        .expect(200);

    expect(response.body.message).to.equal('Product added to cart');
    });

    it('should get a cart by ID', async function () {
    const cart = new cartModel({ products: [] });
    await cart.save();

    const response = await supertest(app)
        .get(`/cart/${cart._id}`)
        .expect(200);

    expect(response.body.cart).to.exist;
    });
});
