"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const ShopSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
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
    location: String,
    photoUrl: String,
    ShopCategories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'ShopCategory',
        },
    ],
    Products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
    ],
    resetToken: String,
    resetTokenExpiration: Date,
}, { timestamps: true });
exports.Shop = (0, mongoose_1.model)('Shop', ShopSchema);
