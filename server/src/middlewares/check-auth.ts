import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AUTH_TOKEN, NO_SECRET_KEY, StatusCode } from "../const";


export const checkAuth = (req: Request, res: Response, next: NextFunction  ) => {

    try {
        const token = req.headers[AUTH_TOKEN] as string;
        const dataFromToken = jwt.verify( token, process.env.SECRET_KEY || NO_SECRET_KEY );

        if (!dataFromToken) {
            return res.status(StatusCode.NotAuthError).json({message: 'auth token is incorrect'})
        }

        next();

    } catch {
        return res.status(StatusCode.NotAuthError).json({message: 'auth token is incorrect'})
    }
}