import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { Category } from "../../entities/categories.entity";
import { Propertie } from "../../entities/properties.entity";
import { AppError } from "../../errors/appErrors.error";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertieService = async (
	data: IPropertyRequest
): Promise<Propertie> => {
	const addressRepository = AppDataSource.getRepository(Address);

	const propertieRepository = AppDataSource.getRepository(Propertie);

	const categoryRepository = AppDataSource.getRepository(Category);

	const category = await categoryRepository
		.createQueryBuilder("categories")
		.select()
		.where({ id: data.categoryId })
		.getOne();

	if (!category) {
		throw new AppError("Category not found", 404);
	}

	let { address, ...propertie } = data;

	const addressAlreadyExists = await addressRepository
		.createQueryBuilder("addresses")
		.select()
		.where({ zipCode: address.zipCode })
		.andWhere(
			address.number
				? { number: address.number }
				: { zipCode: address.zipCode }
		)
		.andWhere({ district: address.district })
		.getOne();

	if (addressAlreadyExists) {
		throw new AppError("This address already exists", 409);
	}

	const newAddress = addressRepository.create(address);

	await addressRepository.save(newAddress);

	address = newAddress;

	const newPropertie = propertieRepository.create({
		...propertie,
		address,
		category,
	});

	await propertieRepository.save(newPropertie);

	return newPropertie;
};
export default createPropertieService;
