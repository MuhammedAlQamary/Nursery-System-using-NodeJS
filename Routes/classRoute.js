const express = require("express");
const router = express.Router();

const validator = require("../Middlewares/Validation/classValidator");

const classController = require("../Controllers/classController");

router
  .route("/class")
  .get(validator.getAllClassesValid, validator.validMSG, classController.getAllClasses)
  .post(validator.createClassValid, validator.validMSG,classController.createClass)
  .put(validator.updateClassValid, validator.validMSG,classController.updateClass)
  .delete(validator.deleteClassValid, validator.validMSG,classController.deleteClass);

router.get("/class/:id", validator.getClassbyIdValid, validator.validMSG, classController.getClassById);

router.get("/class/child/:id", classController.getChildClass);

router.get("/class/teacher/:id", classController.getSupervisorClass);

module.exports = router;
