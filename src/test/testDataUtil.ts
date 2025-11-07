import { Category, ObjectId, SubCategory, Transaction } from "../../srcDB/model/dataModels";
import { generateObjectId } from "../../srcDB/helpers/helper";

export class TestDataUtil {
    private static readonly incomeCategoryId: ObjectId = generateObjectId();
    private static readonly expenseCategoryId: ObjectId = generateObjectId();
    private static readonly expenseSubCategoryId: ObjectId = generateObjectId();

    static getSampleTransactions(): Transaction[] {
        let transactions: Transaction[] = [];
        for (let i = 0; i < 10; i++) {
            transactions.push(...[
                {
                    date: '2024-06-15',
                    type: 'expense',
                    categoryId: this.expenseCategoryId,
                    subCategoryId: this.expenseSubCategoryId,
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
            subCategoryIds: [],
            type: 'income'
        });
        categoryMap.set(this.expenseCategoryId, {
            id: this.expenseCategoryId,
            name: 'Grocery',
            subCategoryIds: [this.expenseSubCategoryId],
            type: 'expense'
        });
        return categoryMap;
    }

    static getSubCategoryMap(): Map<ObjectId, SubCategory> {
        const subCategoryMap: Map<ObjectId, SubCategory> = new Map<ObjectId, SubCategory>();
        subCategoryMap.set(this.expenseSubCategoryId, {
            id: this.expenseSubCategoryId,
            name: 'Market'
        });
        return subCategoryMap;
    }
}