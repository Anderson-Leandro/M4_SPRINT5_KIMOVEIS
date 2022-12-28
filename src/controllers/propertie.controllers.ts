import { Request, Response } from "express";
import { Propertie } from "../entities/properties.entity";
import createPropertieService from "../services/properties/createPropertie.service";
import listPropertiesService from "../services/properties/listProperties.service";

const createPropertieController = async (
	request: Request,
	response: Response
) => {
	const propertie: Propertie = await createPropertieService(request.body);

	return response.status(201).send(propertie);
};

const listPropertiesController = async (
	request: Request,
	response: Response
) => {
	const propertiesList: Propertie[] = await listPropertiesService();

	return response.status(200).send(propertiesList);
};

export { createPropertieController, listPropertiesController };
