import { NextFunction, Request, Response } from "express";

class AppError extends Error {
	statusCode: number;
	constructor(message: string, statusCode: number = 400) {
		super();
		this.message = message;
		this.statusCode = statusCode;
	}
}

const errorHandler = (
	error: Error,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	if (error instanceof AppError) {
		return response
			.status(error.statusCode)
			.send({ message: error.message });
	}

	console.log(error);

	return response.status(500).send({ message: "Internal server error!" });
};

export { AppError, errorHandler };
