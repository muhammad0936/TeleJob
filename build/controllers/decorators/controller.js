"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const router_1 = require("../../router");
const metadataKeys_1 = require("./metadataKeys");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        const router = router_1.AppRouter.getInstance();
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(metadataKeys_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(metadataKeys_1.MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(metadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            const requiredBodyProps = Reflect.getMetadata(metadataKeys_1.MetadataKeys.validator, target.prototype, key) ||
                [];
            const validator = bodyValidators(requiredBodyProps);
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
            }
        });
    };
}
exports.controller = controller;
