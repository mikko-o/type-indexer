"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressReporter = void 0;
var ProgressReporter = /** @class */ (function () {
    function ProgressReporter(start, end, reportInterval) {
        this.lastReported = 0;
        this.start = start;
        this.current = start;
        this.end = end;
        this.reportInterval = reportInterval;
        this.report();
    }
    ProgressReporter.prototype.update = function (current, end) {
        if (end)
            this.end = end;
        this.current = current;
        if (this.current > this.lastReported + this.reportInterval || this.current >= this.end) {
            this.report();
            this.lastReported = current;
        }
    };
    ProgressReporter.prototype.report = function () {
        var p = Math.round((this.current / this.end) * 10000) / 100;
        console.log("".concat(p, " % (").concat(this.current, " / ").concat(this.end, ")"));
    };
    return ProgressReporter;
}());
exports.ProgressReporter = ProgressReporter;
