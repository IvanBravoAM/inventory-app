import { productModel } from "../models/product.model.js";
import { faker } from "@faker-js/faker";

export class MockService{
    async generateMockProducts(count) {
        const mockProducts = [];
        for (let i = 0; i < count; i++) {
            const product = new productModel({
                title: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                price: parseFloat(faker.commerce.price()),
                thumbnails: faker.image.url(),
                stock: faker.number.int({ min: 1, max: 100 }),
                status: faker.datatype.boolean(),
                category: faker.commerce.department(),
                code: faker.number.int({ min: 200, max: 800 }),
            });
            //console.log(product);
            mockProducts.push(product);
        }
            return mockProducts;
    }
}   