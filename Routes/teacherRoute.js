const express = require("express");
const router = express.Router();

const teacherController = require("../Controllers/teacherController");
const validate = require("../Middlewares/Validation/teacherValidator");

router
  .route("/teachers")
  .get(
    validate.getAllTeachersValid,
    validate.validMSG,
    teacherController.getAllTeachers
  )
  .post(
    validate.createTeacherValid,
    validate.validMSG,
    teacherController.createTeacher
  )
  .put(
    validate.updateTeacherValid,
    validate.validMSG,
    teacherController.updateTeacher
  )
  .delete(
    validate.deleteTeacherValid,
    validate.validMSG,
    teacherController.deleteTeacher
  );

router.get(
  "/teachers/:id",
  validate.getTeacherbyIdValid,
  validate.validMSG,
  teacherController.getTeacherById
);

router.get("/teachers/supervisors", teacherController.getSupervisors);

module.exports = router;

/*
router.get("/teacher", (req, res, next) => {
  res.status(200).json({ data: {}, message: "get all teachers" });
});

router.get("/teacher/:id", (req, res, next) => {
  res.status(200).json({ data: {}, message: "get one teacher" });
});

router.post("/teacher", (req, res, next) => {
  res.status(201).json({ data: {}, message: "create teacher" });
});

router.put("/teacher/:id", (req, res, next) => {
  res.status(200).json({ data: {}, message: "update teacher" });
});

router.delete("/teacher/:id", (req, res, next) => {
  res.status(200).json({ data: {}, message: "delete teacher" });
});

module.exports = router;
*/
