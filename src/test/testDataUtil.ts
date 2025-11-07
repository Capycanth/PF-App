import { generateObjectId } from "../../srcDB/helpers/helper";
import { Account, Budget, Category, Month, ObjectId, Transaction, User } from "../../srcDB/model/dataModels";

export class TestDataUtil {
    // ObjectIds
    private static readonly incomeCategoryId: ObjectId = generateObjectId();
    private static readonly expenseCategoryId: ObjectId = generateObjectId();
    private static readonly testAccountId1: ObjectId = generateObjectId();
    private static readonly testAccountId2: ObjectId = generateObjectId();
    // SubCategory Names
    private static readonly subCategoryName: string = "Market";
    // Todays Dates
    private static readonly todaysMonth: Month = (Object.values(Month) as Month[])[new Date().getMonth()];
    private static readonly todaysYear: number = new Date().getFullYear();

    static getSampleTransactions(): Transaction[] {
        let transactions: Transaction[] = [];
        for (let i = 0; i < 10; i++) {
            transactions.push(...[
                {
                    date: '2024-06-15',
                    type: 'expense',
                    categoryId: this.expenseCategoryId,
                    subCategory: this.subCategoryName,
                    amount: 50.75,
                    note: 'Grocery shopping'
                },
                {
                    date: '2024-06-20',
                    type: 'income',
                    categoryId: this.incomeCategoryId,
                    amount: 1500.37,
                    note: 'Salary for June'
                }
            ] as Transaction[]);
        }
        return transactions;
    }

    static getCategoryMap(): Map<ObjectId, Category> {
        const categoryMap: Map<ObjectId, Category> = new Map<ObjectId, Category>();
        categoryMap.set(this.incomeCategoryId, {
            id: this.incomeCategoryId,
            name: 'Income',
            subCategories: [],
            type: 'income'
        });
        categoryMap.set(this.expenseCategoryId, {
            id: this.expenseCategoryId,
            name: 'Grocery',
            subCategories: [this.subCategoryName],
            type: 'expense'
        });
        return categoryMap;
    }

    static getAccounts(): Account[] {
        return [
            {
                id: this.testAccountId1,
                user: User.JOINT,
                year: this.todaysYear,
                transactionsByMonth: new Map<Month, Transaction[]>([
                    [this.todaysMonth, this.getSampleTransactions()]
                ]),
                budgetsByMonth: new Map<Month, Budget>()
            }, {
                id: this.testAccountId2,
                user: User.DILLON,
                year: this.todaysYear,
                transactionsByMonth: new Map<Month, Transaction[]>([
                    [this.todaysMonth, this.getSampleTransactions()]
                ]),
                budgetsByMonth: new Map<Month, Budget>()
            }
        ];
    }
}
