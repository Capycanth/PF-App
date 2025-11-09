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
	transactionsByMonth: Map<Month, Transaction[]>;
	budgetIdsByMonth: Map<Month, ObjectId>;
}

export interface Budget extends DatabaseObject {
	name: string;
	limitsByCategoryId: Map<ObjectId, Map<string, number>>;
}

export interface Goal extends DatabaseObject {
	name: string;
	note?: string;
	total_cost: number;
	saved: number;
	categoryId: ObjectId;
	subCategory?: string;
}
