const { body, param , validationResult } = require("express-validator");

exports.createClassValid = [
    body("name").notEmpty().isString().isLength({ min: 3, max: 30 }).withMessage("name must be a string and between 3 and 30 characters"),
    body("supervisor").notEmpty().isNumeric().withMessage("supervisor must be a number"),
    body("children").optional().isArray().withMessage("children must be an array"),
];

exports.updateClassValid = [
    body("name").optional().isString().isLength({ min: 3, max: 30 }).withMessage("name must be a string and between 3 and 30 characters"),
    body("supervisor").optional().isNumeric().withMessage("supervisor must be a number"),
    body("children").optional().isArray().withMessage("children must be an array"),
];

exports.getClassbyIdValid = [param("id").notEmpty().isNumeric().withMessage("id must be a number")]
exports.deleteClassValid = [body("id").notEmpty().isNumeric().withMessage("id must be a number")]
exports.getAllClassesValid = []

exports.validMSG = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  console.log(req.body);
  if (errors.isEmpty()) return next();
  res.status(400).json({
    errors: errors.array().reduce((acc, cur) => {
      acc[cur.param] = cur.msg;
      return acc;
    }, {}),
  });
}

// Path: Middlewares/Validation/teacherValidator.js