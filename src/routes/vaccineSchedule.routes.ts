import { Router } from "express";
import { VaccineScheduleController } from "../controllers/VaccineScheduleController";

const vaccineScheduleRoutes = Router();

const vaccineScheduleController = new VaccineScheduleController();

vaccineScheduleRoutes.post('/', vaccineScheduleController.createVaccineSchedule)
vaccineScheduleRoutes.get('/', vaccineScheduleController.listVaccineSchedule)
vaccineScheduleRoutes.put('/:schedule_id', vaccineScheduleController.updateSchedule)
vaccineScheduleRoutes.get('/hello', function (req, res) {
    res.send('Hello');
  });

export { vaccineScheduleRoutes };

