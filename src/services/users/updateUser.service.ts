import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appErrors.error";
import { IUser, IUserUpdate } from "../../interfaces/users";
import {
	returndedCreateUserSchema,
	updateUserSchema,
} from "../../schemas/users.schema";

const updateUserService = async (
	userToUpdateId: string,
	userData: IUserUpdate,
	actualUserId: string
): Promise<IUserUpdate> => {
	const keys = Object.keys(userData);

	keys.forEach((key) => {
		if (key === "id" || key === "isActive" || key === "isAdm") {
			throw new AppError(
				"You do not have permission to change one of this values",
				401
			);
		}
	});

	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({ id: userToUpdateId });

	if (!user) {
		throw new AppError("User not found", 404);
	}

	const actualUser = await userRepository.findOneBy({ id: actualUserId });

	if (userToUpdateId != actualUserId && actualUser.isAdm === false) {
		throw new AppError("You dont have permission", 401);
	}

	for (const key in userData) {
		user[key] = userData[key];
	}

	await userRepository.save(user);

	const returnedUser = await returndedCreateUserSchema.validate(user, {
		stripUnknown: true,
	});

	return returnedUser;
};

export default updateUserService;
