import { Router } from "express";
import { MockService } from "../services/mock.service.js";
const mockService = new MockService();
const router = Router();

router.get("/products", async (req, res) => {
    const {count} = req.query;
    let products = await mockService.generateMockProducts(count);
    console.log(products);
    res.json({
        count: products.length,
        data: products,
    });
});
export default router;