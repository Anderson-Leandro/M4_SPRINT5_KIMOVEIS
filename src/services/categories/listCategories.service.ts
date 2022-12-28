import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { ICategoryResponse } from "../../interfaces/categories";

const listCategoriesService = async (): Promise<ICategoryResponse[]> => {
	const categoryRepository = AppDataSource.getRepository(Category);

	const categoriesList = await categoryRepository.find();

	return categoriesList;
};

export default listCategoriesService;
