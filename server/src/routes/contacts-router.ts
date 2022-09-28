import { Router } from 'express';
import { controller } from '../controller';

const contactsRouter = Router();

contactsRouter.get('/', controller.getContacts)


export {contactsRouter};