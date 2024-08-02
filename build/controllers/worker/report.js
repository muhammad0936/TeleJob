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
const models_1 = require("../../models");
const isAuth_1 = require("../../middlewares/isAuth");
let worker = class worker {
    getReportTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reportTypes = yield models_1.ReportType.find({
                reportedType: 'Shop',
            }).select('_id name description');
            res.status(200).json({ message: 'Report types: ', reportTypes });
        });
    }
    reportShop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shopId, orderId, reportTypeId } = req.body;
            console.log(req.userId);
            const worker = yield models_1.Worker.exists({ _id: req.userId });
            if (!worker)
                throw new customError_1.CustomError('Unauthorized!', 401);
            const shop = yield models_1.Shop.exists({ _id: shopId });
            if (!shop)
                throw new customError_1.CustomError('Shop not found!', 404);
            const order = yield models_1.Order.findById(orderId);
            if (!order)
                throw new customError_1.CustomError('Order not found!', 404);
            const reportType = yield models_1.ReportType.findById(reportTypeId).select('reportedType');
            console.log(order.shop, shop._id);
            if (order.shop.toString() !== shop._id.toString())
                throw new customError_1.CustomError('This order is not related to provided shop!', 400);
            if (!reportType)
                throw new customError_1.CustomError('Report type not found!', 404);
            if ((reportType === null || reportType === void 0 ? void 0 : reportType.reportedType) !== 'Shop')
                throw new customError_1.CustomError("Invalid report type, The reportedType field must be 'Shop'.", 422);
            const isReportExist = yield models_1.Report.exists({
                worker: req.userId,
                shop: shopId,
                order: orderId,
                reportType: reportTypeId,
            });
            if (isReportExist)
                throw new customError_1.CustomError('You already reported this shop using same report type!', 422);
            const report = new models_1.Report({
                worker: req.userId,
                shop: shopId,
                order: orderId,
                reportType: reportTypeId,
            });
            yield report.save();
            res.status(201).json({ message: 'Shop reported successfully.' });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/reportTypes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getReportTypes", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.requiredProps)('shopId', 'orderId', 'reportTypeId'),
    (0, decorators_1.post)('/report'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "reportShop", null);
worker = __decorate([
    (0, decorators_1.controller)('/worker')
], worker);
