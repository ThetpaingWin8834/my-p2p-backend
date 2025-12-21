"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = exports.USER_TABLE_NAME = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
exports.USER_TABLE_NAME = 'users';
sqlite3_1.default.verbose();
exports.userDb = new sqlite3_1.default.Database('./users.db', (err) => {
    if (err) {
        console.error('DB error', err);
    }
    else {
        console.log('SQLite connected');
    }
});
exports.userDb.run(`
    CREATE TABLE IF NOT EXISTS ${exports.USER_TABLE_NAME}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hashed TEXT NOT NULL,
    created_at DATETIME DEFULT CURRENT_TIMESTAMP
    )
    `);
