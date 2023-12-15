import express from "express";
import { registerController } from "../controller/registerController.js ";
import { validateGetme, validateLogin, validateRegister } from "../middleware/validateRegister.js";
import { createLoginAccess, validateToken } from "../controller/validateToken.js";
export const userRoute=express.Router();
userRoute.post("/register",validateRegister,registerController)
userRoute.post("/login",validateLogin,createLoginAccess)
userRoute.get("/me",validateToken)