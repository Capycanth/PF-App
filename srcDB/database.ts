import Datebase from 'better-sqlite3';

export const db = new Datebase('srcDB/database.sqlite');

export function initializeDatabase() {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS category (
            id VARCHAR(17) PRIMARY KEY,
            name TEXT UNIQUE,
            type TEXT,
            subCategories TEXT
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS account (
            id VARCHAR(17) PRIMARY KEY,
            user TEXT UNIQUE,
            year INTEGER,
            transactionsByMonth TEXT,
            budgetIdsByMonth TEXT,
            icon TEXT

        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS budget (
            id VARCHAR(17) PRIMARY KEY,
            name TEXT,
	        limitsByCategoryId TEXT
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
            subCategory TEXT
        )
    `).run();
}
