import { Router } from 'express';
import { controller } from '../controller';

const contactsRouter = Router();

contactsRouter.get('/', controller.getAll)


export {contactsRouter};