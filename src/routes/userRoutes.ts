import Router from "express";
const userController = require("../controllers/userController");

const router = Router();

router.get("/", userController.getAllUsers);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/forgot_password", userController.forgot_password);

router.post("/create-OTP", userController.create_OTP);

router.post("/verify-OTP", userController.verify_OTP);

module.exports = router;
