import { Router } from "express";
const shopController = require("../controllers/shopController");

const router = Router();

router.get("/shops", shopController.getAllShops);

router.post("/shops/create_shop", shopController.create_shop);

router.post("/shops/update_shop", shopController.update_shop);

router.post("/shops/delete_shop", shopController.delete_shop);

module.exports = router;
