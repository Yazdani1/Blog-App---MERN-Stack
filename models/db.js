const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},(err)=>{
    if(!err){
        console.log("Database Connected working")
    }else{
        console.log("We got an error"+err);
    }
});



// mongoose.connect('mongodb://localhost:27017/mernauth',{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// },(err)=>{
//     if(!err){
//         console.log("Database Connected")
//     }else{
//         console.log("We got an error"+err);
//     }
// });


//this one for online database

// mongoose.connect(process.env.MONGO_URL,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  
// },(err)=>{
//     if(!err){
//         console.log("Database Connected")
//     }else{
//         console.log("We got an error"+err);
//     }
// })