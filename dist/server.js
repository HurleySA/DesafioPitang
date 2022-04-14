"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
dotenv_1["default"].config();
var PORT = process.env.PORT || 3333;
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.use("/api", index_1["default"]);
app.listen(PORT, function () {
    console.log("Server Running PORT: ".concat(PORT));
});
//# sourceMappingURL=server.js.map