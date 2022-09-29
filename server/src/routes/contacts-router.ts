import { Router } from 'express';
import { contactController } from '../controllers/contact-controller';
import { checkAuth } from '../middlewares/check-auth';


const contactsRouter = Router();

contactsRouter.get('/', checkAuth, contactController.getContacts);
contactsRouter.post('/', checkAuth, contactController.addContact);
contactsRouter.delete('/:id', checkAuth, contactController.deleteContact);
contactsRouter.put('/:id', checkAuth, contactController.putContact);

export {contactsRouter};
