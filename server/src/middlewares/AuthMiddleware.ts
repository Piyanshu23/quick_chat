import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import AuthController from "../controllers/AuthController.js";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "UnAuthorised" });
  }
  const token = authHeader.split(" ")[1];

  //verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ status: 401, message: "UnAuthorised" });

    req.user = user as AuthUser;
    next();
  });
};

export default AuthMiddleware;
