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

router.post(
  "/products/update/product_group",
  productGroupController.update_productGroup
);

router.post(
  "/products/delete/product_group",
  productGroupController.delete_productGroup
);

module.exports = router;
