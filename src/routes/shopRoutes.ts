import { Router } from "express";

const shopController = require("../controllers/shopController");

const router = Router();

router.get("/shops", shopController.getAllShops);

router.get(`/shops/:shopId`, shopController.getOneShop);

router.post("/shops/create", shopController.create_shop);

router.put("/shops/edit", shopController.update_shop);

router.delete("/shops/:shopId", shopController.delete_shop);

module.exports = router;
