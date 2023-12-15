import { User } from "../Schema/USerSchema.js";
import { databaseUnit } from "../service/database/database.js";
import { registerHash } from "./hashSercive.js";
 class UserService{
    async register(payload){
        payload.password= await registerHash(payload.password);
        console.log(payload.password);
        const result= await databaseUnit.users().insertOne(new User(payload))
        return 1
    }
}
export const userService= new UserService();