import { Router } from "express";
const productCategoryController = require("../controllers/productCategoryController");

const router = Router();

router.get("/categories", productCategoryController.getAlProductCategories);

router.post(
  "/categories/create",
  productCategoryController.create_productCategory
);

router.post(
  "/categories/update",
  productCategoryController.update_productCategory
);

router.delete(
  "/categories/delete",
  productCategoryController.delete_productCategory
);

module.exports = router;
