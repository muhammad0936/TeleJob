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
const types_1 = require("../../util/types");
let shop = class shop {
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop = yield models_1.Shop.exists({ _id: req.userId });
            if (!shop)
                throw new customError_1.CustomError('Unauthorized!', 401);
            const orders = yield models_1.Order.find({ shop: req.userId })
                .select('_id description status totalPrice products')
                .populate({ path: 'worker', select: 'name' });
            res.status(200).json({ message: 'Your orders: ', orders });
        });
    }
    respondToOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId } = req.params;
            var { responseType } = req.body;
            responseType = responseType.toLowerCase();
            if (responseType !== 'accept' && responseType !== 'reject')
                throw new customError_1.CustomError("Use valid response type, Either 'Accept' or 'Reject'.!", 400);
            const order = yield models_1.Order.findById(orderId);
            if (!order)
                throw new customError_1.CustomError('Order not found!', 404);
            const shop = yield models_1.Shop.findById(req.userId);
            if (!shop || order.shop.toString() !== shop._id.toString())
                throw new customError_1.CustomError('Unauthorized!', 401);
            //************** */
            if (order.status === types_1.OrderStatus.rejected)
                throw new customError_1.CustomError('You already rejected this order!', 400);
            if (order.status === types_1.OrderStatus.accepted)
                throw new customError_1.CustomError('You already accepted this order!', 400);
            if (+order.endDate < Date.now())
                throw new customError_1.CustomError('This order has expired!', 410);
            order.status = types_1.OrderStatus[`${responseType}ed`];
            order.endDate =
                responseType === 'accept'
                    ? new Date(Date.now() + 1800000) //30minutes to deliver the order
                    : new Date(Date.now());
            yield order.save();
            res.status(201).json({ message: `The order ${responseType}ed.` });
        });
    }
};
__decorate([
    catchError_1.catchError,
    (0, decorators_1.get)('/orders'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], shop.prototype, "getOrders", null);
__decorate([
    catchError_1.catchError,
    (0, decorators_1.put)('/order/:orderId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], shop.prototype, "respondToOrder", null);
shop = __decorate([
    (0, decorators_1.controller)('/shop')
], shop);
