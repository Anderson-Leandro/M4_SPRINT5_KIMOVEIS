import { Request, Response } from "express";
import { Propertie } from "../entities/properties.entity";
import { IScheduleRequest } from "../interfaces/schedules";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listPropertieSchedulesService from "../services/schedules/listPropertieSchedules.service";

const createSchedulesController = async (
	request: Request,
	response: Response
) => {
	const data: IScheduleRequest = { ...request.foundUser, ...request.body };

	const schedule: object = await createSchedulesService(data);

	return response.status(201).send(schedule);
};

const listPropertieSchedulesController = async (
	request: Request,
	response: Response
) => {
	const schedulesList: Propertie = await listPropertieSchedulesService(
		request.params.id
	);

	return response.status(200).send(schedulesList);
};

export { createSchedulesController, listPropertieSchedulesController };
