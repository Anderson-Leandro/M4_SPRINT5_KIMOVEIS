import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { SchedulesUserProperties } from "./schedulesUserProperties.entity";

@Entity("properties")
export class Propertie {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ default: false })
	sold: boolean;

	@Column({ type: "decimal" })
	value: number;

	@Column()
	size: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => Address)
	@JoinColumn()
	address: Address;

	@ManyToOne(() => Category, (category) => category.properties)
	category: Category;

	@OneToMany(
		() => SchedulesUserProperties,
		(schedulesUserProperties) => schedulesUserProperties.property
	)
	schedules: SchedulesUserProperties;
}
