"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.JobRequestStatus = exports.ResponseType = exports.ReportedType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["customer"] = "Customer";
    Role["worker"] = "Worker";
    Role["shop"] = "Shop";
})(Role || (exports.Role = Role = {}));
var ReportedType;
(function (ReportedType) {
    ReportedType["worker"] = "Worker";
    ReportedType["shop"] = "Shop";
})(ReportedType || (exports.ReportedType = ReportedType = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["accept"] = "Accept";
    ResponseType["reject"] = "Reject";
})(ResponseType || (exports.ResponseType = ResponseType = {}));
var JobRequestStatus;
(function (JobRequestStatus) {
    JobRequestStatus["pending"] = "Pending";
    JobRequestStatus["accepted"] = "Accepted";
    JobRequestStatus["rejected"] = "Rejected";
})(JobRequestStatus || (exports.JobRequestStatus = JobRequestStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["pending"] = "Pending";
    OrderStatus["accepted"] = "Accepted";
    OrderStatus["rejected"] = "Rejected";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
