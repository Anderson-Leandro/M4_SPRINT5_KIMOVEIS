import { Router } from "express";
import {
	createSchedulesController,
	listPropertieSchedulesController,
} from "../controllers/schedules.controllers";
import validateSchemasMiddleware from "../middlewares/validateSchemas.middleware";
import validateUserAuthMiddleware from "../middlewares/validateUserAuth.middleware";
import validateUserIsAdminMiddleware from "../middlewares/validateUserIsAdmin.middleware";
import createScheduleSchema from "../schemas/schedules.schema";

const schedulesRoutes = Router();

schedulesRoutes.post(
	"",
	validateUserAuthMiddleware,
	validateSchemasMiddleware(createScheduleSchema),
	createSchedulesController
);

schedulesRoutes.get(
	"/properties/:id",
	validateUserAuthMiddleware,
	validateUserIsAdminMiddleware,
	listPropertieSchedulesController
);

export default schedulesRoutes;
