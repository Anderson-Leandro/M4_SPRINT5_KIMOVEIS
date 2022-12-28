import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";

const validateUserIsAdminMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const userId = request.foundUser.userId;

	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({ id: userId });

	if (user.isAdm) {
		return next();
	}

	return response.status(403).send({ message: "User is not admin" });
};

export default validateUserIsAdminMiddleware;
