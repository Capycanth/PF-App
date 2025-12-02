import { db } from './database';
import { generateObjectId } from './helpers/helper';
import { Account, Budget, Category, Goal, Month, User } from './model/dataModels';

// Category Loader
function loadCategories(categories: Category[]) {
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO category (id, name, type, subCategories)
        VALUES (@id, @name, @type, @subCategories)
    `);

    const insertMany = db.transaction((rows: Category[]) => {
        for (const row of rows) {
            stmt.run({
                id: row.id,
                name: row.name,
                type: row.type,
                subCategories: JSON.stringify(row.subCategories)
            });
        }
    });

    insertMany(categories);
}

// Account Loader
function loadAccounts(accounts: Account[]) {
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO account (id, user, year, transactionsByMonth, budgetIdsByMonth, icon)
        VALUES (@id, @user, @year, @transactionsByMonth, @budgetIdsByMonth, @icon)
    `);

    const insertMany = db.transaction((rows: Account[]) => {
        for (const row of rows) {
            stmt.run({
                id: row.id,
                user: row.user,
                year: row.year,
                transactionsByMonth: JSON.stringify(row.transactionsByMonth),
                budgetIdsByMonth: JSON.stringify(row.budgetIdsByMonth),
                icon: row.icon
            });
        }
    });

    insertMany(accounts);
}

// Budget Loader
function loadBudgets(budgets: Budget[]) {
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO budget (id, name, limitsByCategoryId)
        VALUES (@id, @name, @limitsByCategoryId)
    `);

    const insertMany = db.transaction((rows: Budget[]) => {
        for (const row of rows) {
            stmt.run({
                id: row.id,
                name: row.name,
                limitsByCategoryId: JSON.stringify(row.limitsByCategoryId)
            });
        }
    });

    insertMany(budgets);
}

// Goal Loader
function loadGoals(goals: Goal[]) {
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO goal (id, accountId, name, total_cost, saved, categoryId, subCategory)
        VALUES (@id, @accountId, @name, @total_cost, @saved, @categoryId, @subCategory)
    `);

    const insertMany = db.transaction((rows: Goal[]) => {
        for (const row of rows) {
            stmt.run({
                id: row.id,
                accountId: row.accountId,
                name: row.name,
                total_cost: row.total_cost,
                saved: row.saved,
                categoryId: row.categoryId,
                subCategory: row.subCategory
            });
        }
    });

    insertMany(goals);
}

function loadAllData(data: {
    categories?: Category[];
    accounts?: Account[];
    budgets?: Budget[];
    goals?: Goal[];
}) {
    console.log("\n=== Starting data load ===");
    console.log("\n=== Loading Categories ===");
    if (data.categories) loadCategories(data.categories);
    console.log("\n=== Loading Accounts ===");
    if (data.accounts) loadAccounts(data.accounts);
    console.log("\n=== Loading Budgets ===");
    if (data.budgets) loadBudgets(data.budgets);
    console.log("\n=== Loading Goals ===");
    if (data.goals) loadGoals(data.goals);
    console.log("\n=== Ending data load ===");
}

let data: {
    categories?: Category[];
    accounts?: Account[];
    budgets?: Budget[];
    goals?: Goal[];
} = {};

data.categories = [
    {
        id: generateObjectId(),
        name: 'Home',
        subCategories: ['Mortgage', 'Insurance', 'Improvement', 'Goods'],
        type: 'expense',
    },
    {
        id: generateObjectId(),
        name: 'Utility',
        subCategories: ['Electric', 'Gas', 'Water', 'Internet', 'Phone', 'Recycling', 'Trash'],
        type: 'expense',
    },
    {
        id: generateObjectId(),
        name: 'Auto',
        subCategories: ['Fuel', 'Insurance', 'Repair'],
        type: 'expense',
    },
    {
        id: generateObjectId(),
        name: 'Loans',
        subCategories: ['Car', 'Student'],
        type: 'expense',
    },
    {
        id: generateObjectId(),
        name: 'Grocery',
        subCategories: ['Market', 'Cafe', 'Dining'],
        type: 'expense',
    },
    {
        id: generateObjectId(),
        name: 'Pets',
        subCategories: ['General', 'Medical'],
        type: 'expense',
    },
    {
        id: generateObjectId(),
        name: 'Medical',
        subCategories: ['General', 'Pharmacy', 'Emergency'],
        type: 'expense',
    },
    {
        id: generateObjectId(),
        name: 'Income',
        subCategories: ['Salary', 'Gift', 'Interest', 'Misc'],
        type: 'income',
    },
    {
        id: generateObjectId(),
        name: 'Entertainment',
        subCategories: ['Events', 'Hobby', 'Clothing'],
        type: 'expense',
    }
];

