import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { utilInstance } from "../utils.js";
const router = Router();

router.get('/', async (req,res)=>{
    const result = await productController.getProducts(req, res);
})

router.get("/:pid", async (req, res)=>{
    const result = await productController.getProduct(req, res);
});

router.post("/", utilInstance.adminValidation, async (req, res)=>{
    const result = await productController.createProduct(req, res);
});

router.put("/:pid", utilInstance.adminValidation, async (req, res)=>{
    const result = await productController.updateProduct(req, res);
});

router.delete("/:pid", utilInstance.adminValidation, async (req, res)=>{
    const result = await productController.deleteProduct(req, res);
});

export default router;