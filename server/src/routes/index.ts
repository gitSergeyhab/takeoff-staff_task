import { Router } from 'express';
import { contactsRouter } from './contacts-router';


const router = Router();

router.use('/contacts', contactsRouter)


export default router;
