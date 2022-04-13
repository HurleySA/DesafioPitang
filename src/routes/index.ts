import { Router } from "express";
import { vaccineScheduleRoutes } from "./vaccineSchedule.routes";

const router = Router();

router.use("/vaccineSchedule", vaccineScheduleRoutes);

export default router;