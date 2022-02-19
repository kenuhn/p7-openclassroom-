const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token du auth:', token)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    console.log('useriD: ', userId)
    console.log('useriD dans le body: ',req.body.userId)

      //console.log(token)
      next()
    
  } catch (err){
    res.status(401).json({
      error: new Error('Invalid request!')

    });
    throw err
  }
}
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
}*//*
 const token = req.cookies.jwt;
  console.log(token)
  try {
      if(!token){
         return res.status(400).json({message: 'pas de token'})
      }
      else {
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
      console.log(decodedToken)
  }
  }
  catch (err){
      return res.status(400).json(err)
  }*/