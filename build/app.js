"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const multer_1 = __importDefault(require("multer"));
require("./controllers/customer");
require("./controllers/worker");
require("./controllers/shop");
require("./controllers/admin");
require("./controllers/sharedEndPoints");
const router_1 = require("./router");
const customError_1 = require("./interfaces/customError");
const mongoose_1 = require("mongoose");
const app = (0, express_1.default)();
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    },
});
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        const error = new customError_1.CustomError('You are trying to upload files which are not images, Upload just images with png, jpg, or jpeg extention.');
        error.statusCode = 422;
        cb(error);
    }
};
app.use((0, body_parser_1.urlencoded)());
app.use((0, body_parser_1.json)());
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter: filter }).array('images', 5));
app.use(router_1.AppRouter.getInstance());
app.use('/', (req, res, next) => {
    res.status(404).send('Page not found!');
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode).json({
        message: `An error occured: ${err.message}`,
        data: err.data,
    });
});
try {
    (0, mongoose_1.connect)(process.env.MONGO_URI || '', {})
        .then((resule) => {
        console.log('Connected successfully');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`App listening on port ${process.env.PORT || 3000}.`);
        });
    })
        .then((err) => {
        if (err)
            console.log('connection to the database failed!');
    });
}
catch (err) {
    console.log(err);
}
