import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Propertie } from "./properties.entity";
import { User } from "./users.entity";

@Entity("schedules_user_properties")
export class SchedulesUserProperties {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "date" })
	date: string;

	@Column({ type: "time" })
	hour: string;

	@ManyToOne(() => Propertie, (propertie) => propertie.schedules)
	property: Propertie;

	@ManyToOne(() => User, (user) => user.schedules)
	user: User;
}
