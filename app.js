const express= require('express');
const app = express();
const PORT= process.env.PORT || 8080;
const bodyParser = require('body-parser');

//db connection
require('./models/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router

app.use('/auth',require('./router/user'));




app.listen(PORT,(req,res)=>{
    console.log("Server connected")
});