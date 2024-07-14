"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCategory = void 0;
const mongoose_1 = require("mongoose");
const ShopCategorySchema = new mongoose_1.Schema({
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
exports.ShopCategory = (0, mongoose_1.model)('ShopCategory', ShopCategorySchema);
