import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appErrors.error";

const deleteUserService = async (userId: string): Promise<User> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({ id: userId });

	if (!user) {
		throw new AppError("User not found", 404);
	}

	if (!user.isActive) {
		throw new AppError("Cant delete a deleted user", 400);
	}

	user.isActive = false;

	await userRepository.save(user);

	return user;
};

export default deleteUserService;
