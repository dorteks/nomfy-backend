import { Router } from "express";
const productController = require("../controllers/productController");

const router = Router();

router.get("/products", productController.getAllProducts);

router.post("/products/create", productController.create_product);

router.post("/products/edit", productController.update_product);

router.post("/products/delete", productController.delete_product);

module.exports = router;
