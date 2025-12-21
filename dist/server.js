"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const AuthService_1 = require("./services/AuthService");
const SqliteUserRepository_1 = require("./repositories/SqliteUserRepository");
const userRepo = new SqliteUserRepository_1.SqliteUserRepository();
const authService = new AuthService_1.AuthService(userRepo);
const PORT = 3000;
const server = http_1.default.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/signup') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { username, name, password } = JSON.parse(body);
                await authService.signUp(username, name, password);
                res.writeHead(201).end('User created');
            }
            catch (e) {
                res.writeHead(400).end(e.message);
            }
        });
    }
    else {
        res.writeHead(404).end(`${req.url} with ${req.method} method not found!`);
    }
});
// IMPORTANT: listen on all interfaces for LAN access
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.100.116:${PORT}`);
});
