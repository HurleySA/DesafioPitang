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
exports.VaccineScheduleService = void 0;
var date_fns_1 = require("date-fns");
var prismaClient_1 = require("../database/prismaClient");
var AppError_1 = require("../erros/AppError");
var schemas_1 = require("../helpers/schemas");
var availableHours = [];
for (var i = +process.env.FIRST_HOUR_SERVICE; i <= +process.env.LAST_HOUR_SERVICE; i++) {
    availableHours.push(i);
}
var VaccineScheduleService = /** @class */ (function () {
    function VaccineScheduleService() {
    }
    VaccineScheduleService.prototype.deleteSchedule = function (schedule_id) {
        return __awaiter(this, void 0, void 0, function () {
            var schedule, newSchedule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.findUnique({
                            where: {
                                id: schedule_id
                            }
                        })];
                    case 1:
                        schedule = _a.sent();
                        if (!schedule) {
                            throw new AppError_1.AppError("Schedule not found.", 404);
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule["delete"]({
                                where: { id: schedule_id }
                            })];
                    case 2:
                        newSchedule = _a.sent();
                        return [2 /*return*/, newSchedule];
                }
            });
        });
    };
    VaccineScheduleService.prototype.updateSchedule = function (schedule_id, _a) {
        var name = _a.name, born_date = _a.born_date, vaccination_date = _a.vaccination_date, vaccinated = _a.vaccinated, conclusion = _a.conclusion;
        return __awaiter(this, void 0, void 0, function () {
            var schedule, validation, vaccinationDate, newSchedule;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.findUnique({
                            where: {
                                id: schedule_id
                            }
                        })];
                    case 1:
                        schedule = _b.sent();
                        if (!schedule) {
                            throw new AppError_1.AppError("Schedule not found.", 404);
                        }
                        validation = schemas_1.schemaUpdate.validate({ name: name, born_date: born_date, vaccination_date: vaccination_date, vaccinated: vaccinated, conclusion: conclusion }, {
                            abortEarly: false
                        });
                        if (validation.error) {
                            throw new AppError_1.AppError(validation.error.message, 400);
                        }
                        vaccinationDate = vaccination_date;
                        if (vaccination_date && born_date)
                            this.verifyDates(vaccination_date, born_date);
                        if (!vaccination_date) return [3 /*break*/, 3];
                        vaccinationDate = new Date(vaccination_date);
                        vaccinationDate.setMinutes(0);
                        vaccinationDate.setSeconds(0);
                        vaccinationDate.setMilliseconds(0);
                        return [4 /*yield*/, this.verifyHasVaccation(vaccinationDate)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.update({
                            where: { id: schedule_id },
                            data: {
                                name: name,
                                born_date: born_date,
                                vaccination_date: vaccinationDate,
                                vaccinated: vaccinated,
                                conclusion: vaccinated ? conclusion : null
                            }
                        })];
                    case 4:
                        newSchedule = _b.sent();
                        return [2 /*return*/, newSchedule];
                }
            });
        });
    };
    VaccineScheduleService.prototype.listVaccineSchedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schedules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.findMany({
                            orderBy: {
                                vaccination_date: 'asc'
                            }
                        })];
                    case 1:
                        schedules = _a.sent();
                        return [2 /*return*/, schedules];
                }
            });
        });
    };
    VaccineScheduleService.prototype.createVaccineSchedule = function (_a) {
        var name = _a.name, born_date = _a.born_date, vaccination_date = _a.vaccination_date;
        return __awaiter(this, void 0, void 0, function () {
            var validation, vaccinationDate, vaccineSchedule;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validation = schemas_1.schemaCreate.validate({ name: name, born_date: born_date, vaccination_date: vaccination_date }, {
                            abortEarly: false
                        });
                        if (validation.error) {
                            throw new AppError_1.AppError(validation.error.message, 400);
                        }
                        vaccinationDate = new Date(vaccination_date);
                        this.verifyDates(vaccinationDate, born_date);
                        vaccinationDate.setMinutes(0, 0, 0);
                        return [4 /*yield*/, this.verifyHasVaccation(vaccinationDate)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.create({
                                data: {
                                    name: name,
                                    born_date: born_date,
                                    vaccination_date: vaccinationDate
                                }
                            })];
                    case 2:
                        vaccineSchedule = _b.sent();
                        return [2 /*return*/, vaccineSchedule];
                }
            });
        });
    };
    VaccineScheduleService.prototype.verifyHasVaccation = function (vaccinationDate) {
        return __awaiter(this, void 0, void 0, function () {
            var vaccination, schedulesByHours, begin, end, schedules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vaccination = new Date(vaccinationDate);
                        return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.findMany({
                                where: {
                                    vaccination_date: vaccination
                                }
                            })];
                    case 1:
                        schedulesByHours = _a.sent();
                        if (schedulesByHours.length >= +process.env.MAX_SCHEDULES_BY_HOUR) {
                            throw new AppError_1.AppError("Already have 2 reservations at this hour.", 403);
                        }
                        begin = ((0, date_fns_1.subHours)((0, date_fns_1.startOfDay)(vaccination), 3));
                        end = ((0, date_fns_1.subHours)((0, date_fns_1.endOfDay)(vaccination), 3));
                        return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.findMany({
                                where: {
                                    vaccination_date: {
                                        gte: begin,
                                        lt: end
                                    }
                                }
                            })];
                    case 2:
                        schedules = _a.sent();
                        if (schedules.length >= +process.env.MAX_SCHEDULES_BY_DAY) {
                            throw new AppError_1.AppError("Already have 20 reservations at this day.", 403);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VaccineScheduleService.prototype.verifyDates = function (vaccinationDate, born_date) {
        var now = new Date();
        var vaccination = new Date(vaccinationDate);
        var born = new Date(born_date);
        if (vaccination < (0, date_fns_1.subHours)(now, 3)) {
            throw new AppError_1.AppError("The Vaccination date cannot be in the past.");
        }
        if (born > (0, date_fns_1.subHours)(now, 3)) {
            throw new AppError_1.AppError("Do you came from future?");
        }
        if (!availableHours.includes(vaccination.getUTCHours())) {
            throw new AppError_1.AppError("Outside vaccination hours.");
        }
    };
    return VaccineScheduleService;
}());
exports.VaccineScheduleService = VaccineScheduleService;
//# sourceMappingURL=VaccineScheduleService.js.map