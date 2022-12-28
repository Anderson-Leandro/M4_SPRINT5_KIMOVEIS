import { Router } from "express";
import {
	createPropertieController,
	listPropertiesController,
} from "../controllers/propertie.controllers";
import validateSchemasMiddleware from "../middlewares/validateSchemas.middleware";
import validateUserAuthMiddleware from "../middlewares/validateUserAuth.middleware";
import validateUserIsAdminMiddleware from "../middlewares/validateUserIsAdmin.middleware";
import { createPropertieSchema } from "../schemas/properties.schema";

const propertieRoutes = Router();

propertieRoutes.post(
	"",
	validateUserAuthMiddleware,
	validateUserIsAdminMiddleware,
	validateSchemasMiddleware(createPropertieSchema),
	createPropertieController
);

propertieRoutes.get("", listPropertiesController);

export default propertieRoutes;
