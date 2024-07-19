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
const models_1 = require("../../models");
let worker = class worker {
    getShops(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shops = yield models_1.Shop.find().select('_id name phone description address photoUrl');
            res.status(200).json({ message: 'Shops: ', shops });
        });
    }
    getSingleShop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shopId } = req.params;
            const shop = yield models_1.Shop.findById(shopId)
                .populate({ path: 'ShopCategories', select: 'name' })
                .select('-password -resetToken -resetTokenExpiration -password -Products -updatedAt -__v ');
            if (!shop)
                throw new customError_1.CustomError('Shop not found!', 404);
            res.status(200).json({ message: 'Shop: ', shop });
        });
    }
    getShopProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shopId } = req.params;
            const shop = yield models_1.Shop.findById(shopId).populate({
                path: 'Products',
                select: 'name description price imagesUrls',
            });
            if (!shop)
                throw new customError_1.CustomError('Shop not found!', 404);
            if (!shop.Products[0])
                res
                    .status(404)
                    .json({ message: 'No products from this shop!', products: [] });
            console.log(shop.Products);
            res
                .status(200)
                .json({ message: 'Shop products: ', products: shop.Products });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/shops'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getShops", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/shop/:shopId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getSingleShop", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/shopProducts/:shopId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getShopProducts", null);
worker = __decorate([
    (0, decorators_1.controller)('/worker')
], worker);
