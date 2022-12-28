import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUserLogin } from "../../interfaces/users";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appErrors.error";

const loginService = async ({
	email,
	password,
}: IUserLogin): Promise<string> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({ email: email });

	if (!user) {
		throw new AppError("email or password invalid", 403);
	}

	if (!user.isActive) {
		throw new AppError("User is not active", 400);
	}

	const matchPassword = await compare(password, user.password);

	if (!matchPassword) {
		throw new AppError("email or password invalid", 403);
	}

	const token = jwt.sign({}, process.env.SECRET_KEY, {
		subject: user.id,
		expiresIn: "48h",
	});

	return token;
};

export default loginService;
