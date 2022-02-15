const jwt = require('jsonwebtoken');
require('dotenv').config();





module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
      if(!token){
         return res.status(200).json({message: 'pas de token'})
      }
      else {
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
      console.log(decodedToken)
      next()
  }
  }
  catch (err){
      return res.status(400).json(err)
  }
      
};
/*
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.SECRET_TOKEN, async (err,data) =>  {
    if(err){
      console.log(data)
     return res.status(400).json(err)
    } 
    else if(data.utilisateurId){
     req.user = data.utilisateurId
      next()
   }
})
}*/
