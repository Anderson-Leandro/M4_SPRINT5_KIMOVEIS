import { IUser, IUserRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { returndedCreateUserSchema } from "../../schemas/users.schema";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
	const userRepository = AppDataSource.getRepository(User);

	const newUser = userRepository.create(userData);

	await userRepository.save(newUser);

	const returnedUser = returndedCreateUserSchema.validate(newUser, {
		stripUnknown: true,
	});

	return returnedUser;
};

export default createUserService;
