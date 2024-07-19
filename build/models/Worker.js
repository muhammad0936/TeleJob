"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const WorkerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: { type: String, default: '' },
    location: {
        type: String,
    },
    JobCategories: [
        {
            type: ObjectId,
            ref: 'JobCategory',
        },
    ],
    resetToken: String,
    resetTokenExpiration: Date,
}, { timestamps: true });
exports.Worker = (0, mongoose_1.model)('Worker', WorkerSchema);
