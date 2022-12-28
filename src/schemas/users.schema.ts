import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";

const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required(),
	isAdm: yup.boolean().required(),
});

const returndedCreateUserSchema: SchemaOf<IUser> = yup.object().shape({
	updatedAt: yup.date(),
	createdAt: yup.date(),
	id: yup.string(),
	isActive: yup.boolean(),
	isAdm: yup.boolean(),
	email: yup.string(),
	name: yup.string(),
});

const listUsersSchema: SchemaOf<IUser[]> = yup.array(returndedCreateUserSchema);

const updateUserSchema: SchemaOf<IUserUpdate> = yup.object().shape({
	name: yup.string(),
	email: yup.string().email(),
	password: yup.string(),
	id: yup.string(),
	isActive: yup.boolean(),
	isAdm: yup.boolean(),
});

export {
	createUserSchema,
	returndedCreateUserSchema,
	listUsersSchema,
	updateUserSchema,
};
