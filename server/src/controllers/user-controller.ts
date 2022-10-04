import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sequelize from '../db'
import { AUTH_TOKEN, NO_SECRET_KEY, StatusCode } from "../const";


const SALT = 6;

type User = { id: number, email: string, password: string };

const createToken = ({email} : {email: string}) => jwt.sign({email}, process.env.SECRET_KEY || NO_SECRET_KEY, {expiresIn: '24h'})


class UserController {

      async register (req: Request, res: Response) {
        try {
            const {email, password} = req.body;

            const users = await sequelize.query(
                `
                SELECT * FROM users WHERE email=:email;
                `,
                { 
                    replacements: {email},
                    type: 'SELECT'
                }
                ); 
    
            if (users.length){
                return res.status(StatusCode.BadRequest).json({message: `user with email ${email} already exists`})
            } 
    
            const hashPassword = await bcrypt.hash(password, SALT);
    
            await sequelize.query(
                `
                INSERT INTO users (email, password) VALUES (:email, :password);
                `
                ,
                { 
                    replacements: {email, password: hashPassword},
                    type: 'INSERT'
                }
            );
    
            return res.status(StatusCode.Added).json({message: 'user created'})
        } catch {
            return res.status(StatusCode.ServerError).json({message: 'server registration error'})
        }
      }

      async login (req: Request, res: Response) {

        try {
            const {email, password} = req.body;

            const users = await sequelize.query(
                `
                SELECT * FROM users WHERE email=:email;
                `,
                { 
                    replacements: {email},
                    type: 'SELECT'
                }
                ); 
    
            if (!users.length){
                return res.status(StatusCode.BadRequest).json({message: `user with email ${email} does not exist`});
            } 
    
            const isPasswordCorrect = await bcrypt.compare(password, ((users[0] as unknown) as User).password);

    
            if (!isPasswordCorrect) {
                return res.status(StatusCode.BadRequest).json({message: `your password ${password} is wrong`});
            }
    
            const token = createToken({email});
    
            return res.status(StatusCode.Added).json({token, email, id: ((users[0] as unknown) as User).id})
        } catch (err) {
            return res.status(StatusCode.ServerError).json({message: 'login error'})
          }
        } 

        async auth (req: Request, res: Response) {

            try {
                const token = req.headers[AUTH_TOKEN] as string;
                const dataFromToken = jwt.verify( token, process.env.SECRET_KEY || NO_SECRET_KEY );
        
                if (!dataFromToken) {
                    return res.status(StatusCode.NotAuthError).json(false)
                }

                return res.status(StatusCode.Ok).json(true)
            } catch {
                return res.status(StatusCode.NotAuthError).json(false)
            }
        } 
}

export const userController = new UserController()