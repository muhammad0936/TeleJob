"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const OrderSchema = new mongoose_1.Schema({
    shop: {
        type: ObjectId,
        required: true,
        ref: 'Shop',
        index: true,
    },
    worker: {
        type: ObjectId,
        required: true,
        ref: 'Worker',
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
    location: {
        type: String,
        required: true,
    },
    totalPrice: Number,
    products: [
        {
            info: String,
            price: Number,
            quantity: Number,
        },
    ],
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
