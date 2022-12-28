import moment from "moment";
import AppDataSource from "../../data-source";
import { Propertie } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedulesUserProperties.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appErrors.error";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async (
	schedule: IScheduleRequest
): Promise<object> => {
	const schedulesRepository = AppDataSource.getRepository(
		SchedulesUserProperties
	);

	const hour = schedule.hour.split(":").map(Number);

	if ((hour[0] >= 18 && hour[1] > 0) || hour[0] < 8) {
		throw new AppError("Invalid hour");
	}

	if (isNaN(Date.parse(schedule.date))) {
		throw new AppError("Invalid Date");
	}

	const dayIsValid = new Date(schedule.date + " " + schedule.hour);

	if (dayIsValid.getDay() === 0 || dayIsValid.getDay() === 6) {
		throw new AppError("Invalid Date");
	}

	const scheduleAlreadyExistsInThisPropertie = await schedulesRepository
		.createQueryBuilder("schedules_user_properties")
		.innerJoinAndSelect("schedules_user_properties.property", "property")
		.innerJoinAndSelect("schedules_user_properties.user", "user")
		.where({ date: schedule.date })
		.andWhere({ hour: schedule.hour })
		.andWhere({ property: schedule.propertyId })
		.getOne();

	if (scheduleAlreadyExistsInThisPropertie) {
		throw new AppError("This schedule already exists", 409);
	}

	const propertieRepository = AppDataSource.getRepository(Propertie);

	const property = await propertieRepository.findOneBy({
		id: schedule.propertyId,
	});

	if (!property) {
		throw new AppError("Property not found", 404);
	}

	const userRepository = AppDataSource.getRepository(User);

	const userScheduleAlreadyExists = await userRepository
		.createQueryBuilder("users")
		.innerJoinAndSelect("users.schedules", "schedules")
		.where("schedules.date = :date", { date: schedule.date })
		.andWhere("schedules.hour = :time", { time: schedule.hour })
		.getOne();

	if (userScheduleAlreadyExists) {
		throw new AppError(
			"This user already have a schedule in this date and hour",
			409
		);
	}

	const user = await userRepository.findOneBy({ id: schedule.userId });

	const newSchedule = schedulesRepository.create({
		...schedule,
		property,
		user,
	});

	await schedulesRepository.save(newSchedule);

	return { message: "Schedule created" };
};

export default createSchedulesService;
