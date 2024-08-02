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
const isAuth_1 = require("../../middlewares/isAuth");
const models_1 = require("../../models");
let shopCategory = class shopCategory {
    getShopCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (req.role !== Role.admin) {
            //   const error = new CustomError('Unauthorized!');
            //   error.statusCode = 401;
            //   throw error;
            // }
            const shopCategories = yield models_1.ShopCategory.find().select('_id name description');
            res.status(200).json({ message: 'Shop categories: ', shopCategories });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/shopCategories'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], shopCategory.prototype, "getShopCategories", null);
shopCategory = __decorate([
    (0, decorators_1.controller)('')
], shopCategory);
