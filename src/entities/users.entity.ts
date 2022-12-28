import { hashSync } from "bcryptjs";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeUpdate,
	OneToMany,
} from "typeorm";
import { SchedulesUserProperties } from "./schedulesUserProperties.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	isAdm: boolean;

	@Column({ default: true })
	isActive: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(
		() => SchedulesUserProperties,
		(schedulesUserProperties) => schedulesUserProperties.user
	)
	schedules: SchedulesUserProperties;

	@BeforeUpdate()
	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10);
	}
}
