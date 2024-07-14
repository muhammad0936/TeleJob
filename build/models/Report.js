"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const reportSchema = new mongoose_1.Schema({
    customer: {
        type: ObjectId,
        index: true,
        ref: 'Customer',
    },
    worker: {
        type: ObjectId,
        index: true,
        ref: 'Worker',
    },
    shop: {
        type: ObjectId,
        index: true,
        ref: 'Shop',
    },
    jobRequest: {
        type: ObjectId,
        ref: 'JobRequest',
    },
    order: {
        type: ObjectId,
        ref: 'Order',
    },
    reportType: {
        type: ObjectId,
        ref: 'ReportType',
    },
}, { timestamps: true });
exports.Report = (0, mongoose_1.model)('Report', reportSchema);
