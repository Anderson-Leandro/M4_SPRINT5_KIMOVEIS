import { request, Request, Response } from "express";
import { Category } from "../entities/categories.entity";
import { ICategoryResponse } from "../interfaces/categories";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listCategoriesPropertiesService from "../services/categories/listCategoriesProperties.service";

const createCategoryController = async (
	request: Request,
	response: Response
) => {
	const category: ICategoryResponse = await createCategoryService(
		request.body
	);

	return response.status(201).send(category);
};

const listCategoriesController = async (
	request: Request,
	response: Response
) => {
	const categories: ICategoryResponse[] = await listCategoriesService();

	return response.status(200).send(categories);
};

const listCategoriesPropertiesController = async (
	request: Request,
	response: Response
) => {
	const categoriesList: Category = await listCategoriesPropertiesService(
		request.params.id
	);

	return response.status(200).send(categoriesList);
};

export {
	createCategoryController,
	listCategoriesController,
	listCategoriesPropertiesController,
};
