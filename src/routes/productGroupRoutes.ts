import { Router } from "express";
const productGroupController = require("../controllers/productGroupController");

const router = Router();

router.get("/groups", productGroupController.getAllProductGroups);

router.post("/groups/create", productGroupController.create_productGroup);

router.post("/groups/update", productGroupController.update_productGroup);

router.post("/groups/delete", productGroupController.delete_productGroup);

module.exports = router;
