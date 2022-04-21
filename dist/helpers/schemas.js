"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.schemaUpdate = exports.schemaCreate = void 0;
var joi_1 = __importDefault(require("joi"));
var schemaCreate = joi_1["default"].object({
    name: joi_1["default"].string().min(5).required(),
    born_date: joi_1["default"].date().iso().required(),
    vaccination_date: joi_1["default"].date().iso().required(),
    vaccinated: joi_1["default"].boolean()["default"](false),
    conclusion: joi_1["default"].string().allow(null)
});
exports.schemaCreate = schemaCreate;
var schemaUpdate = joi_1["default"].object({
    name: joi_1["default"].string().min(5),
    born_date: joi_1["default"].date().iso(),
    vaccination_date: joi_1["default"].date().iso(),
    vaccinated: joi_1["default"].boolean(),
    conclusion: joi_1["default"].string().allow(null)
});
exports.schemaUpdate = schemaUpdate;
//# sourceMappingURL=schemas.js.map