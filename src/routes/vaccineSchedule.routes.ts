import { Router } from "express";
import { VaccineScheduleController } from "../controllers/VaccineScheduleController";

const vaccineScheduleRoutes = Router();

const vaccineScheduleController = new VaccineScheduleController();

vaccineScheduleRoutes.post('/', vaccineScheduleController.createVaccineSchedule)

export { vaccineScheduleRoutes };

