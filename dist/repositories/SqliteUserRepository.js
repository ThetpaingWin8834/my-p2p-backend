"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteUserRepository = void 0;
const user_database_1 = require("../db/user_database");
class SqliteUserRepository {
    createUser(username, name, pwHashed) {
        return new Promise((res, rej) => {
            const query = `
            INSERT INTO ${user_database_1.USER_TABLE_NAME}(
            username,name,password_hashed
            ) VALUES (?,?,?)
            `;
            user_database_1.userDb.run(query, [username, name, pwHashed], function (err) {
                if (err) {
                    return rej(err);
                }
                res({
                    id: this.lastID,
                    username: username,
                    name: name,
                    password_hash: pwHashed,
                    created_at: new Date().toISOString()
                });
            });
        });
    }
    findByUsername(username) {
        return new Promise((res, rej) => {
            const query = `SELECT * FROM ${user_database_1.USER_TABLE_NAME} WHERE username = ?`;
            user_database_1.userDb.get(query, [username], (err, row) => {
                if (err)
                    return rej(err);
                if (!row) {
                    // ✅ user not found
                    return res(null);
                }
                res({
                    id: row.id,
                    username: row.username,
                    name: row.name,
                    password_hash: row.password_hashed,
                    created_at: new Date().toISOString()
                });
            });
        });
    }
}
exports.SqliteUserRepository = SqliteUserRepository;
