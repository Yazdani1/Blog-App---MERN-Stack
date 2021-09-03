const express= require('express');
const app = express();
const PORT=8080;



app.listen(PORT,(req,res)=>{
    console.log("Server connected")
});