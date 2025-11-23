import { db } from './database';

console.log("\n=== Starting data drop ===");
db.prepare("DELETE FROM account").run();
db.prepare("DELETE FROM budget").run();
db.prepare("DELETE FROM goal").run();
db.prepare("DELETE FROM category").run();
console.log("\n=== Ending data drop ===");