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
let customer = class customer {
    getWorkers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const workers = yield models_1.Worker.find().select('_id name description address');
            res.status(200).json({ message: 'Workers: ', workers });
        });
    }
    getSingleWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { workerId } = req.params;
            const worker = yield models_1.Worker.findById(workerId)
                .populate({ path: 'JobCategories', select: 'name' })
                .select('-createdAt -updatedAt -__v -password');
            if (!worker)
                throw new customError_1.CustomError('Worker not found!', 404);
            res.status(200).json({
                message: 'Worker info: ',
                worker,
            });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/workers')
    // @use(isAuth)
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], customer.prototype, "getWorkers", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/worker/:workerId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], customer.prototype, "getSingleWorker", null);
customer = __decorate([
    (0, decorators_1.controller)('/customer')
], customer);
