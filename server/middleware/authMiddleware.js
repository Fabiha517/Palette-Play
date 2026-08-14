import jwt from  "jsonwebtoken"
const authMiddleware=async(req,res,next)=>{
  const authHeader=req.headers.authorization;
   if (!authHeader ||!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided",
        });
    }
 const token = authHeader.split(" ")[1];
 try {
  const decode=jwt.verify(token,process.env.JWT_SECRET)
   req.userId = decode.userId;
   next()
 } catch (error) {
  res.status(401).json({
    message:"Invalid or expired token"
  })
 }
}
export default authMiddleware;