import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";

const validateUserAlreadyExistsMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const email = request.body.email;

	const userRepository = AppDataSource.getRepository(User);

	const userAlreadyExists = await userRepository.findOneBy({ email: email });

	if (userAlreadyExists) {
		return response.status(409).send({ message: "User already exists!" });
	}

	return next();
};

export default validateUserAlreadyExistsMiddleware;
