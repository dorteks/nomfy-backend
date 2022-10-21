import { Router } from "express";
const productCategoryController = require("../controllers/productCategoryController");

const router = Router();

router.get(
  "/productCategory",
  productCategoryController.getAlProductCategories
);

router.post(
  "/productCategory/create",
  productCategoryController.create_productCategory
);

router.post(
  "/productCategory/update",
  productCategoryController.update_productCategory
);

router.post(
  "/productCategory/delete",
  productCategoryController.delete_productCategory
);

module.exports = router;
