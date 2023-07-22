"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indexer = exports._index = void 0;
var utils_1 = require("./utils");
var ProgressReporter_1 = require("./utils/ProgressReporter");
var fs_1 = require("fs");
function _index(provider, startBlock, batchSize, task, onEnd, settings) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var currentBlock, progressReporter, _c, _d, checkpointInterval, checkpoint, _e, start, end, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    currentBlock = startBlock;
                    _c = ProgressReporter_1.ProgressReporter.bind;
                    _d = [void 0, startBlock];
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 1:
                    progressReporter = new (_c.apply(ProgressReporter_1.ProgressReporter, _d.concat([_j.sent(), (_a = settings === null || settings === void 0 ? void 0 : settings.progressReportInterval) !== null && _a !== void 0 ? _a : 500000])))();
                    checkpointInterval = (_b = settings === null || settings === void 0 ? void 0 : settings.checkpointInterval) !== null && _b !== void 0 ? _b : 1000000;
                    checkpoint = 0;
                    _j.label = 2;
                case 2:
                    _e = currentBlock;
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 3:
                    if (!(_e < (_j.sent()))) return [3 /*break*/, 8];
                    progressReporter.update(currentBlock);
                    start = currentBlock;
                    _g = (_f = Math).min;
                    _h = [currentBlock + batchSize];
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 4:
                    end = _g.apply(_f, _h.concat([_j.sent()]));
                    return [4 /*yield*/, task(start, end)];
                case 5:
                    _j.sent();
                    if (!(end >= checkpoint + checkpointInterval)) return [3 /*break*/, 7];
                    checkpoint = end;
                    return [4 /*yield*/, onEnd(end)];
                case 6:
                    _j.sent();
                    _j.label = 7;
                case 7:
                    currentBlock = end + 1;
                    return [3 /*break*/, 2];
                case 8:
                    progressReporter.update(currentBlock - 1);
                    return [4 /*yield*/, onEnd(currentBlock - 1)];
                case 9:
                    _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports._index = _index;
var InitialIndexStatus = /** @class */ (function () {
    function InitialIndexStatus() {
        var _this = this;
        this.done = false;
        this.setDone = function () { return _this.done = true; };
        this.isDone = function () { return _this.done === true; };
    }
    return InitialIndexStatus;
}());
/**
 * Will exit the process unless periodic activity is detected
 */
