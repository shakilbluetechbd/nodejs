const jwt = require("jsonwebtoken");


module.exports = function (req,res, next) {

  const token = req.header('Authorization');
  if(!token) return res.status(401).send({error:"Unauthorized Request"})
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user= verified;
    next();
  } catch (error) {
    res.status(401).send({error:"invalid token"})
  }

  
}