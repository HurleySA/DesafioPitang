"use strict";
exports.__esModule = true;
var express_1 = require("express");
var vaccineSchedule_routes_1 = require("./vaccineSchedule.routes");
var router = (0, express_1.Router)();
router.use("/vaccineSchedule", vaccineSchedule_routes_1.vaccineScheduleRoutes);
exports["default"] = router;
//# sourceMappingURL=index.js.map