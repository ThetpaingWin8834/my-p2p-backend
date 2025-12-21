interface User{
    id:number;
    username:string;
    password_hash:string;
    created_at:string;
}
interface UserRepository{
    createUser(username:string,pwHashed:string):Promise<User>;
    findBuUsername(username:string):Promise<User| null> ;

}