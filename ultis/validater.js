import { validationResult } from "express-validator";

export const validater=  (schema)=>{
    return async (req,res,next)=>{
        await schema.run(req)
        const error=validationResult(req).mapped();
        if(Object.values(error).length>0){
          next(error);
        }
        next();
    }
}