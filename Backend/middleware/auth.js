const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split("")[1];
  const secretKey = process.env.JWT_SECRET;
  if (!token) {
    return res.json({ success: false,message:"Access denied" });
  }
  try{
    const verifyed = jwt.verify(token,secretKey)
    req.user = verifyed
    next()
  }catch(error){
    return res.json({success:false,message:"Something went wrong"});
  }
};

module.exports= auth
