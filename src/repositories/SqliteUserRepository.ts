import { userDb, USER_TABLE_NAME } from '../db/user_database';
import { User, UserRepository } from '../repositories/UserRepository';

export class SqliteUserRepository implements UserRepository {
    createUser(username: string, name: string, pwHashed: string): Promise<User> {
        return new Promise((res, rej) => {
            const query = `
            INSERT INTO ${USER_TABLE_NAME}(
            username,name,password_hashed
            ) VALUES (?,?,?)
            `
            userDb.run(query, [username, name, pwHashed], function (err) {
                if (err) {
                    return rej(err);
                }
                
                res({
                    id: this.lastID,
                    username:username,
                    name : name,
                    password_hash: pwHashed,
                    created_at: new Date().toISOString()
                });
            });
        });
    }
    findByUsername(username: string): Promise<User | null> {
        return new Promise((res, rej) => {
            const query = `SELECT * FROM ${USER_TABLE_NAME} WHERE username = ?`;
            userDb.get(query, [username], (err, row:any) => {
                if (err) return rej(err);
                 if (!row) {
                // ✅ user not found
                return res(null);
            }

                 res({
                    id: row.id,
                    username :row.username,
                    name : row.name,
                    password_hash: row.password_hashed,
                    created_at: new Date().toISOString()
                });
            });
        });
    }
}
