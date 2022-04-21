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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.VaccineScheduleController = void 0;
var AppError_1 = require("../erros/AppError");
var VaccineScheduleService_1 = require("../services/VaccineScheduleService");
var vaccineScheduleService = new VaccineScheduleService_1.VaccineScheduleService();
var VaccineScheduleController = /** @class */ (function () {
    function VaccineScheduleController() {
    }
    VaccineScheduleController.prototype.deleteSchedule = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schedule_id, schedule, err_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        schedule_id = request.params.schedule_id;
                        return [4 /*yield*/, vaccineScheduleService.deleteSchedule(schedule_id)];
                    case 1:
                        schedule = _a.sent();
                        return [2 /*return*/, response.status(200).send(schedule)];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1 instanceof AppError_1.AppError) {
                            return [2 /*return*/, response.status(err_1.statusCode).json({ error: err_1.message })];
                        }
                        else if (err_1 instanceof Error) {
                            return [2 /*return*/, response.status(500).json({ error: err_1.message })];
                        }
                        errorMessage = "Failed to do something exceptional";
                        return [2 /*return*/, response.status(500).json({ error: errorMessage })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VaccineScheduleController.prototype.updateSchedule = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schedule_id, data, schedule, err_2, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        schedule_id = request.params.schedule_id;
                        data = request.body;
                        return [4 /*yield*/, vaccineScheduleService.updateSchedule(schedule_id, data)];
                    case 1:
                        schedule = _a.sent();
                        return [2 /*return*/, response.status(200).send(schedule)];
                    case 2:
                        err_2 = _a.sent();
                        if (err_2 instanceof AppError_1.AppError) {
                            return [2 /*return*/, response.status(err_2.statusCode).json({ error: err_2.message })];
                        }
                        else if (err_2 instanceof Error) {
                            return [2 /*return*/, response.status(500).json({ error: err_2.message })];
                        }
                        errorMessage = "Failed to do something exceptional";
                        return [2 /*return*/, response.status(500).json({ error: errorMessage })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VaccineScheduleController.prototype.listVaccineSchedule = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schedules, err_3, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, vaccineScheduleService.listVaccineSchedule()];
                    case 1:
                        schedules = _a.sent();
                        return [2 /*return*/, response.status(200).send(schedules)];
                    case 2:
                        err_3 = _a.sent();
                        if (err_3 instanceof AppError_1.AppError) {
                            return [2 /*return*/, response.status(err_3.statusCode).json({ error: err_3.message })];
                        }
                        else if (err_3 instanceof Error) {
                            return [2 /*return*/, response.status(500).json({ error: err_3.message })];
                        }
                        errorMessage = "Failed to do something exceptional";
                        return [2 /*return*/, response.status(500).json({ error: errorMessage })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VaccineScheduleController.prototype.createVaccineSchedule = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, born_date, vaccination_date, vaccineSchedule, err_4, errorMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, name = _a.name, born_date = _a.born_date, vaccination_date = _a.vaccination_date;
                        return [4 /*yield*/, vaccineScheduleService.createVaccineSchedule({ name: name, born_date: born_date, vaccination_date: vaccination_date })];
                    case 1:
                        vaccineSchedule = _b.sent();
                        return [2 /*return*/, response.status(201).send(vaccineSchedule)];
                    case 2:
                        err_4 = _b.sent();
                        if (err_4 instanceof AppError_1.AppError) {
                            return [2 /*return*/, response.status(err_4.statusCode).json({ error: err_4.message })];
                        }
                        else if (err_4 instanceof Error) {
                            return [2 /*return*/, response.status(500).json({ error: err_4.message })];
                        }
                        errorMessage = "Failed to do something exceptional";
                        return [2 /*return*/, response.status(500).json({ error: errorMessage })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VaccineScheduleController;
}());
exports.VaccineScheduleController = VaccineScheduleController;
//# sourceMappingURL=VaccineScheduleController.js.map