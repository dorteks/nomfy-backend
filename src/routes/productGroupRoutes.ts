import { Router } from "express";
const productGroupController = require("../controllers/productGroupController");

const router = Router();

router.get(
  "/products/product_group",
  productGroupController.getAllProductGroups
);

router.post(
  "/products/create/product_group",
  productGroupController.create_productGroup
);

module.exports = router;
