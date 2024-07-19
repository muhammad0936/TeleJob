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
    getJobRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const workerId = req.userId;
            const worker = yield models_1.Worker.findById(workerId);
            if (!worker)
                throw new customError_1.CustomError('worker not found!', 404);
            const requests = yield models_1.JobRequest.find({ worker: workerId })
                .select('_id jobDescription status')
                .populate({ path: 'customer', select: 'name' })
                .populate({ path: 'JobCategories', select: 'name' });
            res.status(200).json({ message: 'Recieved job requests: ', requests });
        });
    }
    getSingleRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const workerId = req.userId;
            const { requestId } = req.params;
            const worker = yield models_1.Worker.findById(workerId);
            if (!worker)
                throw new customError_1.CustomError('worker not found!', 404);
            const request = yield models_1.JobRequest.findById(requestId)
                .populate({ path: 'customer', select: 'name' })
                .populate({ path: 'JobCategories', select: 'name' })
                .select('jobDescription imagesUrls status createdAt');
            if (!request)
                throw new customError_1.CustomError('Job request not found!', 404);
            const endDate = new Date(request.createdAt.getTime() + 43200000);
            const returnedRequest = { _doc: {} };
            Object.assign(returnedRequest, request);
            res.status(200).json({
                message: 'Job request information: ',
                request: Object.assign(Object.assign({}, returnedRequest._doc), { endDate }),
            });
        });
    }
    respondToRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { responseType } = req.body;
            const { requestId } = req.params;
            responseType = responseType.toLowerCase();
            console.log(Object.keys(types_1.ResponseType));
            if (responseType !== 'accept' && responseType !== 'reject')
                throw new customError_1.CustomError("Use valid response type, Either 'Accept' or 'Reject'.", 422);
            const jobRequest = yield models_1.JobRequest.findById(requestId);
            if (!jobRequest)
                throw new customError_1.CustomError('Job request not found!', 404);
            if (jobRequest.status === types_1.JobRequestStatus.rejected)
                throw new customError_1.CustomError('You already rejected this request!', 400);
            if (jobRequest.status === types_1.JobRequestStatus.accepted)
                throw new customError_1.CustomError('You already accepted this request!', 400);
            if (+jobRequest.endDate < Date.now())
                throw new customError_1.CustomError('This job request is expired!', 410);
            jobRequest.status = types_1.JobRequestStatus[`${responseType}ed`];
            jobRequest.endDate =
                responseType === 'accept'
                    ? new Date(Date.now() + 7200000) //2hours to start the work
                    : new Date(Date.now());
            yield jobRequest.save();
            res.status(201).json({ message: `Job request ${responseType}ed.` });
        });
    }
};
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/requests'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getJobRequests", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.get)('/request/:requestId'),
    (0, decorators_1.use)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "getSingleRequest", null);
__decorate([
    decorators_1.catchError,
    (0, decorators_1.put)('/request/:requestId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], worker.prototype, "respondToRequest", null);
worker = __decorate([
    (0, decorators_1.controller)('/worker')
], worker);
