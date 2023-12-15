import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";


export const addStudent = (stu, dataBase) => {
  console.log(path.resolve());
  let a = JSON.parse(dataBase);
  const enterStu = [...a, stu];
  fs.writeFileSync("students.json", JSON.stringify(enterStu));
};

export const   createToken =  (privateKey) =>  {
  console.log("create");
  return  new  Promise((resolve, reject) => {
     jwt.sign(
      { username: "admin", password: "1234" },
      privateKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err.message);
        }
        resolve(token);
      }
    );
  });
};
export const   createTokenLogin =  (data,privateKey) =>  {
  
  return  new  Promise((resolve, reject) => {
     jwt.sign(
      { username: data.username, password: data.password },
      privateKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err.message);
        }
        resolve(token);
      }
    );
  });
};
export const checkToken=(privateKey,token)=>{
  

  return new Promise((resolve,reject)=>{
    const decode=jwt.verify(token,privateKey,{maxAge:"1h"},(err,token)=>{
      if(err){
        reject(err.message)
      }
      resolve(token);
      
    });
    
  })
}

