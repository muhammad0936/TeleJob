"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCategory = void 0;
const mongoose_1 = require("mongoose");
const JobCategorySchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.JobCategory = (0, mongoose_1.model)('JobCategory', JobCategorySchema);
