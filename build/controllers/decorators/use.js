"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const metadataKeys_1 = require("./metadataKeys");
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(metadataKeys_1.MetadataKeys.middleware, target, key) || [];
        Reflect.defineMetadata(metadataKeys_1.MetadataKeys.middleware, [...middlewares, middleware], target, key);
    };
}
exports.use = use;
