const express= require('express');
const app = express();
const PORT= process.env.PORT || 8080;

require('./models/db');







app.listen(PORT,(req,res)=>{
    console.log("Server connected")
});