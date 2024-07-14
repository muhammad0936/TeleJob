"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const customError_1 = require("../interfaces/customError");
const isAuth = (req, res, next) => {
    try {
        let jwt = req.get('Authorization') || '';
        if (!jwt) {
            const error = new customError_1.CustomError('Not authenticated!');
            error.statusCode = 401;
            throw error;
        }
        jwt = jwt.split(' ')[1];
        const payload = (0, jsonwebtoken_1.verify)(jwt, process.env.jwt_secrete_string);
        if (!payload) {
            const error = new customError_1.CustomError('Not authenticated!');
            error.statusCode = 401;
            throw error;
        }
        const jwtPayload = payload;
        req.userId = jwtPayload.userId;
        req.role = jwtPayload.role;
        next();
    }
    catch (err) {
        const error = new customError_1.CustomError(err.message || 'Not authenticated!', err.statusCode || 401);
        next(error);
    }
};
exports.isAuth = isAuth;
