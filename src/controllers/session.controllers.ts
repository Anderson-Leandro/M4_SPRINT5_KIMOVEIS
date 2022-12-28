import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import loginService from "../services/sessions/login.service";

const loginController = async (request: Request, response: Response) => {
	const loginData: IUserLogin = request.body;

	const token: string = await loginService(loginData);

	return response.status(200).send({ token });
};

export default loginController;
