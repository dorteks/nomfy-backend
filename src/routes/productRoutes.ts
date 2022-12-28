import { Router } from "express";
const productController = require("../controllers/productController");

const router = Router();

router.get("/products", productController.getAllProducts);

router.get("/products/:productId", productController.getOneProduct);

router.post("/products/create", productController.create_product);

router.post("/products/edit", productController.update_product);

router.delete("/products/:productId", productController.delete_product);

module.exports = router;
