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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var crypto_1 = require("crypto");
var supertest_1 = __importDefault(require("supertest"));
var prismaClient_1 = require("../../database/prismaClient");
var server_1 = require("../../server");
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prismaClient.vaccineSchedule.deleteMany({})];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("[POST] /vaccineSchedules", function () {
    it("should be able to create new vaccine schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule when born date is on the future", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "2029-05-20T13:10:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule when vaccination date is on the past", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "1997-06-30T14:00:00.000Z"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule when name lenght is less than 5 characteres", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Edua",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule when born date input is not a IsoString", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "NãoéIsoString",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule when vaccinate date input is not a IsoString", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "NãoéIsoString"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule without name", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule without born date", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new vaccine schedule without vacination date", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to create 2 new vaccine schedule in the same hour ", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T13:10:00.000Z"
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create 3 new vaccine schedule in the same hour ", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T13:10:00.000Z"
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T13:10:00.000Z"
                        })
                            .expect(403)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to create 20 new vaccine schedule in the same day ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, hour, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 20)) return [3 /*break*/, 4];
                    hour = i >= 10 ? i : "0".concat(i);
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T".concat(hour, ":10:00.000Z")
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .get("/api/vaccineSchedule")
                        .expect(200)];
                case 5:
                    response = _a.sent();
                    expect(response.body.length).toBe(20);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create 21 new vaccine schedule in the same day ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, hour, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 20)) return [3 /*break*/, 4];
                    hour = i >= 10 ? i : "0".concat(i);
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T".concat(hour, ":10:00.000Z")
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T23:10:00.000Z"
                    })
                        .expect(403)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .get("/api/vaccineSchedule")
                            .expect(200)];
                case 6:
                    response = _a.sent();
                    expect(response.body.length).toBe(20);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to create a new vaccine schedule when some day already have 20 schedules ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, hour, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 20)) return [3 /*break*/, 4];
                    hour = i >= 10 ? i : "0".concat(i);
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T".concat(hour, ":10:00.000Z")
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-25T00:10:00.000Z"
                    })
                        .expect(201)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .get("/api/vaccineSchedule")
                            .expect(200)];
                case 6:
                    response = _a.sent();
                    expect(response.body.length).toBe(21);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("[GET] /vaccineSchedules", function () {
    it("should be initialize with no data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .get("/api/vaccineSchedule")
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able contains a schedule after being created", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .get("/api/vaccineSchedule")
                            .expect(200)];
                case 2:
                    response = _a.sent();
                    expect(response.body.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should sort the schedules list by vaccination date", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T15:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T13:10:00.000Z"
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .get("/api/vaccineSchedule")
                            .expect(200)];
                case 3:
                    response = _a.sent();
                    expect(response.body[0]).toMatchObject({
                        name: 'Eduardo',
                        born_date: '1997-06-30T14:00:00.000Z',
                        vaccination_date: '2029-05-20T13:00:00.000Z',
                        vaccinated: false,
                        conclusion: null
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("[DELETE] /vaccineSchedules", function () {
    it("should not be able to delete non exist schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var randomUuid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    randomUuid = (0, crypto_1.randomUUID)();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)["delete"]("/api/vaccineSchedule/".concat(randomUuid))
                            .expect(404)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to delete a existing schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T15:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)["delete"]("/api/vaccineSchedule/".concat(response.body.id))
                            .expect(200)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("[PUT] /vaccineSchedules", function () {
    var randomUuid = (0, crypto_1.randomUUID)();
    it("should not be able to update non exist schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .put("/api/vaccineSchedule/".concat(randomUuid))
                        .send({
                        name: 'Hurley',
                        born_date: '1997-06-30T14:00:00.000Z',
                        vaccination_date: '2029-10-20T13:00:00.000Z',
                        vaccinated: true,
                        conclusion: "Paciente Vacinado"
                    })
                        .expect(404)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to update a existing schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T15:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .put("/api/vaccineSchedule/".concat(response.body.id))
                            .send({
                            name: 'Hurley',
                            born_date: '1997-06-30T14:00:00.000Z',
                            vaccination_date: '2029-10-20T13:00:00.000Z',
                            vaccinated: true,
                            conclusion: "Paciente Vacinado"
                        })
                            .expect(200)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to update a existing schedule to a name with less than 5 characteres", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T15:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .put("/api/vaccineSchedule/".concat(response.body.id))
                            .send({
                            name: 'Hur',
                            born_date: '1997-06-30T14:00:00.000Z',
                            vaccination_date: '2029-10-20T13:00:00.000Z',
                            vaccinated: true,
                            conclusion: "Paciente Vacinado"
                        })
                            .expect(400)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to update a vaccine schedule when born date is on the future", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T15:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .put("/api/vaccineSchedule/".concat(response.body.id))
                            .send({
                            name: 'Hurley',
                            born_date: '029-05-20T13:10:00.000Z',
                            vaccination_date: '2029-10-20T13:00:00.000Z',
                            vaccinated: true,
                            conclusion: "Paciente Vacinado"
                        })
                            .expect(400)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to update a vaccine schedule when vaccination date is on the past", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T15:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .put("/api/vaccineSchedule/".concat(response.body.id))
                            .send({
                            name: 'Hurley',
                            born_date: '029-05-20T13:10:00.000Z',
                            vaccination_date: "1997-06-30T14:00:00.000Z",
                            vaccinated: true,
                            conclusion: "Paciente Vacinado"
                        })
                            .expect(400)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to update a vaccine schedule when already exist 2 schedule in the same hour ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                        .post("/api/vaccineSchedule")
                        .send({
                        name: "Eduardo",
                        born_date: "1997-06-30T14:00:00.000Z",
                        vaccination_date: "2029-05-20T13:10:00.000Z"
                    })
                        .expect(201)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T13:10:00.000Z"
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .post("/api/vaccineSchedule")
                            .send({
                            name: "Eduardo",
                            born_date: "1997-06-30T14:00:00.000Z",
                            vaccination_date: "2029-05-20T15:10:00.000Z"
                        })
                            .expect(201)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(server_1.app)
                            .put("/api/vaccineSchedule/".concat(response.body.id))
                            .send({
                            vaccination_date: "2029-05-20T13:10:00.000Z",
                            vaccinated: true,
                            conclusion: "Paciente Vacinado"
                        })
                            .expect(403)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=router.spec.js.map