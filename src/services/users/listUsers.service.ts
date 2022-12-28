import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users";
import { listUsersSchema } from "../../schemas/users.schema";

const listUsersService = async (): Promise<IUser[]> => {
	const userRepository = AppDataSource.getRepository(User);

	const users = await userRepository.find();

	const returnedUsers = await listUsersSchema.validate(users, {
		stripUnknown: true,
	});

	return returnedUsers;
};
export default listUsersService;
