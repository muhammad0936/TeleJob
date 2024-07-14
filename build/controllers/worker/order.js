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
const isAuth_1 = require("../../middlewares/isAuth");
const types_1 = require("../../util/types");
let worker = class worker {
    order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const worker = yield models_1.Worker.findById(req.userId);
            if (!worker)
                throw new customError_1.CustomError('Unauthorized!', 401);
            const { shopId, description } = req.body;
            const shop = yield models_1.Shop.findById(shopId);
            if (!shop)
                throw new customError_1.CustomError('Shop not found!', 404);
            const order = new models_1.Order({
                shop: shopId,
                worker: req.userId,
                description,
                location: '1lh4kl12j4kl1',
            });
            yield order.save();
            res.status(201).json({ message: 'Order sent successfully.' });
        });
    }
    cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId } = req.params;
            const order = yield models_1.Order.findById(orderId);
            if (!order)
                throw new customError_1.CustomError('Order not found!', 404);
            if (order.status === types_1.OrderStatus.accepted)
                throw new customError_1.CustomError('This order has already accepted!', 400);
            yield order.deleteOne();
            res.status(200).json({ message: 'Order deleted successfully.' });
        });
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const worker = yield models_1.Worker.findById(req.userId);
            if (!worker)
                throw new customError_1.CustomError('Unauthorized!', 401);
            const orders = yield models_1.Order.find({ worker: req.userId })
                .populate({ path: 'shop', select: 'name' })
                .select('_id description status totlaPrice createdAt');
            if (!orders[0])
                res.status(404).json({ message: 'No orders to show!', orders });
            res.status(200).json({ message: 'Your orders: ', orders });
        });
    }
    getSingleOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId } = req.params;
            const worker = yield models_1.Worker.findById(req.userId);
            if (!worker)
                throw new customError_1.CustomError('Unauthorized!', 401);
            const order = yield models_1.Order.findById(orderId)
                .populate({ path: 'shop', select: 'name' })
                .populate({ path: 'worker', select: 'name' })
                .select('-updatedAt -__v');
            if (!order)
                throw new customError_1.CustomError('Order not found!', 404);
            res.status(200).json({ message: 'Your orders: ', order });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.post)('/order'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    (0, decorators_1.requiredProps)('shopId', 'description'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "order", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.del)('/order/:orderId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "cancelOrder", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/orders'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getOrders", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/order/:orderId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getSingleOrder", null);
worker = __decorate([
    (0, decorators_1.controller)('/worker')
], worker);
