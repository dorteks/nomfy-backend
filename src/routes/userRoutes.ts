import Router from "express";
const userController = require("../controllers/userController");

const router = Router();

router.get("/", userController.getAllUsers);

router.post("/login", userController.login);

router.post("/signup", userController.signup);

router.post("/signup/verify", userController.verifySignUpOtp);

router.post("/forgot_password", userController.forgot_password);

router.post("/create-OTP", userController.create_OTP);

router.post("/verify-OTP", userController.verify_OTP);

router.post("/profile-update", userController.updateUserProfile);

module.exports = router;