var InactivityMonitor = /** @class */ (function () {
    function InactivityMonitor(errorTimeout) {
        var _this = this;
        this.lastUpdated = Number(new Date());
        this.intervalId = null;
        this.startMonitoring = function () {
            _this.intervalId = setInterval(_this.checkInactivity, _this.errorTimeout);
        };
        this.stopMonitoring = function () {
            if (_this.intervalId !== null) {
                clearInterval(_this.intervalId);
                _this.intervalId = null;
            }
        };
        this.checkInactivity = function () {
            if (Number(new Date()) - _this.lastUpdated > _this.errorTimeout) {
                console.log("Inactivity detected, exiting");
                process.exit(0);
            }
        };
        this.logActivity = function () {
            _this.lastUpdated = Number(new Date());
            if (_this.intervalId === null) {
                _this.startMonitoring();
            }
        };
        this.errorTimeout = errorTimeout;
    }
    return InactivityMonitor;
}());
//type FiltersBase = { [name: string]: (event: TypedEventLog, contractName: string) => void | Promise<void> }
var IndexerBase = /** @class */ (function () {
    function IndexerBase() {
    }
    return IndexerBase;
}());
var Indexer = exports.Indexer = /** @class */ (function (_super) {
    __extends(Indexer, _super);
    function Indexer(contract, settings) {
        var _this = _super.call(this) || this;
        _this.defaultIndexInterval = 30 * 1000;
        _this.getTask = function () { return function (start, end) { return __awaiter(_this, void 0, void 0, function () {
            var provider, contract, filter, events, output, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        provider = Indexer.connectAndGetProvider();
                        contract = this.contract.connect({ provider: provider });
                        filter = contract.filters[this.filterName]();
                        return [4 /*yield*/, contract.queryFilter(filter, start, end)];
                    case 1:
                        events = _b.sent();
                        return [4 /*yield*/, Promise.all(events.map(function (e) { return _this.processEvent(e); }))];
                    case 2:
                        output = _b.sent();
                        return [4 /*yield*/, this.store(output)
                            /*
                            await Promise.all(
                              Object.entries(this.filters).map(async ([filterKey, onEvent]) => {
                                const filter = c.filters[filterKey]()
                                type E = Parameters<typeof onEvent>[0]
                                const events = await c.queryFilter(filter, start, end) as E[]
                                //console.log(c.address, events.length)
                                await Promise.all(
                                  events.map(e => onEvent(e, c.address))
                                )
                              })
                            )
                            */
                        ];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.log("Error on indexer task", this.name, e_1);
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); }; };
        _this.getIndexerId = function (contractAddress) { return _this.name + contractAddress; };
        _this.getLastIndexedBlock = function (contractAddress) { return __awaiter(_this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.query("\n      SELECT * FROM last_indexed_blocks\n      WHERE indexer_name = $1\n    ", [this.getIndexerId(contractAddress)])];
                    case 1:
                        q = _b.sent();
                        if (q.rowCount === 0)
                            return [2 /*return*/, 0];
                        else
                            return [2 /*return*/, Number(q.rows[0].block)];
                        return [2 /*return*/];
                }
            });
        }); };
        _this.updateLastIndexedBlock = function (contractAddress, b) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.query("\n      INSERT INTO\n        last_indexed_blocks (indexer_name, block)\n      VALUES ($1, $2)\n      ON CONFLICT (indexer_name) DO UPDATE\n      SET block = EXCLUDED.block\n    ", [this.getIndexerId(contractAddress), b])];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.refreshLastUpdatedAt = function (contractName) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.query("\n      INSERT INTO last_updated_at (id) VALUES ($1)\n      ON CONFLICT (id) DO UPDATE SET ts = NOW()\n    ", [this.name])];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        if (!Indexer.client || !Indexer.connectProvider) {
            throw new Error('Uninitialized');
        }
        _this.contract = contract;
        _this.settings = settings;
        return _this;
    }
    Object.defineProperty(Indexer.prototype, "client", {
        get: function () {
            return Indexer.getClient();
        },
        enumerable: false,
        configurable: true
    });
    Indexer.prototype.index = function () {
        var _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var address, onEnd, start, initialTask, indexPeriodically;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, this.contract.getAddress()];
                    case 1:
                        address = _j.sent();
                        onEnd = function (b) { return __awaiter(_this, void 0, void 0, function () {
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!(((_b = this.settings) === null || _b === void 0 ? void 0 : _b.updateLastIndexedBlock) !== false)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.updateLastIndexedBlock(address, b)];
                                    case 1:
                                        _c.sent();
                                        return [4 /*yield*/, this.refreshLastUpdatedAt(address)];
                                    case 2:
                                        _c.sent();
                                        _c.label = 3;
                                    case 3:
                                        Indexer.inactivityMonitor.logActivity();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        start = (_b = this.settings) === null || _b === void 0 ? void 0 : _b.startBlock;
                        if (!(start === undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getLastIndexedBlock(address)];
                    case 2:
                        //const last = await this.getLastIndexedBlock()
                        start = (_j.sent()) + 1;
                        if (((_c = this.settings) === null || _c === void 0 ? void 0 : _c.minIndexableBlock) && start < this.settings.minIndexableBlock) {
                            start = this.settings.minIndexableBlock;
                        }
                        _j.label = 3;
                    case 3:
                        console.log("\n".concat(((_d = this.name) !== null && _d !== void 0 ? _d : 'Unnamed indexer') + ' ' + address, ": indexing from block ").concat(start));
                        initialTask = this.getTask();
                        return [4 /*yield*/, _index(Indexer.connectAndGetProvider(), start, (_f = (_e = this.settings) === null || _e === void 0 ? void 0 : _e.batchSize) !== null && _f !== void 0 ? _f : 50000, initialTask, onEnd, { checkpointInterval: (_g = this.settings) === null || _g === void 0 ? void 0 : _g.checkpointInterval, progressReportInterval: (_h = this.settings) === null || _h === void 0 ? void 0 : _h.progressReportInterval })
                            //if (this.startEventListener) this.startEventListener()
                            // Periodically index with query filter
                            // Only the indexer should update last indexed block (not the listener)
                        ];
                    case 4:
                        _j.sent();
                        indexPeriodically = function () { return __awaiter(_this, void 0, void 0, function () {
                            var address, startTs, task, endTs, duration, wait;
                            var _b, _c, _d, _e, _f, _g, _h, _j, _k;
                            return __generator(this, function (_l) {
                                switch (_l.label) {
                                    case 0: return [4 /*yield*/, this.contract.getAddress()];
                                    case 1:
                                        address = _l.sent();
                                        _l.label = 2;
                                    case 2:
                                        if (!true) return [3 /*break*/, 8];
                                        startTs = Number(new Date());
                                        if (!!Indexer.initialIndexStatus.isDone()) return [3 /*break*/, 4];
                                        return [4 /*yield*/, (0, utils_1.sleep)((_c = (_b = this.settings) === null || _b === void 0 ? void 0 : _b.indexInterval) !== null && _c !== void 0 ? _c : this.defaultIndexInterval)];
                                    case 3:
                                        _l.sent();
                                        return [3 /*break*/, 2];
                                    case 4: return [4 /*yield*/, this.getLastIndexedBlock(address)];
                                    case 5:
                                        start = _l.sent();
                                        console.log("\n".concat(((_d = this.name) !== null && _d !== void 0 ? _d : 'Unnamed indexer') + ' ' + address, ": indexing from block ").concat(start));
                                        task = this.getTask();
                                        return [4 /*yield*/, _index(Indexer.connectAndGetProvider(), start, (_f = (_e = this.settings) === null || _e === void 0 ? void 0 : _e.batchSize) !== null && _f !== void 0 ? _f : 50000, task, onEnd, { checkpointInterval: (_g = this.settings) === null || _g === void 0 ? void 0 : _g.checkpointInterval, progressReportInterval: (_h = this.settings) === null || _h === void 0 ? void 0 : _h.progressReportInterval })];
                                    case 6:
                                        _l.sent();
                                        endTs = Number(new Date());
                                        duration = endTs - startTs;
                                        wait = ((_k = (_j = this.settings) === null || _j === void 0 ? void 0 : _j.indexInterval) !== null && _k !== void 0 ? _k : this.defaultIndexInterval) - duration;
                                        return [4 /*yield*/, (0, utils_1.sleep)(wait)];
                                    case 7:
                                        _l.sent();
                                        return [3 /*break*/, 2];
                                    case 8: return [2 /*return*/];
                                }
                            });
                        }); };
                        indexPeriodically();
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    _a = Indexer;
    Indexer.initialIndexStatus = new InitialIndexStatus();
    Indexer.client = undefined;
    Indexer.connectProvider = undefined;
    Indexer.inactivityMonitor = new InactivityMonitor(1000 * 60 * 10);
    Indexer.setClient = function (c) { _a.client = c; };
    Indexer.initialize = function (settings) { return __awaiter(void 0, void 0, void 0, function () {
        var create;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    this.client = settings.client;
                    create = (0, fs_1.readFileSync)('src/db/schema.sql', { encoding: 'utf-8' });
                    return [4 /*yield*/, settings.client.query(create)];
                case 1:
                    _b.sent();
                    this.connectProvider = settings.connectProvider;
                    return [2 /*return*/];
            }
        });
    }); };
    Indexer.getClient = function () {
        if (!_a.client)
            throw new Error("Uninitialized");
        return _a.client;
    };
    Indexer.connectAndGetProvider = function () {
        if (!_a.connectProvider)
            throw new Error("Uninitialized");
        return _a.connectProvider();
    };
    return Indexer;
}(IndexerBase));
/*
export abstract class Listener<ListenerFilters extends ListenerFiltersBase> {
  abstract filters: ListenerFilters

  start = (contracts: BaseContract[]) => {
    contracts.forEach(c => {
      Object.entries(this.filters).forEach(([key, onEvent]) => {
        const filter = c.filters[key]()
        c.on(filter, (...args) => onEvent([...args], c.address))
      })
    })
  }
}
*/ 
