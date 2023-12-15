import  { checkSchema, validationResult } from "express-validator";
import { validater } from "../ultis/validater.js";
import { databaseUnit } from "../service/database/database.js";
import bcrypt from "bcrypt";


export const validateRegister= validater(checkSchema({
        username: {
          errorMessage: 'Invalid username',
          isEmail: false,
          custom:{
            options:  async (value,{req})=>{
                const isExist=  await databaseUnit.users().findOne({username:value})
                console.log(isExist);
                if(isExist){
                    throw new Error("already username")
                }
                else{return true;}
                
            }
          }
        },
        password: {
          isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
          },
        },
        confirm_pass:{
            isLength: {
                options: { min: 8 },
                errorMessage: 'Password should be at least 8 chars',
              },
              custom:{
                options:(value,{req})=>{
                    if(value != req.body.password){
                        throw new Error("Error Pass")
                    }
                    return true;
                }
              }
        }
      },["body"]))

  export const validateGetme=validater(checkSchema({
    authorization: {
     custom:{
      options:  (value,{req})=>{
        if(value== req.headers.authorization){
          return true;
        }
        else{
          throw new Error("Error : access key is wrong")
        }
      }
     }
    },
  },["body"]));



  export const validateLogin= validater(checkSchema({
    username: {
      errorMessage: 'Invalid username',
      isEmail: false,
      custom:{
        options:  async (value,{req})=>{
             const isExist=  await databaseUnit.users().findOne({username:value});
            if(isExist){
                return true;
            }
            else{throw new Error("Error: USERNAME");}
            
        }
      }
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password should be at least 8 chars',
      },
      custom:{
        options: async (value,{req})=>{
          const unitLogin=await databaseUnit.users().findOne({username:req.body.username});
          console.log(unitLogin);
          const descryptPass=await bcrypt.compare(value,unitLogin.password);
          console.log(descryptPass);
          if(descryptPass){
              return true;
          }
          else{throw new Error("Error: PASSWORD");}
          
      }
      }
    },
  },["body"]))


  