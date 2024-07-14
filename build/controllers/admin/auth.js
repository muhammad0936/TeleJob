"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators");
const customError_1 = require("../../interfaces/customError");
const jsonwebtoken_1 = require("jsonwebtoken");
const types_1 = require("../../util/types");
let adminController = class adminController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (email !== process.env.admin_account ||
                password !== process.env.admin_password) {
                const error = new customError_1.CustomError('Wrong credentials!');
                error.statusCode = 401;
                throw error;
            }
            const jwt = (0, jsonwebtoken_1.sign)({ email: email, userId: process.env.adminId, role: types_1.Role.admin }, process.env.jwt_secrete_string, { expiresIn: '24h' });
            res.status(200).json({ message: 'Loged in successfully.', JWT: jwt });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.requiredProps)('email'),
    (0, decorators_1.post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], adminController.prototype, "login", null);
adminController = __decorate([
    (0, decorators_1.controller)('/admin')
], adminController);
