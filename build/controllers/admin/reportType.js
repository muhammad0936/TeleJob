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
const isAuth_1 = require("../../middlewares/isAuth");
const models_1 = require("../../models");
const types_1 = require("../../util/types");
let reportType = class reportType {
    addReportType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, description, reportedType } = req.body;
            reportedType = reportedType.toLowerCase();
            if (reportedType !== 'worker' && reportedType !== 'shop') {
                const error = new customError_1.CustomError('Reported type is not valid!');
                error.statusCode = 422;
                throw error;
            }
            reportedType = types_1.ReportedType[reportedType];
            const reportType = new models_1.ReportType({ name, description, reportedType });
            yield reportType.save();
            res.status(201).json({ message: 'Report type added successfully.' });
        });
    }
    getReportTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('hiiiiiiiiiiiii');
            const reportTypes = yield models_1.ReportType.find();
            if (!reportTypes[0]) {
                res
                    .status(404)
                    .json({ message: 'No report types to show!', reportTypes: [] });
                return;
            }
            res.status(200).json({ message: 'Report types: ', reportTypes });
        });
    }
    editReportTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.reportedType = req.body.reportedType.toLowerCase();
            if (req.body.reportedType !== 'worker' &&
                req.body.reportedType !== 'shop') {
                const error = new customError_1.CustomError('Reported type is not valid!');
                error.statusCode = 422;
                throw error;
            }
            req.body.reportedType =
                types_1.ReportedType[req.body.reportedType];
            const { reportTypeId } = req.params;
            const reportType = yield models_1.ReportType.findById(reportTypeId);
            if (!reportType) {
                const error = new customError_1.CustomError('Report type not found!');
                error.statusCode = 404;
                throw Error;
            }
            for (const key in req.body) {
                if (req.body[key])
                    reportType[key] = req.body[key];
            }
            yield reportType.save();
            res.status(201).json({ message: 'Report type updated successfully.' });
        });
    }
    deleteReportType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reportTypeId } = req.params;
            const reportType = yield models_1.ReportType.findByIdAndDelete(reportTypeId);
            if (!reportType) {
                const error = new customError_1.CustomError('Report type not found!');
                error.statusCode = 404;
                throw error;
            }
            res.status(201).json({ message: 'Report type deleted successfully.' });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.requiredProps)('name', 'description', 'reportedType'),
    (0, decorators_1.post)('/reportType'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], reportType.prototype, "addReportType", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/reportTypes'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], reportType.prototype, "getReportTypes", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.put)('/reportType/:reportTypeId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], reportType.prototype, "editReportTypes", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.del)('/reportType/:reportTypeId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], reportType.prototype, "deleteReportType", null);
reportType = __decorate([
    (0, decorators_1.controller)('/admin')
], reportType);
