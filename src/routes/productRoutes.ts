import { Router } from "express";
const productController = require("../controllers/productController");

const router = Router();

router.get("/products", productController.getAllProducts);

router.post("/products/create_product", productController.create_product);

router.post("/products/update_product", productController.update_product);

router.post("/products/delete_product", productController.delete_product);

module.exports = router;
