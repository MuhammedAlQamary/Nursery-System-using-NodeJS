const { validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return next(errors.array());
};



// Path: Middlewares/Validation/childValidator.js
