import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


const AUTH_TOKEN = 'auth-token';


export const checkAuth = (req: Request, res: Response, next: NextFunction  ) => {

    try {
        const token = req.headers[AUTH_TOKEN] as string;
        const dataFromToken = jwt.verify( token, process.env.SECRET_KEY);

        if (!dataFromToken) {
            return res.status(401).json({message: 'auth token is incorrect'})
        }

        next();

    } catch {
        return res.status(401).json({message: 'auth token is incorrect'})
    }
}