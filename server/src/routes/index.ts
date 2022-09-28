import { Router } from 'express';
import { contactsRouter } from './contacts-router';
import { usersRouter } from './users-router';


const router = Router();

router.use('/contacts', contactsRouter);
router.use('/users', usersRouter)


export default router;
