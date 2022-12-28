import { Router } from "express";
import {
	createCategoryController,
	listCategoriesController,
	listCategoriesPropertiesController,
} from "../controllers/category.controllers";
import validateIdMiddleware from "../middlewares/validateId.middleware";
import validateUserAuthMiddleware from "../middlewares/validateUserAuth.middleware";
import validateUserIsAdminMiddleware from "../middlewares/validateUserIsAdmin.middleware";

const categoryRoutes = Router();

categoryRoutes.post(
	"",
	validateUserAuthMiddleware,
	validateUserIsAdminMiddleware,
	createCategoryController
);

categoryRoutes.get("", listCategoriesController);
categoryRoutes.get(
	"/:id/properties",
	validateIdMiddleware,
	listCategoriesPropertiesController
);

export default categoryRoutes;
