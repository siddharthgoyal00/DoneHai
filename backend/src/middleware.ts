import { JWT_SECRET } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";
const {verify} = jwt;
export const authMiddleware = (req: any, res: any, next:any) => {     
    try {
        console.log(req.headers)
    const authHeader = req.headers['authorization'];    
    console.log("Authorization Header:", authHeader); // Debug
    if (!authHeader || !authHeader.startsWith('Bearer')) { 
        console.log("No valid Authorization header found"); 
        return  res.status(403).json({ message: "Unauthorized" });  
    }

    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

        const decoded:any = verify(token, JWT_SECRET) as JwtPayload; // verify token 
        console.log("Decoded JWT Payload:", decoded); // Debugging
      if(!decoded || !decoded.userId) {
        console.log("Invalid token payload:", decoded);
      return res.status(403).json({ message: "Unauthorized" });
      }  
       // Attach the user's info (e.g., userId) to the request object for later use
    req.user = { id: decoded.userId };
    console.log("Authentication successful for userId:", decoded.userId);  
        next();// proceed to the next middleware or route handler 
    } catch (err) {
        console.error("JWT Verification Failed:", err);
        res.status(403).json({ message: "Invalid token" });
    }
};
