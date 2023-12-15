import { userService } from "../service/userSercive.js"

export const registerController=(req,res,next)=>{
  
    const result=userService.register(req.body);
    if(result){
        return res.json("complete")
    }
    return res.json("incomplete")
}