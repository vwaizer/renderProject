// const express = require('express')
// const morgan = require('morgan')
// const fs = require("fs")
// const { error } = require('console')
// const process= require("process")
import express from "express"
import morgan from "morgan"

import cors from "cors"
import {  makeToken, validateToken } from "./controller/validateToken.js"
import { databaseUnit } from "./service/database/database.js"
import { userRoute } from "./routes/userRoute.js"

const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
app.use("/user",userRoute)
app.use((err,req,res,next)=>{
  if(err){
    return res.json({
      error:err
    })
  }
})

const database=databaseUnit.users;

app.post('/register',makeToken);
app.post('/login',validateToken);

databaseUnit.run()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




