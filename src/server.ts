import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import { AuthService } from './services/AuthService';
import { SqliteUserRepository } from './repositories/SqliteUserRepository';
import { ApiResponse } from './utils/api_response';
const userRepo = new SqliteUserRepository();
const authService = new AuthService(userRepo);

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/signup') {
    let body = '';

    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { username,name, password } = JSON.parse(body);
       const user = await authService.signUp(username, name,password);
        res.writeHead(201).end(ApiResponse.success(user,'User created').asJsonString());
      } catch (e: any) {
        res.writeHead(500).end(ApiResponse.error(e.message,500).asJsonString());
      }
    });
  }else{
    res.writeHead(404).end(`${req.url} with ${req.method} method not found!`);
  }
});

// IMPORTANT: listen on all interfaces for LAN access
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.100.116:${PORT}`);
});