import sqlite3 from "sqlite3";
export const USER_TABLE_NAME = 'users';

sqlite3.verbose();

export const userDb = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('DB error', err);
    } else {
        console.log('SQLite connected');
    }
});

userDb.run(
    `
    CREATE TABLE IF NOT EXISTS ${USER_TABLE_NAME}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hashed TEXT NOT NULL,
    created_at DATETIME DEFULT CURRENT_TIMESTAMP
    )
    `
);