const {body , validationResult} = require('express-validator');

async function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
const registerUserValidationRules = [
    body('username').isString().isLength({ min: 3 , max: 20}).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateRequest
]
    
module.exports = {
    registerUserValidationRules
}   