data.budgets = [
    {
        id: generateObjectId(),
        name: 'Joint Budget',
        limitsByCategoryId: {
            [data.categories[0].id]: {
                Mortgage: 2843.52,
                Insurance: 200,
                Improvement: 200,
                Goods: 0,
            },
            [data.categories[1].id]: {
                Electric: 250,
                Gas: 100,
                Water: 50,
                Internet: 60,
                Phone: 230,
                Trash: 45.83,
            },
            [data.categories[2].id]: {
                Fuel: 120,
                Insurance: 181.33,
                Repair: 0,
            },
            [data.categories[3].id]: {
                Car: 387.33,
                Student: 200,
            },
            [data.categories[4].id]: {
                Market: 700,
                Cafe: 100,
                Dining: 150,
            },
            [data.categories[5].id]: {
                General: 150,
            },
            // [data.categories[6].id]: {
            //     General: 100,
            //     Pharmacy: 50,
            //     Emergency: 0,
            // },
            [data.categories[7].id]: {
                Salary: 6940.34,
            },
            [data.categories[8].id]: {
                Events: 50,
            },
        },
    },
    {
        id: generateObjectId(),
        name: 'Dillon Budget',
        limitsByCategoryId: {
            [data.categories[7].id]: {
                Salary: 1269.89,
            },
            [data.categories[3].id]: {
                Student: 450,
            },
            [data.categories[8].id]: {
                Hobby: 50,
            },
            [data.categories[4].id]: {
                Cafe: 50,
            },
        }
    },
    {
        id: generateObjectId(),
        name: 'Sophia Budget',
        limitsByCategoryId: {
            [data.categories[7].id]: {
                Salary: 1332.73,
            },
            [data.categories[8].id]: {
                Hobby: 50,
            },
            [data.categories[4].id]: {
                Cafe: 50,
            },
        }
    }
];

data.accounts = [
    {
        id: generateObjectId(),
        user: User.JOINT,
        year: 2025,
        transactionsByMonth: {},
        budgetIdsByMonth: {
            [Month.JANUARY]: data.budgets![0].id,
            [Month.FEBRUARY]: data.budgets![0].id,
            [Month.MARCH]: data.budgets![0].id,
            [Month.APRIL]: data.budgets![0].id,
            [Month.MAY]: data.budgets![0].id,
            [Month.JUNE]: data.budgets![0].id,
            [Month.JULY]: data.budgets![0].id,
            [Month.AUGUST]: data.budgets![0].id,
            [Month.SEPTEMBER]: data.budgets![0].id,
            [Month.OCTOBER]: data.budgets![0].id,
            [Month.NOVEMBER]: data.budgets![0].id,
            [Month.DECEMBER]: data.budgets![0].id,
        },
        icon: 'fa fa-home'
    },
    {
        id: generateObjectId(),
        user: User.DILLON,
        year: 2025,
        transactionsByMonth: {},
        budgetIdsByMonth: {
            [Month.JANUARY]: data.budgets![1].id,
            [Month.FEBRUARY]: data.budgets![1].id,
            [Month.MARCH]: data.budgets![1].id,
            [Month.APRIL]: data.budgets![1].id,
            [Month.MAY]: data.budgets![1].id,
            [Month.JUNE]: data.budgets![1].id,
            [Month.JULY]: data.budgets![1].id,
            [Month.AUGUST]: data.budgets![1].id,
            [Month.SEPTEMBER]: data.budgets![1].id,
            [Month.OCTOBER]: data.budgets![1].id,
            [Month.NOVEMBER]: data.budgets![1].id,
            [Month.DECEMBER]: data.budgets![1].id,
        },
        icon: 'fa fa-coffee'
    },
    {
        id: generateObjectId(),
        user: User.SOPHIA,
        year: 2025,
        transactionsByMonth: {},
        budgetIdsByMonth: {
            [Month.JANUARY]: data.budgets![2].id,
            [Month.FEBRUARY]: data.budgets![2].id,
            [Month.MARCH]: data.budgets![2].id,
            [Month.APRIL]: data.budgets![2].id,
            [Month.MAY]: data.budgets![2].id,
            [Month.JUNE]: data.budgets![2].id,
            [Month.JULY]: data.budgets![2].id,
            [Month.AUGUST]: data.budgets![2].id,
            [Month.SEPTEMBER]: data.budgets![2].id,
            [Month.OCTOBER]: data.budgets![2].id,
            [Month.NOVEMBER]: data.budgets![2].id,
            [Month.DECEMBER]: data.budgets![2].id,
        },
        icon: 'fa fa-bug'
    }
];

loadAllData(data);
