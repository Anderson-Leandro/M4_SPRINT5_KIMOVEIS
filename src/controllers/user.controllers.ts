import { Request, Response } from "express";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users/index";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (request: Request, response: Response) => {
	const user: IUser = await createUserService(request.body);

	return response.status(201).send(user);
};

const listUsersController = async (request: Request, response: Response) => {
	const users: IUser[] = await listUsersService();

	return response.status(200).send(users);
};

const updateUserController = async (request: Request, response: Response) => {
	const updatedUser: IUserUpdate = await updateUserService(
		request.params.id,
		request.body,
		request.foundUser.userId
	);

	return response.status(200).send(updatedUser);
};

const deleteUserController = async (request: Request, response: Response) => {
	await deleteUserService(request.params.id);

	return response.status(204).send();
};

export {
	createUserController,
	listUsersController,
	updateUserController,
	deleteUserController,
};
