import { Request, Response } from "express";
import sequelize from './db'
// import { QueryTypes } from "sequelize/types";



class Controller {

    async getAll(req: Request, res: Response) {

        const contacts = await sequelize.query(
            `SELECT * FROM contacts;`,
            { type: 'SELECT'}
            );
        return res.status(200).json(contacts);
      }

}

export const controller = new Controller()