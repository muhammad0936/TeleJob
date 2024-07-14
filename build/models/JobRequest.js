"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRequest = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../util/types");
const { ObjectId } = mongoose_1.Schema.Types;
const RequestSchema = new mongoose_1.Schema({
    customer: {
        type: ObjectId,
        requierd: true,
        ref: 'Customer',
        index: true,
    },
    worker: {
        type: ObjectId,
        requierd: true,
        ref: 'Worker',
        index: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    imagesUrls: [String],
    status: {
        type: String,
        enum: types_1.JobRequestStatus,
        default: 'Pending',
        required: true,
    },
    JobCategories: [
        {
            type: ObjectId,
            ref: 'JobCategory',
        },
    ],
    endDate: { type: mongoose_1.Schema.Types.Date, default: Date.now() + 43200000 },
}, { timestamps: true });
exports.JobRequest = (0, mongoose_1.model)('JobRequest', RequestSchema);
