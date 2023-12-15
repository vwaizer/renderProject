import bcrypt from "bcrypt";
import { databaseUnit } from "./database/database.js";

export const registerHash = async ( password) => {
	const salt=10;
	const passwordHash = await bcrypt.hashSync(password, salt);
	console.log(passwordHash)
    return passwordHash
}

const loginHash = async ( username,password) => {
	const userLogin= await databaseUnit.users().findOne({username})
	const isPasswordMatch = await bcrypt.compare(password, userLogin.password)
	console.log(isPasswordMatch)
	return isPasswordMatch
}