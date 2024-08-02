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
const isAuth_1 = require("../../middlewares/isAuth");
const models_1 = require("../../models");
const types_1 = require("../../util/types");
let shopCategory = class shopCategory {
    addShopCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.role !== types_1.Role.admin) {
                const error = new customError_1.CustomError('Unauthorized!');
                error.statusCode = 401;
                throw error;
            }
            const { name, description } = req.body;
            const shopCategory = new models_1.ShopCategory({ name, description });
            yield shopCategory.save();
            res.status(201).json({ message: 'Shop category created.' });
        });
    }
    editShopCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('hiiiii');
            if (req.role !== types_1.Role.admin) {
                const error = new customError_1.CustomError('Unauthorized!');
                error.statusCode = 401;
                throw error;
            }
            const { name, description } = req.body;
            const { shopCategoryId } = req.params;
            const shopCategory = yield models_1.ShopCategory.findById(shopCategoryId);
            if (!shopCategory) {
                const error = new customError_1.CustomError('Shop category not found!');
                error.statusCode = 404;
                throw error;
            }
            shopCategory.name = name || shopCategory.name;
            shopCategory.description = description || shopCategory.description;
            yield shopCategory.save();
            res.status(201).json({ message: 'Shop category updated.' });
        });
    }
    deleteShopCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.role !== types_1.Role.admin) {
                const error = new customError_1.CustomError('Unauthorized!');
                error.statusCode = 401;
                throw error;
            }
            const { shopCategoryId } = req.params;
            const shopCategory = yield models_1.ShopCategory.findByIdAndDelete(shopCategoryId);
            if (!shopCategory) {
                const error = new customError_1.CustomError('Shop category not found!');
                error.statusCode = 404;
                throw error;
            }
            res.status(201).json({ message: 'Shop category deleted.' });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.requiredProps)('name', 'description'),
    (0, decorators_1.post)('/shopCategory'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], shopCategory.prototype, "addShopCategory", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.put)('/shopCategory/:shopCategoryId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], shopCategory.prototype, "editShopCategory", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.del)('/shopCategory/:shopCategoryId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], shopCategory.prototype, "deleteShopCategory", null);
shopCategory = __decorate([
    (0, decorators_1.controller)('/admin')
], shopCategory);
