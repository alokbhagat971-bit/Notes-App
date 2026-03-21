import jwt from "jsonwebtoken";

//Middleware to protect routes
const authMiddleware = (req,res,next) =>{
  const authHeader = req.header("Authorization");
  if(!authHeader){
    return res.status(401).json({message:"No token provided"});
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  }catch(error){
    res.status(401).json({message:"Invalid token"});
  }
};

export default authMiddleware;