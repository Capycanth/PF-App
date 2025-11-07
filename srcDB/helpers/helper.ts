import { Category, ObjectId } from "../model/dataModels";

export function generateObjectId(): ObjectId {
    return `${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
}

/** Helper method that should only be run once ever to initialize first run of program */
export function initializeDatabaseObjects(): void {
    /** TODO: Initialize Database Objects if not present */

    /** Create these categories in the database */
    const categories_to_create: { [key: string]: string[] } = {
        Home: ['Mortgage', 'Insurance', 'Improvement', 'Goods'],
        Utility: ['Electric', 'Gas', 'Water', 'Internet', 'Phone'],
        Auto: ['Fuel', 'Insurance', 'Repair'],
        Loans: ['Car', 'Student'],
        Grocery: ['Market', 'Cafe', 'Dining'],
        Pets: ['General', 'Medical'],
        Medical: ['General', 'Pharmacy', 'Emergency'],
        Income: ['Salary', 'Gift', 'Interest', 'Misc'],
        Entertainment: ['Events', 'Hobby', 'Clothing'],
    };

    for (const [category_name, subcategory_names] of Object.entries(categories_to_create)) {
        let category: Category = {
            id: generateObjectId(),
            name: category_name,
            subCategories: [],
            type: category_name === 'Income' ? 'income' : 'expense',
        };
        for (const subcategory_name of subcategory_names) {
            category.subCategories.push(subcategory_name);
            // TODO: Create sub category in db
        }
        // TODO: create category in db
    }

    // TODO: Loop over 3 users and intialize Accounts (current year 2025, and empty Maps)
}
