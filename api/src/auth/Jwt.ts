import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RequestWithUserId } from "@/interfaces/RequestWithUserId";

const secretToken = "jornadaJS2024";

export class Jwt {
  public static createToken(userId: number) {
    const token = jwt.sign({ userId }, secretToken, {
      expiresIn: 999999
    });

    return token;
  }

  public static validateToken(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization; // "Bearer ${token}"

    if (!authToken)
      return res.status(401).json({ error: "Token not informed" });

    const [_, token] = authToken.split(" ");
    jwt.verify(token, secretToken, (error, decodedToken) => {
      if (error)
        return res.status(401).json({ error: "Invalid token" });

      const decoded = decodedToken as { userId: number };
      (req as RequestWithUserId)['userId'] = decoded.userId;

      next();
    });
  }
}