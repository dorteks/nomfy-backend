import { Router } from "express";
const addressController = require("../controllers/addressController");

const router = Router();

router.get("/address", addressController.getAllAddress);

router.post("/address/create", addressController.createAddress);

router.post("/address/update", addressController.updateAddress);

router.post("/address/delete", addressController.deleteAddress);

module.exports = router;
