const jwt = require("jsonwebtoken");
const User = require("../models/User");

//for token

exports.requireLogin = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "You must logged in" });
//   }
//   const token = authorization.replace("Bearer ", "")

//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: "You must logged in" });
//     }

//     const { _id } = payload;

//     User.findById(_id).then(userdata=>{
//         req.user = userdata;
//     })
//     next()

//   });

  try{

      if(req.headers.authorization){
          const token = req.headers.authorization.split(' ')[1];
          const decode = jwt.verify(token,process.env.JWT_SECRET);

          //aatach tokemnn
          req.user = decode;
          next();
      }else{
          return res.status(400).json({message: "Unauthorized"});
      }

  }catch(err){
      console.log(err);
  }
};
