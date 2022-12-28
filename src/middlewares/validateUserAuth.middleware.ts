import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateUserAuthMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const token = request.headers.authorization?.split(" ")[1];

	if (!token) {
		return response.status(401).send({ message: "Invalid Token!" });
	}

	jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
		if (error) {
			return response.status(401).send({ message: error });
		}

		request.foundUser = {
			userId: decoded.sub,
		};

		return next();
	});
};

export default validateUserAuthMiddleware;
