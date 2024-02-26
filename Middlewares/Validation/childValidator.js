const validator = require("express-validator");
const { body, param  } = require("express-validator");

exports.createChildValid = [
  body("fullname").notEmpty().isString().isLength({ min: 3, max: 30 }).withMessage("fullname must be a string and between 3 and 30 characters"),
  body("age").optional().isNumeric().isLength({ min: 1, max: 16 }).withMessage("age must be a number and between 1 and 16"),
  body("level").notEmpty().isString().notEmpty().isIn(["Prekg", "Kg1", "Kg2"]).withMessage("level must be a string and one of Prekg, Kg1, Kg2"),
  body("address.city").notEmpty().isString().isLength({ min: 3, max: 30 }).withMessage("city must be a string and between 3 and 30 characters"),
  body("address.street").notEmpty().isString().isLength({ min: 3, max: 30 }).withMessage("street must be a string and between 3 and 30 characters"),
  body("address.building").notEmpty().isString().isLength({ min: 3, max: 30 }).withMessage("building must be a string and between 3 and 30 characters"),
];

exports.updateChildValid = [
  body("fullname")
    .optional()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("fullname must be a string and between 3 and 30 characters"),
  body("age")
    .optional()
    .isNumeric()
    .isLength({ min: 1, max: 16 })
    .withMessage("age must be a number and between 1 and 16"),
  body("level")
    .optional()
    .isString()
    .notEmpty()
    .isIn(["Prekg", "Kg1", "Kg2"])
    .withMessage("level must be a string and one of Prekg, Kg1, Kg2"),
  body("address.city")
    .optional()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("city must be a string and between 3 and 30 characters"),
  body("address.street")
    .optional()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("street must be a string and between 3 and 30 characters"),
  body("address.building")
    .optional()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("building must be a string and between 3 and 30 characters"),
];

exports.getChildbyIdValid = [param("id").notEmpty().isNumeric()];

exports.deleteChildValid = [param("id").notEmpty().isNumeric()];

exports.getAllChildrenValid = [];

exports.validate = (req, res, next) => {
    const errors = validator.validationResult(req);
  if (errors.isEmpty()) return next();
  res.status(400).json({ errors: errors.array() });
};

// Path: Middlewares/Validation/teacherValidator.js
