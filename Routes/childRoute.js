const express = require("express");
const { body, param } = require("express-validator");

const router = express.Router();

const childController = require("../Controllers/childController");
const valid = require("../Middlewares/Validation/childValidator");

// const validate = require("../Middlewares/validateMW");

router
  .route("/child")
  .get(valid.getAllChildrenValid,valid.validate, childController.getAllChildren)
  .post(valid.createChildValid,valid.validate , childController.createChild)
  .put(valid.updateChildValid,valid.validate, childController.updateChild)
  .delete(valid.deleteChildValid,valid.validate, childController.deleteChild);

router.get("/child/:id", valid.getChildbyIdValid, childController.getChildbyId);

module.exports = router;
