import { generateObjectId } from "../../srcDB/helpers/helper";
import { Account, Budget, Category, Month, ObjectId, Transaction, User } from "../../srcDB/model/dataModels";

export class TestDataUtil {
    // Categroy Data
    private static readonly incomeCategoryId: ObjectId = generateObjectId();
    private static readonly salaryCategoryName: string = "Salary";

    private static readonly groceryCategoryId: ObjectId = generateObjectId();
    private static readonly marketSubCategoryName: string = "Market";
    private static readonly cafeSubCategoryName: string = "Cafe";

    private static readonly homeCategoryId: ObjectId = generateObjectId();
    private static readonly mortgageSubCategoryName: string = "Mortgage";

    private static readonly utilityCategoryId: ObjectId = generateObjectId();
    private static readonly electricSubCategoryName: string = "Electric";
    private static readonly phoneSubCategoryName: string = "Phone";

    // Object Ids
    private static readonly testAccountId1: ObjectId = generateObjectId();
    private static readonly testAccountId2: ObjectId = generateObjectId();
    private static readonly budgetId: ObjectId = generateObjectId();

    // Todays Dates
    private static readonly todaysMonth: Month = (Object.values(Month) as Month[])[new Date().getMonth()];
    private static readonly todaysYear: number = new Date().getFullYear();

    static getSampleTransactions(): Transaction[] {
        let transactions: Transaction[] = [];
        transactions.push(...[
            {
                date: '2024-06-06',
                type: 'expense',
                categoryId: this.utilityCategoryId,
                subCategory: this.electricSubCategoryName,
                amount: 221.98,
                note: 'Grocery shopping'
            },
            {
                date: '2024-06-22',
                type: 'expense',
                categoryId: this.utilityCategoryId,
                subCategory: this.phoneSubCategoryName,
                amount: 149.26,
                note: 'Grocery shopping'
            },
            {
                date: '2024-06-15',
                type: 'expense',
                categoryId: this.groceryCategoryId,
                subCategory: this.marketSubCategoryName,
                amount: 156.72,
                note: 'Grocery shopping'
            },
            {
                date: '2024-06-22',
                type: 'expense',
                categoryId: this.groceryCategoryId,
                subCategory: this.marketSubCategoryName,
                amount: 123.26,
                note: 'Grocery shopping'
            },
            {
                date: '2024-06-03',
                type: 'expense',
                categoryId: this.groceryCategoryId,
                subCategory: this.cafeSubCategoryName,
                amount: 16.67,
                note: 'Starbucks'
            },
            {
                date: '2024-06-19',
                type: 'expense',
                categoryId: this.groceryCategoryId,
                subCategory: this.cafeSubCategoryName,
                amount: 24.85,
                note: 'Dianes Place'
            },
            {
                date: '2024-06-01',
                type: 'expense',
                categoryId: this.homeCategoryId,
                subCategory: this.mortgageSubCategoryName,
                amount: 2194.52,
                note: 'Mortgage Payment'
            },
            {
                date: '2024-06-20',
                type: 'income',
                categoryId: this.incomeCategoryId,
                subCategory: this.salaryCategoryName,
                amount: 2500,
                note: 'Salary for June'
            }
        ] as Transaction[]);

        return transactions;
    }

    static getCategoryMap(): Map<ObjectId, Category> {
        const categoryMap: Map<ObjectId, Category> = new Map<ObjectId, Category>();
        categoryMap.set(this.incomeCategoryId, {
            id: this.incomeCategoryId,
            name: 'Income',
            subCategories: [this.salaryCategoryName],
            type: 'income'
        });
        categoryMap.set(this.groceryCategoryId, {
            id: this.groceryCategoryId,
            name: 'Grocery',
            subCategories: [this.marketSubCategoryName, this.cafeSubCategoryName],
            type: 'expense'
        });
        categoryMap.set(this.homeCategoryId, {
            id: this.homeCategoryId,
            name: 'Home',
            subCategories: [this.mortgageSubCategoryName],
            type: 'expense'
        });
        categoryMap.set(this.utilityCategoryId, {
            id: this.utilityCategoryId,
            name: 'Utility',
            subCategories: [this.phoneSubCategoryName, this.electricSubCategoryName],
            type: 'expense'
        })
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
                budgetIdsByMonth: new Map<Month, ObjectId>([
                    [this.todaysMonth, this.budgetId]
                ]),
                icon: "fa-solid fa-house"
            }, {
                id: this.testAccountId2,
                user: User.DILLON,
                year: this.todaysYear,
                transactionsByMonth: new Map<Month, Transaction[]>([
                    [this.todaysMonth, this.getSampleTransactions()]
                ]),
                budgetIdsByMonth: new Map<Month, ObjectId>([
                    [this.todaysMonth, this.budgetId]
                ]),
                icon: "fa-solids fa-ghost"
            }
        ];
    }

    static getBudget(): Budget {
        return {
            id: this.budgetId,
            name: "Default",
            limitsByCategoryId: new Map<ObjectId, Map<string, number>>([
                [this.incomeCategoryId, new Map([[this.salaryCategoryName, 5000]])],
                [this.groceryCategoryId, new Map([[this.marketSubCategoryName, 600], [this.cafeSubCategoryName, 200]])],
                [this.utilityCategoryId, new Map([[this.electricSubCategoryName, 200], [this.phoneSubCategoryName, 150]])],
                [this.homeCategoryId, new Map([[this.mortgageSubCategoryName, 2200]])],
            ])
        };
    }
}
