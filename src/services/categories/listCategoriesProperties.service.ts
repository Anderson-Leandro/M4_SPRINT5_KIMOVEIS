import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appErrors.error";

const listCategoriesPropertiesService = async (
	categoryID: string
): Promise<Category> => {
	const categoryRepository = AppDataSource.getRepository(Category);

	const categoriesList = await categoryRepository
		.createQueryBuilder("categories")
		.leftJoinAndSelect("categories.properties", "properties")
		.where("categories.id = :id", { id: categoryID })
		.getOne();

	if (!categoriesList) {
		throw new AppError("CategoryId not found", 404);
	}

	return categoriesList;
};

export default listCategoriesPropertiesService;
