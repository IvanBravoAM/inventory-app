import {expect} from "chai";
import supertest from "supertest";
import express from 'express';
import { productModel } from "../src/models/product.model.js";
import productRouter from '../src/router/products.router.js';
const app = express();

app.use(express.json());
app.use('/product', productRouter);

const request = supertest(app);

const productData = {"_id":{"$oid":"654aeaa12cc3494bc90e0f99"},"title":"Cerveza Quilmes","description":"Mas Quilmes mas cerveza","price":{"$numberInt":"400"},"stock":{"$numberInt":"300"},"status":true,"category":"Beer","code":"ww8","__v":{"$numberInt":"0"},"thumbnails":"https://th.bing.com/th/id/OIP.mcD9-ZK_Q8FaFeJ9Zb90zwHaHa?w=190&h=190&c=7&r=0&o=5&pid=1.7"};

describe('Product API Endpoints', function () {
it('should get a list of products', async function () {
    const response = await request.get('/product');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
});

it('should get a product by ID', async function () {
    const productId = productData._id; 
    const response = await request.get(`/product/${productId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
});

it('should create a product', async function () {
    const response = await request.post('/product').send(productData);
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');

});

it('should update a product', async function () {
    const productId = productData._id; 
    const response = await request.put(`/product/${productId}`).send(productData);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    
});

it('should delete a product', async function () {
    const productId = productData._id; 
    const response = await request.delete(`/product/${productId}`);
    expect(response.status).to.equal(204);
});
});
