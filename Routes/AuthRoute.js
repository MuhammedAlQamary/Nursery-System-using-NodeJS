const express = require("express");
const router = express.Router();

const authController = require("../Controllers/authController");

// user login
// user change password
// signup user
// user logout

router.route("/login").post(authController.login);

router.route("/signup").post(authController.signup);

router.route("/changePassword")
  .put(authController.changePassword);

module.exports = router;
