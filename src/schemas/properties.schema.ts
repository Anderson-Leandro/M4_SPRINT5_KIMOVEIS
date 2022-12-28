import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPropertyRequest } from "../interfaces/properties";

const createPropertieSchema: SchemaOf<IPropertyRequest> = yup.object().shape({
	categoryId: yup.string().uuid().required(),
	size: yup.number().required(),
	value: yup.number().required(),
	address: yup.object().shape({
		district: yup.string().required(),
		zipCode: yup
			.string()
			.min(8, "zipCode must be at most 8 characters")
			.max(8, "zipCode must be at most 8 characters")
			.required(),
		number: yup.string(),
		city: yup.string().required(),
		state: yup
			.string()
			.min(2, "state must be at most 2 characters")
			.max(2, "state must be at most 2 characters")
			.required(),
	}),
});

export { createPropertieSchema };
