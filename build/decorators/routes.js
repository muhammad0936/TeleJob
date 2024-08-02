"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
const methods_1 = require("./methods");
const metadataKeys_1 = require("./metadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(metadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(metadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(methods_1.Methods.get);
exports.put = routeBinder(methods_1.Methods.put);
exports.post = routeBinder(methods_1.Methods.post);
exports.del = routeBinder(methods_1.Methods.del);
exports.patch = routeBinder(methods_1.Methods.patch);
