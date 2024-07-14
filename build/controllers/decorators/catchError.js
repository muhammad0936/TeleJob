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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const fs_1 = __importDefault(require("fs"));
function catchError(target, key, desc) {
    const method = desc.value;
    desc.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const next = args[args.length - 1];
            try {
                yield method(...args);
            }
            catch (err) {
                if (args[0].files) {
                    const files = args[0].files;
                    files.map((file) => {
                        fs_1.default.unlink(file.path, (err) => {
                            if (err)
                                console.log(err);
                        });
                    });
                }
                if (!err.statusCode && !err[0])
                    err.statusCode = 500;
                next(err);
            }
        });
    };
}
exports.catchError = catchError;
