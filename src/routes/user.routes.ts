import { Router } from "express";
import {
	createUserController,
	deleteUserController,
	listUsersController,
	updateUserController,
} from "../controllers/user.controllers";
import validateIdMiddleware from "../middlewares/validateId.middleware";
import validateSchemasMiddleware from "../middlewares/validateSchemas.middleware";
import validateUserAlreadyExistsMiddleware from "../middlewares/validateUserAlreadyExists.middleware";
import validateUserAuthMiddleware from "../middlewares/validateUserAuth.middleware";
import validateUserIsAdminMiddleware from "../middlewares/validateUserIsAdmin.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schema";

const userRoutes = Router();

userRoutes.post(
	"",
	validateSchemasMiddleware(createUserSchema),
	validateUserAlreadyExistsMiddleware,
	createUserController
);

userRoutes.get(
	"",
	validateUserAuthMiddleware,
	validateUserIsAdminMiddleware,
	listUsersController
);

userRoutes.patch(
	"/:id",
	validateIdMiddleware,
	validateUserAuthMiddleware,
	validateSchemasMiddleware(updateUserSchema),
	updateUserController
);

userRoutes.delete(
	"/:id",
	validateIdMiddleware,
	validateUserAuthMiddleware,
	validateUserIsAdminMiddleware,
	deleteUserController
);

export default userRoutes;
