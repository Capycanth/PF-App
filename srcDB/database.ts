import Datebase from 'better-sqlite3';

export const db = new Datebase('srcDB/database.sqlite');

export function initializeDatabase() {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS category (
            id VARCHAR(17) PRIMARY KEY,
            name TEXT,
            type TEXT,
            subCategoryIds TEXT
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS subcategory (
            id VARCHAR(17) PRIMARY KEY,
            name TEXT
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS account (
            id VARCHAR(17) PRIMARY KEY,
            user TEXT,
            year INTEGER,
            transactionsByMonth TEXT,
            budgetsByMonth TEXT

        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS budget (
            id VARCHAR(17) PRIMARY KEY,
            name TEXT,
	        limitsByCategoryid TEXT
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS goal (
            id VARCHAR(17) PRIMARY KEY,
            name TEXT,
            note TEXT,
            total_cost REAL,
            saved REAL,
            categoryId VARCHAR(17),
            subcategoryId VARCHAR(17)
        )
    `).run();
}
