import express, { Request, Response } from "express";
import { z } from "zod";
import {User} from "../models/todo";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

const userRouter = express.Router();

// signup route
const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log("request body:", req.body)
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("input validation failed !!");
      console.log("Zod parsing error ", parsed.error);
      res.status(400).json({
        msg: "check data format or ensure all required fields are provided ",
        errors: parsed.error.errors
      });
    }
    const existingAdmin = await User.findOne({
      email: req.body.email,
    });
    if (existingAdmin) {
      console.log("email already taken");
      res.status(409).json({
        msg: "Email already taken",
      });
    }
    const newuser = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    const userId: any = newuser._id;
    const userToken = jwt.sign({ userId }, JWT_SECRET); // creates the jwt token using their id and the secret key
    res.status(201).json({
      msg: "admin created successfully",
      token: userToken,
    });
  } catch (error) {
    console.error("an error occured", error);
    res.status(500).json({
      msg: "error occured !!!",
    });
  }
}); 

// login route
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        msg: "at login input validation failed !!",
      });
    }
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const userToken = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.json({
        token: userToken,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Error while logging in",
    });
  }
});

export { userRouter };
