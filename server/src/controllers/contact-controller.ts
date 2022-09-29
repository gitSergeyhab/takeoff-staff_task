import { Request, Response } from "express";
import sequelize from '../db'


class ContactController {

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

      async addContact(req: Request, res: Response) {
        try {
            const {email, name, phone} = req.body;

            await sequelize.query(
                `
                INSERT INTO contacts (name, email, phone) VALUES (:name, :email, :phone);
                `,
                { 
                    replacements: {email, name, phone},
                    type: 'INSERT'
                }
                ); 
    
    
            return res.status(201).json({message: 'contact crated'})
        } catch {
            return res.status(500).json({message: 'server add contact error'})
        }
      }

      async deleteContact(req: Request, res: Response) {
        try {
            const {id} = req.params;

            await sequelize.query(
                `
                DELETE from contacts WHERE id= :id;
                `,
                { 
                    replacements: {id},
                    type: 'DELETE'
                }
                ); 
    
            return res.status(204).json({message: 'contact deleted'})
        } catch {
            return res.status(500).json({message: 'server delete contact error'})
        }
      }

      async putContact(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const {email, name, phone} = req.body;

            await sequelize.query(
                `
                UPDATE contacts SET name = :name, email = :email, phone = :phone WHERE id = :id;
                `,
                { 
                    replacements: {id, email, name, phone},
                    type: 'UPDATE'
                }
                ); 
    
            return res.status(204).json({message: 'contact deleted'})
        } catch {
            return res.status(500).json({message: 'server delete contact error'})
        }
      }
}


export const contactController = new ContactController()