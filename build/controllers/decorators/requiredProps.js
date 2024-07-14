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
exports.requiredProps = void 0;
require("reflect-metadata");
const customError_1 = require("../../interfaces/customError");
function requiredProps(...keys) {
    return function (target, key, desc) {
        const method = desc.value;
        desc.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const req = args[0];
                const missedProperties = [];
                for (let requiredProperty of keys) {
                    if (!req.body[requiredProperty]) {
                        missedProperties.push(`{ ${requiredProperty} } property is missing!`);
                    }
                }
                if (missedProperties[0]) {
                    const error = new customError_1.CustomError('Required data is missing!');
                    error.statusCode = 400;
                    error.data = missedProperties;
                    throw error;
                }
                yield method(...args);
            });
        };
    };
}
exports.requiredProps = requiredProps;
