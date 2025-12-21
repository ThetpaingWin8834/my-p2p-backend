export interface User{
    id:number;
    username:string;
    name:string;
    password_hash:string;
    created_at:string;
}
export interface UserRepository{
    createUser(username:string, name:string, pwHashed:string):Promise<User>;
    findByUsername(username:string):Promise<User| null> ;

}