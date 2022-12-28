import { NextFunction, Request, Response } from "express";

const validateIdMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const id = request.params.id;

	if (id.length !== 36) {
		return response.status(400).send({ message: "Invalid Id!" });
	}

	if (id.search(/[^a-fA-F0-9-]/) >= 0) {
		return response.status(400).send({ message: "Invalid Id!" });
	}

	const idArray = id.split("-");

	if (idArray.length !== 5) {
		return response.status(400).send({ message: "Invalid Id!" });
	}

	if (
		idArray[0].length !== 8 ||
		idArray[1].length !== 4 ||
		idArray[2].length !== 4 ||
		idArray[3].length !== 4 ||
		idArray[4].length !== 12
	) {
		return response.status(400).send({ message: "Invalid Id!" });
	}

	return next();
};

export default validateIdMiddleware;
