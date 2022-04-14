"use strict";
exports.__esModule = true;
exports.vaccineScheduleRoutes = void 0;
var express_1 = require("express");
var VaccineScheduleController_1 = require("../controllers/VaccineScheduleController");
var vaccineScheduleRoutes = (0, express_1.Router)();
exports.vaccineScheduleRoutes = vaccineScheduleRoutes;
var vaccineScheduleController = new VaccineScheduleController_1.VaccineScheduleController();
vaccineScheduleRoutes.post('/', vaccineScheduleController.createVaccineSchedule);
vaccineScheduleRoutes.get('/', vaccineScheduleController.listVaccineSchedule);
vaccineScheduleRoutes.put('/:schedule_id', vaccineScheduleController.updateSchedule);
//# sourceMappingURL=vaccineSchedule.routes.js.map