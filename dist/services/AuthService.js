"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async signUp(username, name, password) {
        // return new Promise((res,rej)=>{});
        const existing = await this.userRepo.findByUsername(username);
        if (existing) {
            throw new Error('User already exists');
        }
        const hash = await bcrypt_1.default.hash(password, 10);
        return this.userRepo.createUser(username, name, hash);
    }
    async login(username, password) {
        const user = await this.userRepo.findByUsername(username);
        if (!user)
            throw new Error('User not found');
        const ok = await bcrypt_1.default.compare(password, user.password_hash);
        if (!ok)
            throw new Error('Wrong password');
        return user;
    }
}
exports.AuthService = AuthService;
