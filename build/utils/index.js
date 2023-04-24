"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
var sleep = function (t) { return new Promise(function (resolve) {
    setTimeout(function () {
        resolve();
    }, t);
}); };
exports.sleep = sleep;
