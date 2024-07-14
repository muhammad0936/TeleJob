"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportType = void 0;
const mongoose_1 = require("mongoose");
const ReportTypetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    reportedType: {
        type: String,
        enum: ['Worker', 'Shop'],
        required: true,
    },
}, { timestamps: true });
exports.ReportType = (0, mongoose_1.model)('ReportType', ReportTypetSchema);
