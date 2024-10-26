import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

class AuthController {
  static async login(req: any, res: any) {
    try {
      const body: LoginPayloadType = req.body;
      // Find user by email
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      // If user not found, create a new user
      if (!findUser) {
        findUser = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            oauth_id: body.oauth_id,
            provider: body.provider,
            image: body.image,
          },
        });
      }

      // JWT payload
      const JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      // JWT secret
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ message: "JWT secret is not defined" });
      }

      // Sign the token
      const token = jwt.sign(JWTPayload, jwtSecret, {
        expiresIn: "365d",
      });

      // Return response
      return res.status(200).json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        message: "Something went wrong. Please try again!",
      });
    }
  }
}

export default AuthController;
