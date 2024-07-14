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
const catchError_1 = require("../decorators/catchError");
const models_1 = require("../../models");
const isAuth_1 = require("../../middlewares/isAuth");
let shop = class shop {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price } = req.body;
            const shop = yield models_1.Shop.findById(req.userId).populate('Products');
            if (!shop)
                throw new customError_1.CustomError('Unauthorized!', 401);
            let imagesUrls = [];
            const files = req.files;
            if (!files[0])
                throw new customError_1.CustomError('Provide one image at least!', 400);
            for (let file of files) {
                if (file.path)
                    imagesUrls.push(file.path);
            }
            const product = new models_1.Product({ name, description, price, imagesUrls });
            yield product.save();
            shop.Products.push(product._id);
            yield shop.save();
            res.status(201).json({ message: 'Product created successfully' });
        });
    }
};
__decorate([
    catchError_1.catchError,
    (0, decorators_1.requiredProps)('name', 'description', 'price'),
    (0, decorators_1.post)('/product'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], shop.prototype, "addProduct", null);
shop = __decorate([
    (0, decorators_1.controller)('/shop')
], shop);
