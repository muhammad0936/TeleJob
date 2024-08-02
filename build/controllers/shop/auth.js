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
const decorators_1 = require("../../decorators");
const customError_1 = require("../../interfaces/customError");
const catchError_1 = require("../../decorators/catchError");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const models_1 = require("../../models");
const nodemailer_1 = require("nodemailer");
let CustomerAuthController = class CustomerAuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, phone, address, description, ShopCategories, } = req.body;
            let photoUrl = '';
            if (req.files) {
                const files = req.files;
                photoUrl = files[0].path;
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 12);
            const shop = new models_1.Shop({
                email,
                password: hashedPassword,
                name,
                phone,
                address,
                description,
                ShopCategories,
                photoUrl,
            });
            yield shop.save();
            const jwt = (0, jsonwebtoken_1.sign)({
                email: shop.email,
                userId: shop._id,
            }, process.env.jwt_secrete_string, { expiresIn: '30d' });
            res.status(201).json({ message: 'Shop signed up successfully.', JWT: jwt });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const shop = yield models_1.Shop.findOne({ email });
            if (!shop) {
                const error = new customError_1.CustomError('email is not found!');
                error.statusCode = 422;
                throw error;
            }
            const isEqual = yield (0, bcrypt_1.compare)(password, shop.password);
            if (!isEqual) {
                const error = new customError_1.CustomError('Wrong password!');
                error.statusCode = 422;
                throw error;
            }
            const jwt = (0, jsonwebtoken_1.sign)({
                email: shop.email,
                userId: shop._id,
            }, process.env.jwt_secrete_string, { expiresIn: '30d' });
            res.status(200).json({ message: 'Loged in successfully.', JWT: jwt });
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const shop = yield models_1.Shop.findOne({ email });
            if (!shop)
                throw new customError_1.CustomError('No shop found with this email!', 404);
            let transporter = (0, nodemailer_1.createTransport)({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
            const resetToken = Math.floor(Math.random() * 1000000);
            shop.resetToken = `${resetToken}`;
            shop.resetTokenExpiration = new Date(Date.now() + 3600000);
            yield shop.save();
            const mailOptions = {
                from: 'TeleJob',
                to: email,
                subject: 'Reset your TeleJob shop_account password:',
                text: `Your reset_password token is: ${shop.resetToken}`,
            };
            const mailInfo = yield transporter.sendMail(mailOptions);
            res.status(200).json({
                message: 'We send a token to your email, Check it and use it to reset your password.',
            });
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, resetToken, password } = req.body;
            const shop = yield models_1.Shop.findOne({ email });
            if (!shop)
                throw new customError_1.CustomError('No shop found with this email!', 404);
            if (shop.resetToken !== resetToken)
                throw new customError_1.CustomError('Wrong reset_password token!', 422);
            if (shop.resetTokenExpiration && +shop.resetTokenExpiration < Date.now())
                throw new customError_1.CustomError('Expired reset_password token!', 422);
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 12);
            shop.password = hashedPassword;
            shop.resetToken = null;
            shop.resetTokenExpiration = null;
            yield shop.save();
            res.status(201).json({ message: 'Password updated successfully.' });
        });
    }
};
__decorate([
    catchError_1.catchError,
    (0, decorators_1.post)('/signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerAuthController.prototype, "signup", null);
__decorate([
    catchError_1.catchError,
    (0, decorators_1.post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerAuthController.prototype, "login", null);
__decorate([
    catchError_1.catchError,
    (0, decorators_1.requiredProps)('email'),
    (0, decorators_1.post)('/forgotPassword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerAuthController.prototype, "forgotPassword", null);
__decorate([
    catchError_1.catchError,
    (0, decorators_1.requiredProps)('email', 'resetToken', 'password'),
    (0, decorators_1.put)('/resetPassword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerAuthController.prototype, "resetPassword", null);
CustomerAuthController = __decorate([
    (0, decorators_1.controller)('/shop')
], CustomerAuthController);
