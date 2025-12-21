"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
// import bcrypt from 'bcrypt'; // still imported (not yet used)
const PORT = 3000;
const USERS_FILE = './users.json';
function loadUsers() {
    if (!fs_1.default.existsSync(USERS_FILE))
        return {};
    const data = fs_1.default.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
}
function saveUsers(users) {
    fs_1.default.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body || '{}'));
            }
            catch (error) {
                reject(error);
            }
        });
        req.on('error', (error) => reject(error));
    });
}
const server = http_1.default.createServer(async (req, res) => {
    try {
        if (req.url === '/signup' && req.method === 'POST') {
            const body = await parseBody(req);
            const { username, password } = body;
            if (!username || !password) {
                res.writeHead(400);
                res.end('Missing username or password');
                return;
            }
            const users = loadUsers();
            if (users[username]) {
                res.writeHead(409);
                res.end('User already exists');
                return;
            }
            // NOTE: still plain-text like your original
            users[username] = password;
            saveUsers(users);
            res.writeHead(201);
            res.end('User created');
        }
        else if (req.url === '/login' && req.method === 'POST') {
            const body = await parseBody(req);
            const { username, password } = body;
            if (!username || !password) {
                res.writeHead(400);
                res.end('Missing username or password');
                return;
            }
            const users = loadUsers();
            const savedPassword = users[username];
            if (!savedPassword) {
                res.writeHead(404);
                res.end('User not found');
                return;
            }
            const isPWmatched = password === savedPassword;
            if (isPWmatched) {
                res.writeHead(200);
                res.end('Login success!');
            }
            else {
                res.writeHead(401);
                res.end('Wrong password');
            }
        }
        else if (req.url === '/getUsers' && req.method === 'GET') {
            const users = loadUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        }
        else {
            res.writeHead(404);
            res.end('Not found');
        }
    }
    catch (error) {
        res.writeHead(500);
        res.end('Internal server error');
    }
});
// IMPORTANT: listen on all interfaces for LAN access
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.100.116:${PORT}`);
});
