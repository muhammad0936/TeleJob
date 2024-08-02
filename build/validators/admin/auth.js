"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Enter a valid email!'),
    (0, express_validator_1.body)('password').isString().isLength({ min: 5, max: 20 }).trim().withMessage('Password must be with 5=>20 length!')
];
