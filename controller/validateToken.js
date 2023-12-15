import jwt from "jsonwebtoken";
import { checkToken, createToken, createTokenLogin } from "../ultis/ultis.js";
import { token } from "morgan";
import bcrypt from "bcrypt";
import { databaseUnit } from "../service/database/database.js";
const privateKey = "abcdef";
export const validateToken = async (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1]
 
  const userUnit= await checkToken(privateKey,token);
  
  // if(result.username== "admin"){
  //   return res.json("success")
  // }
  // else{
  //   return res.json("fail")
  // }
  const result= await databaseUnit.users().findOne({username:userUnit.username});
  return res.json({decode:result});
  
};
export const createLoginAccess= async(req,res)=>{
  const passKey= await bcrypt.hashSync(req.body.password,10);
  const encrypt ={username:req.body.username,password: passKey };
  const token=  await createTokenLogin(encrypt,privateKey);
  return res.json({token});
}
export const makeToken= async (req,res,next)=>{
    const result=  await createToken(privateKey);
 
    return res.json({
      token:result
    });
}
