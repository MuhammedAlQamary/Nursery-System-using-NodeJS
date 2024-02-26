const { body, param, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports.createTeacherValid = [
  body("fullname")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("fullname must be a string and between 3 and 30 characters"),
  body("password")
    .isString()
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be a string and between 8 and 30 characters"),
  body("email").isEmail().withMessage("email must be a valid email"),
];

exports.updateTeacherValid = [
  body("fullname")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("fullname must be a string and between 3 and 30 characters"),
  body("password")
    .isString()
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be a string and between 8 and 30 characters"),
  body("email").isEmail().withMessage("email must be a valid email"),
];

exports.getTeacherbyIdValid = [
  param("id").notEmpty().isMongoId().withMessage("id must be a valid id"),
  //.isNumeric().withMessage("id must be a number"),
];

exports.deleteTeacherValid = [
  body("id").notEmpty().isMongoId().withMessage("id must be a number"),
  // param("id").notEmpty().isMongoId().withMessage("id must be a number"),
];

exports.getAllTeachersValid = [];

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

  // let errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   let error = new Error();
  //   error.status = 422;
  //   error.message = errors
  //     .array()
  //     .reduce((prev, curr) => (prev += curr.msg + " "), "");
  //   throw error;
  // }
  //     const errors = validator.validationResult(req);
  //   if (errors.isEmpty()) return next();
  //   res.status(400).json({ errors: errors.array().reduce((acc, cur) => {
  //     acc[cur.param] = cur.msg;
  //     return acc;
  //   }, {})
  // });
};

// Path: Middlewares/Validation/childValidator.js
