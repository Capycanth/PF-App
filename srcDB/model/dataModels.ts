import { PartialRecord } from "../helpers/type-helper";

export enum User {
	DILLON = 'Dillon',
	SOPHIA = 'Sophia',
	JOINT = 'Joint',
}

export enum Month {
	JANUARY = 'Jan',
	FEBRUARY = 'Feb',
	MARCH = 'Mar',
	APRIL = 'Apr',
	MAY = 'May',
	JUNE = 'Jun',
	JULY = 'Jul',
	AUGUST = 'Aug',
	SEPTEMBER = 'Sep',
	OCTOBER = 'Oct',
	NOVEMBER = 'Nov',
	DECEMBER = 'Dec',
}

export function getMonth(monthNum: number): Month {
	const monthValues = Object.values(Month);
	// monthNum is expected 1–12, so adjust for index
	return monthValues[monthNum - 1];
}

export interface Transaction {
	date: string;
	type: 'income' | 'expense';
	categoryId: ObjectId;
	subCategory: string;
	amount: number;
	note?: string;
}

export type ObjectId = string;

export interface DatabaseObject {
	id: ObjectId;
}

export interface Category extends DatabaseObject {
	name: string;
	subCategories: string[];
	type: 'income' | 'expense';
}

export interface Account extends DatabaseObject {
	user: User;
	year: number;
	transactionsByMonth: PartialRecord<Month, Transaction[]>;
	budgetIdsByMonth: PartialRecord<Month, ObjectId>;
	icon: string;
}

export interface Budget extends DatabaseObject {
	name: string;
	limitsByCategoryId: PartialRecord<ObjectId, PartialRecord<string, number>>;
}

export interface Goal extends DatabaseObject {
	accountId: ObjectId;
	name: string;
	total_cost: number;
	saved: number;
	categoryId: ObjectId;
	subCategory: string;
}
