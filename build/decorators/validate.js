"use strict";
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
exports.validate = void 0;
require("reflect-metadata");
const metadataKeys_1 = require("./metadataKeys");
const express_validator_1 = require("express-validator");
function validate(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(metadataKeys_1.MetadataKeys.middleware, target, key) || [];
        Reflect.defineMetadata(metadataKeys_1.MetadataKeys.middleware, [...middlewares, middleware], target, key);
        const method = desc.value;
        desc.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const next = args[args.length - 1];
                try {
                    const req = args[0];
                    const result = (0, express_validator_1.validationResult)(req);
                    if (!result.isEmpty()) {
                        console.log(result.array());
                        throw result.array().map((i) => {
                            return { message: i.msg, path: i.type, statusCode: 422 };
                        });
                    }
                }
                catch (err) {
                    next(err);
                }
                yield method(...args);
            });
        };
    };
}
exports.validate = validate;
