import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sequelize from './db'

// import { QueryTypes } from "sequelize/types";

const SALT = 6;

type User = { id: number, email: string, password: string };

const createToken = ({email} : {email: string}) => jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '24h'})

class Controller {

    async getContacts(req: Request, res: Response) {
        try {
            const {q} = req.query

            const contacts = await sequelize.query(
                `
                SELECT * FROM contacts
                WHERE name LIKE :search OR email LIKE :search;
                `,
                { 
                    replacements: {search: `%${q}%`},
                    type: 'SELECT'
                }
                );
            return res.status(200).json(contacts);

        } catch {
            return res.status(500).json({message: 'get contacts error'});
        }

      }

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
        } catch {
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
                console.log('!users.length');
                return res.status(400).json({message: `user with email ${email} does not exist`});
            } 
    
            const isPasswordCorrect = await bcrypt.compare(password, ((users[0] as unknown) as User).password);
            console.log('password', password,  ((users[0] as unknown) as User).password, isPasswordCorrect)

    
            if (!isPasswordCorrect) {
                console.log('!isPasswordCorrect');
                return res.status(400).json({message: `your password ${password} is wrong`});
            }
    
            const token = createToken({email});
    
            return res.status(201).json({token, email, id: ((users[0] as unknown) as User).id})
          } catch {
            return res.status(500).json({message: 'login error'})
          }
        } 
}

export const controller = new Controller()