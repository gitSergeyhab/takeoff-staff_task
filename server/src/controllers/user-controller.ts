import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sequelize from '../db'


const SALT = 6;

type User = { id: number, email: string, password: string };

const createToken = ({email} : {email: string}) => jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '24h'})


class UserController {

      async register (req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            // throw new Error('AAAAAAA!~~~~~~~~~~!!!!!!!')

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
                return res.status(400).json({message: `user with email ${email} already exists`})
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
    
            return res.status(201).json({message: 'user created'})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'server registration error'})
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
                return res.status(400).json({message: `user with email ${email} does not exist`});
            } 
    
            const isPasswordCorrect = await bcrypt.compare(password, ((users[0] as unknown) as User).password);

    
            if (!isPasswordCorrect) {
                return res.status(400).json({message: `your password ${password} is wrong`});
            }
    
            const token = createToken({email});
    
            return res.status(201).json({token, email, id: ((users[0] as unknown) as User).id})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'login error'})
          }
        } 
}

export const userController = new UserController()