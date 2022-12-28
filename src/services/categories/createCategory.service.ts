import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appErrors.error";
import {
	ICategoryRequest,
	ICategoryResponse,
} from "../../interfaces/categories/index";

const createCategoryService = async (
	category: ICategoryRequest
): Promise<ICategoryResponse> => {
	const categoryRepository = AppDataSource.getRepository(Category);

	const categoryAlreadyExists = await categoryRepository.findOneBy(category);

	if (categoryAlreadyExists) {
		throw new AppError("This Category already exists", 409);
	}

	const createdCategory = categoryRepository.create(category);

	await categoryRepository.save(createdCategory);

	return createdCategory;
};

export default createCategoryService;
