import AppDataSource from "../../data-source";
import { Propertie } from "../../entities/properties.entity";
import { AppError } from "../../errors/appErrors.error";

const listPropertieSchedulesService = async (
	propertieId: string
): Promise<Propertie> => {
	const propertieRepository = AppDataSource.getRepository(Propertie);

	const property = await propertieRepository.findOneBy({
		id: propertieId,
	});

	if (!property) {
		throw new AppError("Property not found", 404);
	}

	const PropertieSchedules = await propertieRepository
		.createQueryBuilder("properties")
		.leftJoinAndSelect("properties.schedules", "schedules")
		.leftJoinAndSelect("schedules.user", "user")
		.innerJoinAndSelect("properties.address", "address")
		.innerJoinAndSelect("properties.category", "category")
		.where("properties.id = :id", { id: propertieId })
		.getOne();

	return PropertieSchedules;
};

export default listPropertieSchedulesService;
