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
const mongoose_1 = require("mongoose");
const customError_1 = require("../../interfaces/customError");
const models_1 = require("../../models");
const isAuth_1 = require("../../middlewares/isAuth");
const { ObjectId } = mongoose_1.Types;
let worker = class worker {
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop = yield models_1.Shop.findById(req.userId)
                .populate({ path: 'ShopCategories', select: 'name' })
                .select('name email description phone address photoUrl');
            if (!shop)
                throw new customError_1.CustomError('Not authenticated!', 401);
            res.status(200).json({ message: 'Profile data: ', shop });
        });
    }
    editProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, phone, address, description, addedShopCategories, deletedShopCategories, } = req.body;
            // if string convert it to an array
            if (typeof addedShopCategories !== 'object')
                addedShopCategories = addedShopCategories ? [addedShopCategories] : [];
            if (typeof deletedShopCategories !== 'object') {
                deletedShopCategories = deletedShopCategories
                    ? [deletedShopCategories]
                    : [];
            }
            const shop = yield models_1.Shop.findById(req.userId);
            if (!shop)
                throw new customError_1.CustomError('Not authenticated!', 401);
            shop.name = name || shop.name;
            shop.phone = phone || shop.phone;
            shop.address = address || shop.address;
            shop.description = description || shop.description;
            const ShopCategoriesPromises = addedShopCategories.map((sc) => __awaiter(this, void 0, void 0, function* () {
                const isScExists = yield models_1.ShopCategory.exists({ _id: sc });
                if (!isScExists)
                    throw new customError_1.CustomError('Some added shop categoris not found, Check the provided IDs!', 400);
            }));
            yield Promise.all(ShopCategoriesPromises);
            console.log(deletedShopCategories);
            deletedShopCategories.map((sc) => {
                const _id = new ObjectId(sc);
                if (!shop.ShopCategories.includes(_id))
                    throw new customError_1.CustomError('Some deleted shop categoris not found, Check the provided IDs!', 400);
            });
            shop.ShopCategories = shop.ShopCategories.concat(addedShopCategories);
            shop.ShopCategories = shop.ShopCategories.filter((jc) => !deletedShopCategories.includes(jc.toString()));
            const files = req.files;
            if (files[0])
                shop.photoUrl = files[0].path;
            yield shop.save();
            res.status(201).json({ message: 'Profile updated.' });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/profile'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getProfile", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.put)('/profile'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], worker.prototype, "editProfile", null);
worker = __decorate([
    (0, decorators_1.controller)('/shop')
], worker);
