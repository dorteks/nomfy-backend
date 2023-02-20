import { Router } from "express";
const addressController = require("../controllers/addressController");

const router = Router();

router.get("/address", addressController.getAllAddress);

router.get("/address/:addressId", addressController.getOneAddress);

router.post("/address/create", addressController.createAddress);

router.post("/address/update", addressController.updateAddress);

router.delete("/address/:addressId", addressController.deleteAddress);

module.exports = router;
