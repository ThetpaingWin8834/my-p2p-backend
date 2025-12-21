import {User,UserRepository} from '../repositories/UserRepository'
import bcrypt from 'bcrypt';

export class AuthService{
    constructor (private userRepo:UserRepository){}

    async signUp(username:string,name:string,password:string):Promise<User>{
        // return new Promise((res,rej)=>{});
        const existing =await this.userRepo.findByUsername(username);
        if(existing) {
            throw new Error('User already exists');
        }
        const hash =await bcrypt.hash(password,10);
        return this.userRepo.createUser( username, name, hash);

    }
     async login(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) throw new Error('User not found');

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error('Wrong password');

    return user;
  }
}