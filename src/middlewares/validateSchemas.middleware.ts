import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const validateSchemasMiddleware =
	(schema: AnySchema) =>
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const validatedBody = await schema.validate(request.body, {
				stripUnknown: true,
				abortEarly: false,
			});

			request.body = validatedBody;

			return next();
		} catch (error) {
			return response.status(400).send({ message: error.errors });
		}
	};

export default validateSchemasMiddleware;
